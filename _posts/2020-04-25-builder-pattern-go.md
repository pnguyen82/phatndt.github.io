---
title: Builder Pattern example in Go 
categories: design pattern
---

The builder pattern is a design pattern designed to provide a flexible solution to various object creation problems in object-oriented programming.  
The intent of the Builder design pattern is to separate the construction of a complex object from its representation.
<!--more-->
## Builder
```go
package builder

type Data struct {
	ID      string
	Name    string
	Address string
	Email   string
	Phone   string
}

// Required fields
type SetID interface {
	ID(id string) SetName
}
type SetName interface {
	Name(name string) OptionalFields
}

// Below are optional fields => have Build method
type OptionalFields interface {
	Address(address string) OptionalFields
	Email(address string) OptionalFields
	Phone(phone string) OptionalFields
	Build() *Data
}

type builder struct {
	id      string
	name    string
	address string
	email   string
	phone   string
}

func (b *builder) ID(id string) SetName {
	b.id = id
	return b
}
func (b *builder) Name(name string) OptionalFields {
	b.name = name
	return b
}

func (b *builder) Address(address string) OptionalFields {
	b.address = address
	return b
}
func (b *builder) Email(email string) OptionalFields {
	b.email = email
	return b
}
func (b *builder) Phone(phone string) OptionalFields {
	b.phone = phone
	return b
}

func (b *builder) Build() *Data {
	d := Data{
		ID:      b.id,
		Name:    b.name,
		Address: b.address,
		Email:   b.email,
		Phone:   b.phone,
	}
	return &d
}

func NewBuilder() SetID {
	return &builder{}
}

```

## Usage

```go

	build := builder.NewBuilder().
		ID("id").
		Name("name").
		Address("address").
		Email("test@email.com").
		Phone("phone_number").
		Build()

```

