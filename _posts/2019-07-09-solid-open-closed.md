---
title: '[SOLID] Open/Closed Principle'
---
>Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification
> -- [Wikipedia](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
<!--more-->

## Definition

Seem too abstract? Let's take a look at another definition

> - A module will be said to be open if it is still available for extension. For example, it should be possible to add fields to the data structures it contains, or new elements to the set of functions it performs.  
> - A module will be said to be closed if [it] is available for use by other modules. This assumes that the module has been given a well-defined, stable description (the interface in the sense of information hiding).  
> -- Bertrand Meyer 

- Open for extension: you can extend the class/module/funtions, adding behavior/field without changing the current code. How? using abstraction, interface/abstract class  
- Closed for modification: public functions/fields of the class/module/functions must be minimal, well-defined.  Like `Encapsulation+`

## Example

I'm  gonna use `UserController` class in my previous post about [SRP](/fundamental/solid/solid-single-responsibility/)
as an example

``` java
class UserController{
    public renderHtml(List<User> users);
}
```

So you have `UserController` class that render list user in `HTML` format.  
Next day, you leader come and said:
>Hey, we're going to support mobile apps next week, so I want to support render list use in both `JSON` and `HTML` format

The easiest solution is to add another method `renderJson(List<User> users)`  

``` java
class UserController{

    public handle(request){
        if request.query.type=="json"{
            renderJson(users)
        }else { // default = html
            renderHtml(users)
        }
    }
    //
    public renderHtml(List<User> users);
    public renderJson(List<User> users);

}
```

Then after a year you will come up with 10 differences format `xml`, `csv`, `excel`, ...  
If you also have to render use list in `ReportController`, `100OtherPlacesController`  
Then when adding a new format you need to add in 100 difference places. 😩

Or you can abstract the way you format a list of user

``` java
class UserController{
    private UsersFormatterFactory usersFmterFactory;
    public handle(request){
        fmter = usersFmterFactory.ofType(request.query.type);
        fmter.format(users);
    }
}

class UsersFormatterFactory{
   public UsersFormatter ofType(t Type){
       switch(t){
           case "json": return JsonFormatter;
           default:     return HtmlFormatter;
       }
   }
}

interface UsersFormatter{
    public String format(List<User> users);
}

class JsonFormatter implements UsersFormatter{
    public String format(List<User> users);
}

class HtmlFormatter implements UsersFormatter{
    public String format(List<User> users);
}
```

If you want another module to add their own format (open for extension), you can refactor `UsersFormatterFactory` like this  

``` java
class UsersFormatterFactory{
   private Map<Type,UsersFormatter> fmters;
   public UsersFormatter ofType(Type t){
       return fmters[t]
   }
   public void registerFormat(Type t,UsersFormatter formatter){
       fmters[t]=formatter
   }
}

class Main{
    public static void main(){
      UsersFormatterFactory usersFormatterFactory = new UsersFormatterFactory();
      usersFormatterFactory.registerFormat("json", new JsonFormatter());
      usersFormatterFactory.registerFormat("html", new HtmlFormatter());
      usersFormatterFactory.registerFormat("csv", new CsvFormatter());
      // add another format if need
    }
}
```

Now you can create and register your own `XYXFormatter` without changing the existing code  
Abstraction is really powerful!
