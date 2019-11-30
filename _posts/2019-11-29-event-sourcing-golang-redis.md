---
title: Event Sourcing with Go and Redis
category: architecture
---

I thought you already heard about Event Sourcing in the past recent year.
But let's go through the definition again.
> Capture all changes to an application state as a sequence of events.
> Event Sourcing ensures that all changes to application state are stored as a sequence of events. - [Martin Fowler](https://martinfowler.com/eaaDev/EventSourcing.html)
<!--more-->

If you know bitcoin/blockchain you will know it's quite similar with Event Sourcing.

> Your current balance (Application State) is calculated from a series of events in history (in the chain)
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/ztik9xqelulsh4lx3kl9.png)

so you don't have a table like this in database

|user_id|balance|
|----|----|
| 10 | 100$|
| 7  | 200$|

now you have

|events|
|------|
|user x top-up event|
|user buy 5 items event|
|user y top-up event|

I've read many articles/blog posts about Event Sourcing so I try to make once.

## What we will build?
Let's say you have an e-commerce website and users can buy items from your website.  
Source: https://github.com/felixvo/lmax  
NOTE: This code is not tested, just an experiment


Entities:  
- `User` will have `balance`.
- `Item` will have `price` and number of `remain` items in the `warehouse`.

Events:  
- `Topup`: increase user balance
- `AddItem`: add more item to `warehouse`
- `Order`: buy items

## Directory Structure

```
├── cmd
│   ├── consumer       # process events
│   │   ├── handler    # handle new event base on event Type
│   │   └── state
│   └── producer       # publish events
└── pkg
    ├── event          # event definition
    ├── snapshot       # snapshot state of the app
    ├── user           # user domain
    └── warehouse      # item domain
```

## Architecture
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/ui1bv7ili5wag324ucil.png)

- Event storage: [Redis Stream](https://redis.io/topics/streams-intro)  
> Entry IDs
> The entry ID returned by the XADD command, and identifying univocally >each entry inside a given stream, is composed of two parts:  
> `<millisecondsTime>-<sequenceNumber>`
> I use this `Entry ID` to keep track of processed event

- The consumer will consume events and build the application state
- `snapshot` package will take the application state and save to redis every 30s. Application state will restore from this if our app crash

## The State
The `state` object is pretty simple, just a plain struct
```go
type State struct {
	LatestEventID string
	Users         map[int64]*user.User
	Items         map[string]*warehouse.Item
}
```

## The Producer
Use `XAdd` cmd to add data to a stream

```go
func Topup(client *redis.Client) {
	for i := 0; i < 10; i++ {
		userID := int64(rand.Intn(MaxUserIDRange))
		strCMD := client.XAdd(&redis.XAddArgs{
			Stream: "orders",
			Values: map[string]interface{}{
				"type": string(event.TopUpType),
				"data": &event.TopUp{
					Base: &event.Base{
						Type: event.TopUpType,
					},
					UserID: userID,
					Amount: 500,
				},
			},
		})
		newID, err := strCMD.Result()
		if err != nil {
			fmt.Printf("topup error:%v\n", err)
		} else {
			fmt.Printf("topup success for user:%v offset:%v\n", userID, newID)
		}
	}
}

```

## The Consumer
Then the Consumer gets the events => pass the event proper `handler`

```go
func consumeEvents(events chan event.Event, handlerFactory func(t event.Type) handler.Handler) {
	for {
		select {
		case e := <-events:
			h := handlerFactory(e.GetType())
			err := h.Handle(e)
			if err != nil {
				fmt.Printf("handle event error eventType:%v err:%v\n", e.GetType(), err)
			}
		}
	}
}

```
Depend on `event.Type`, we have different handlers for each event type.
And the `handler` will handle the business logic then update the `state`
```
handler/
 factory.go
 handler.go
 item_add.go
 log.go
 order.go
 topup.go

```
`handler/topup.go`
```go
func (h *topupHandler) Handle(e event.Event) error {
	topup, ok := e.(*event.TopUp)
	defer func() {
		h.state.LatestEventID = topup.GetID()
	}()
	if !ok {
		return fmt.Errorf("incorrect event type")
	}

	u, exist := h.state.Users[topup.UserID]
	if !exist { // should have an event to create user before use
		u = &user.User{
			UseID:   topup.UserID,
			Balance: 0,
		}
		h.state.Users[topup.UserID] = u
	}

	u.Balance += topup.Amount

	fmt.Printf("completed topup %+v \n", topup)
	return nil
}

```
`handler/item_add.go`
```go
func (h *itemAddHandler) Handle(e event.Event) error {
	addItem, ok := e.(*event.AddItem)
	defer func() {
		h.state.LatestEventID = addItem.GetID()
	}()
	if !ok {
		return fmt.Errorf("incorrect event type")
	}

	i, exist := h.state.Items[addItem.ItemID]
	if !exist {
		i = &warehouse.Item{
			ID:     addItem.ItemID,
			Price:  uint(rand.Intn(100)),
			Remain: uint(rand.Intn(200)),
		}
		h.state.Items[addItem.ItemID] = i
	}
	i.Remain += addItem.Count

	fmt.Printf("completed add item %+v \n", addItem)
	return nil
}

```

## Snapshot
the `snapshot` will take the `state` and save to redis
```go
func exeSnapshot(st *state.State, snapshotSrv snapshot.Snapshot) {
	ticker := time.Tick(time.Second * 30)
	for {
		select {
		case <-ticker:
			err := snapshotSrv.Snapshot(st)
			if err != nil {
				fmt.Println("snapshot failed:", err)
				break
			}
			fmt.Println("snapshot success:", st.LatestEventID, " at ", time.Now())
		}

	}
}

```

## Run
**Require redis running locally**

### Producer

First, start the producer to insert some events to `redis stream`
![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/v0scin2iq1cdcnu9nkaw.png)

### Consumer

Now start the consumer to consume events

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/eueho865f5couulhbnal.png)
Because the consumer consumes the events but not backup the state yet.
If you wait for more than 30s, you will see this message from console

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/0qkcmgzgwlhctk51q3bj.png)

Now if you stop the app and start it again, the application state will restore from the latest snapshot, not reprocess the event again

![Alt Text](https://thepracticaldev.s3.amazonaws.com/i/vxxwbn2hfho3qj1hgi3b.png)

Thank you for reading!
I hope the source code is clean enough for you to understand :scream:

## Thoughts
Did you curious why I name my repository `lmax`?
By the time I write this post, I'm researching about this [LMAX architecture](https://martinfowler.com/articles/lmax.html) [Github](https://github.com/LMAX-Exchange/disruptor/wiki).
It's quite interesting. Currently, I fetch new events and push to a `channel`,  we can use `LMAX Disruptor` to optimize the latency but there is no stable implement of `LMAX Disruptor` in `go`.


