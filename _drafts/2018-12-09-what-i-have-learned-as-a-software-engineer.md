---
title: What I've learned after 3 years as a software engineer
categories: self-development
---
After read [What should be in a coder's toolbox](https://hackernoon.com/what-should-be-in-a-coders-toolbox-96674fc8fb74)
I think it's the time for me to review what's in my's toolbox.

## My early day in development
I started my first job in May 2015 after I graduated from university. And that's a fresher program (training period).
With 3 others guys, we're working together to build a tracking system
which has cover basic functions of google analytic like Daily/Weekly/Monthly active users,
page views, data from the user agent, exit rate, bounce rate, time on page
What added to my's toolbox?
- load balancing
- job server ([gearman](http://gearman.org/))
- multithreading, synchronize, locking
- split your application to multiple services

## Junior
After three months of training, I actual join the company as an associate software engineer.
The business of my team is about marketing, how to lead users to our platform.
My responsibilities is to build a tracking system to tracking how many lead to our platform
and which campaigns have revenue
The tracking system contain 2 main part:
- collecting
- mapping data
- visualize data
I use java as the main programming language.
### collecting data
- user data
>browser(js) -> loadbalancer (nginx/ha proxy) -> webserver(jetty)->scribelog
- marketing data
>  gg adword api
> fb ads api

>analyze and store final result to db
>visualize data using c3js


after one year, I move to another role, backend developer for 360live (livestreaming app)

















