---
title: '[SOLID] Single Responsibility Principle'
categories: fundamental solid
---
>A class or module should have one, and only one, reason to be changed -- [Wikipedia](https://en.wikipedia.org/wiki/Single_responsibility_principle)
<!--more-->

## Definition
Because of confusion around the word "reason", Martin wrote a blog post entitled [The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html) with a goal to clarify what was meant by the phrase "reason for change." in 2014.  

Another wording for the Single Responsibility Principle is:

>Gather together the things that change for the same reasons.
>Separate those things that change for different reasons.

>The reasons for change are people. It is people who request changes. 
>And you don’t want to confuse those people, or yourself, by mixing together the code that many different people care about for different reasons.

Don’t get obsess with this principle, just `keep classes small`, `keep methods small` and `refactor when your class become too big`.  
Software change everyday, you don't write code once, the code need to be refactor many times.

In Object Oriented Programming, we also have a term `God Object`, which is an anti-pattern, the oposite of `Single Responsibility Principle`
## God Object
> A God object is an object that `knows too much or does too much.` -- [Wikipedia](https://en.wikipedia.org/wiki/God_object)

Imagine you have a class look like this:
```java
class UserController{
  private DBConnection conn;
  private MailTemplate mailTemplate;
  private SendGridClient mailClient;
  public UserController(DBConnection conn,MailTemplate mailTemplate)
    
  public List<User> getUserList();
   public User getUserByEmail(String email);
  
  public renderHtml(List<User> users);
  
  public void sendEmailTo(String email,String content);
}
```

- Wherever you wan to use `getUserList` method, you need to an instance of `UserController`, which require a `MailTemplate`.  
Why do you need to know about `MailTemplate` when you just want to query to database?
- And wherever you just want to send an email you also need a `DBConnection`? 
- How can you unit test this class? Setup inmem databases,inmem MailTemplate and a mailsender client, seem a lot?
- ....

We usually guest the behavior of a class base on it's name. If the class name is `UserController`,  
you will think this class will handle a http request, not send email.

### Refactor God Object
```java
// Handle http request/response
class UserController{
  private MailSender mailSender;
  private UserService userService;
  public UserController(UserService userService, MailSender mailSender)
  public renderHtml(List<User> users);
}
// To send mail
class MailSender{
  private MailTemplate mailTemplate;
  private SendGridClient mailClient;
  public void sendEmailTo(String email,String content);
}
// Handle database connection/query
class UserService{
  private DBConnection conn;
   
  public List<User> getUserList();
  public User getUserByEmail(String email);
}
```
This will improve readability of you code and also make code more clean  
Now you can reuse your class easier

