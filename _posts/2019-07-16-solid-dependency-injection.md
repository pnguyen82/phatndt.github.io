---
title: '[SOLID] Dependency Inversion Principle'
categories: fundamental solid
---
>- High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g. interfaces).
>- Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.
> -- [Wikipedia](https://en.wikipedia.org/wiki/Dependency_inversion_principle)

<!--more-->

## Dependency

First, let's talk about `Dependency`. What's a dependencies of a class?
> If class A change then class B also need to change -> B depend on A

```java
package controller
class UserController { // High Level
   private MailSender;
   private FileReader;
   private UserDAO;
}
```

```java
package os // Low Level
class FileReader{
    public read(String path)
}
```

```java
package mail // Low Level
class MailSender{}
```

```java
package databases // Low Level
class UserDAO{}
```

In the example above `UserController` depend on `FileReader`, `MailSender` and `UserDAO` because if one of these change, `UserController` also need to be change.  
if `FileReader.read(String path)` change to `FileReader.read(Path path)` so you need to update `UserController` to match new signature.  
<div style="text-align:center" alt="Dependency Inversion Principle"><img src="/assets/images/dip.svg" /></div>  

Or at package level, you can say:
> Package `controller` depend on packages `os`, `mail` and `databases`

The example above violate DIP because you can see `High Level components` depend on `Low Level components`

## Inversion

The second part is `Inversion`
> Both should depend on abstractions (e.g. interfaces).

|**Dependency**|
|----------|
|![Dependency Inversion](/assets/images/dip.svg)|
|**Inversion**|
|![Dependency Inversion](/assets/images/dip_inversion.svg)|

Both `UserController`, `UserDAO`, `FileReader` now depend on interfaces `IUserDAO`, `IFileReader`.  
Because if `IUserDAO` change then `UserController` and `UserDAO` also need to change.

## Why we need DIP

So what is the benefits of Dependency Inversion?

- Testing. Now you can easily mock the dependencies of `UserController` class, like `InMemUserDAO` instead of a real `MySQL UserDAO`
- Lose Coupling. If you use `UserDAO` heavily, then suddenly you want to change from `MySQL` to `MongoDB` then you just need to swith the implementation (using `Factory Design Pattern`,...) not change the current code.

## Generalization restrictions

>- All member variables in a class must be interfaces or abstracts.
>- All concrete class packages must connect only through interface or abstract class packages.
>- No class should derive from a concrete class.
>- No method should override an implemented method.[1]
>- All variable instantiation requires the implementation of a creational pattern such as the factory method or the factory pattern, or the use of a dependency-injection framework.
> -- [Wikipedia](https://en.wikipedia.org/wiki/Dependency_inversion_principle#Generalization_restrictions)
