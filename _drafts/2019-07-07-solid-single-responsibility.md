---
title: '[SOLID] Single Responsibility Principle'
---
## Definition
>A class or module should have one, and only one, reason to be changed

<!--more-->
Because of confusion around the word "reason", Martin wrote a blog post entitled [The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) with a goal to clarify what was meant by the phrase "reason for change." in 2014.  


Another wording for the Single Responsibility Principle is:

>Gather together the things that change for the same reasons.
>Separate those things that change for different reasons.

The reasons for change are people. It is people who request changes. 
And you don’t want to confuse those people, or yourself, by mixing together the code that many different people care about for different reasons.

## God Object
In Object Oriented Programming, we also have a term `God Object`
> A God object is an object that `knows too much or does too much.`

Imagine you have a class look like this:
```java
class UserController{
  private DBConnection conn;
  private MailTemplate mailTemplate;
  public UserController(DBConnection conn,MailTemplate mailTemplate)
    
  public List<User> getUserList();
   public User getUserByEmail(String email);
  
  public renderHtml(List<User> users);
  
  public void sendEmailTo(String email,String content);
}
```
Wherever you wan to reuse `getUserList` method, you need to create new instance of `UserController`,
which require a `MailTemplate`.  
Why do you need to know about `MailTemplate` when you just want to query to database?  
And wherever you want to send an email you also need a `DBConnection`?
How can you maintain a class with 1000 lines of code?

>Keep classes small  
>Keep methods small

This will improve readability of you code and also make code more clean
### Refactor God Object
```java
class UserController{
  private MailSender mailSender;
  private UserService userService;
  public UserController(UserService userService, MailSender mailSender)
  public renderHtml(List<User> users);
}

class MailSender{
  private MailTemplate mailTemplate;
  public void sendEmailTo(String email,String content);
}

class UserService{
  private DBConnection conn;
   
  public List<User> getUserList();
  public User getUserByEmail(String email);
}
```
Now you can reuse your class easily








