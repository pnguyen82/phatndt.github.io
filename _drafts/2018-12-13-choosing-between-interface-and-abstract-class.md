---
layout: post
title: Choosing between Interface and Abstract Class?
---
This is the question that I still feel that I dont have a right answer for the
past few year!  

https://dzone.com/articles/how-to-choose-between-interface-and-abstract-class-1

## Summary
### Abstract Class
- Create an abstract class when you are providing `guidelines for a concrete class`.
- Abstract class creation is `not at all related to` whether you want to provide the implementation of any method or not.
- Add only those `properties` and `behaviors` to the abstract class, without which your concrete class will lose its existence.  
For example, the Vehicle cannot exist without an engine.
### Interface
- Create interfaces that provide additional `behavior` to your concrete class.  
  When we share these interfaces to the external system, then it becomes a contract,  
  that is why we say that interfaces are behavioral contracts of the concrete class.  
- These `behaviors should not be mandatory for your class`.  
  These behaviors should add more capabilities to your class.  
  For example, a Car will be a Car, even if it cannot move.  
- Ask the question that, whenever a concrete class will `implement` your interface,  
  will it require `all behaviors` mentioned in your interface,  
  or only a few? Refactor your interfaces in multiple interfaces, until the answer to the above question is yes.