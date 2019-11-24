---
title: Dynamic Programming
description: Dynamic Programming summary
tags: algorithm
---

## Definition
> Dynamic programming is a computer programming **method**.
> Simplifying a complicated problem by **breaking it down into simpler sub-problems** in a recursive manner
<!--more-->

First you need to answer these question:
- Can I break the problem down into sub-problems?
- What is the big problem and what is the sub-problems?

**This is the hardest and most important part.  
Never jump in to code before answer these questions  
If you can identify the sub-problem, you almost solve it**
### Fibonacci example
Fibonacci problem is an example:
```
    f(n)        = f(n-1)        +  f(n-2)
//  big problem = sub-problem 1 +  sub-problem 2
```

and in the code

```go
func fib(n int) int{
    if n<=1 {
        return n
    }
    return f(n-1)+f(n-2)
}

```

visual
![fibonacci dynamic programming](/assets/images/dynamic_programming/dynamic_programming_fibonacci.png)

so if you break you problem in to sub-problems, it's will look like a tree with main problem in the top

### Subset Sum Problem

Another example is [Subset Sum Problem](https://www.techiedelight.com/subset-sum-problem/)
> Given a set of positive intergers and an integer s, is there any non-empty subset whose sum to s

for example:
arr = [2,3,5,7], s = 8

For each arr[i] there will be 2 cases
1. **subset include arr[i]**
2. **subset not include arr[i]**

![dynamic programming subset sum](/assets/images/dynamic_programming/dynamic_programming_sum.JPG)
<!-- | F              | sub1            | sub2           | sub3       | sub4 |
|----------------|-----------------|----------------|------------|--|
| f([2,3,5,7],8) | = f([3,5,7], 6) | = f([5,7], 3)  | END        |  |
|                |                 | ______________ |            |  |
|                |                 | = f([5,7], 6)  | = f([7],1) | END |
|                |                 |                | __________ |  |
|                | _______________ | ______________ | = f([7],6) | END |
|                | _______________ | ______________ | __________ | END |
|                | = f([3,5,7], 8) | = f([5,7], 5)  | = f([7],0) | Success |
|                |                 | ______________ | __________ |
|                |                 | = f([5,7], 8)  | END        | -->

in this case
> f(x) = f(x1) OR f(x2) NOT f(x1)+f(x2) like above

### [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)
>Given two strings text1 and text2, return the length of their longest common subsequence.
>
>A subsequence of a string is a new string generated from the original string with some characters(can be none) deleted
>without changing the relative order of the remaining characters. (eg, "ace" is a subsequence of "abcde" while "aec" is not).
> 
>A common subsequence of two strings is a subsequence that is common to both strings.

<object data="/assets/images/dynamic_programming/lcs.pdf" type="application/pdf" width="700px" height="700px">
    <embed src="/assets/images/dynamic_programming/lcs.pdf">
        <p>This browser does not support PDFs. Please download the PDF to view it: <a href="/assets/images/dynamic_programming/lcs.pdf">Download PDF</a>.</p>
    </embed>
</object>

## Dynamic Programming + Memorized

In the Fibonacci example above, you see that for same sub-problem we need to compute the result multiple time

![fibonacci dynamic programming](/assets/images/dynamic_programming/dynamic_programming_fibonacci_duplicate.png)

So it better to cached pre-calculated value for reuse
like:
```go
cache = map[string]int
func fib(n int) int{
    if n<=1 {
        return n
    }
    if cache[n] exist{
        return cache[n]
    }
    f1 = f(n-1)
    f2 = f(n-2)
    // put to cache
    return f1 + f2
}
```

Resource to practise:
- [Top 50 Dynamic Programming Practice Problems](https://blog.usejournal.com/top-50-dynamic-programming-practice-problems-4208fed71aa3)
