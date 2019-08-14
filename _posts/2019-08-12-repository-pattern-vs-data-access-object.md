---
title: Repository Pattern vs Data Access Object?
category: "design pattern"
---
What are the differences betwwen those?
<!--more-->
## DAO Definition

As you know, Data Access Object (DAO) is an object that provides an abstract interface to some type of database or other persistence mechanism [Wiki](https://en.wikipedia.org/wiki/Data_access_object)

## Repository Definition

>Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.
> -- Edward Hieatt and Rob Mee

And if you use Spring Framework, I think you already know this Interface
```java
public interface CrudRepository<T, ID extends Serializable>
    extends Repository<T, ID> {

    <S extends T> S save(S entity)
    T findOne(ID primaryKey);
    Iterable<T> findAll();
    void delete(T entity);
    boolean exists(ID primaryKey);
    ....
}
```
This make me confuse, so both DAO and Repository seem similar.  
They both **abstract the way application access to database** but Repository is in **higher** level

## Repository Pattern 

When I read more about `Domain Driven Design`, I know that Repositories is only for Aggregate
- An Aggregate is a **group of associated objects** which are considered as one unit with regard to data changes.
- Factories and Repositories are two design patterns which help us deal with object creation and storage - [DDD Quickly](https://www.infoq.com/minibooks/domain-driven-design-quickly/)

For example if you have a struct `User` like this
```go 
type User struct{ // table User
    id int
    name string
    addresses []*Address
}
type Address struct{ // table Address
    id int
    name string
}
// Getter/Setter .....
// https://golang.org/doc/effective_go.html#Getters

```

and the `UserRepository`
```go
type UserRepository interface{
    FindByID(id int64) (*User,error)
    Save(u *User)error
    Find()([]*User,error)
    Delete(u *User) error
}
```
When you update/delete a `User` so the Addresses of that user also updated/deleted. `User` is an Aggregate for Address  
If user class is just User without any association, `UserRepository` will similar to `UserDAO`

The purpose of Aggregate is to define object ownership, boundaries  
and the purpose Repository is to encapsulate the way we persistence data, also for transaction (unit with regard to data changes)

The business logic will keep inside domain object  
For example if we want to limit user to have maximum 2 addresses, you will do like this
```go 
func (u *User) AddAddress(a *Address)error{
    if len(u.addresses)>=2{ // business logic
        return fmt.Errorf("limit 2 addresses per user")
    }   
    u.addresses = append(u.addresses,a)
}
// Notice that changes will only affect when you call `Save`, this is for transaction
user.SetName("hello")
user.AddAddress(a)
userRepo.save(u) 
```
