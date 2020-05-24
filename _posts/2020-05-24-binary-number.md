---
title: What is Binary number by the way
categories: fundamental
---
## Binary vs Decimal
Before talking about binary numbers, lets talk about Decimal number(base-10) first.  
Because we use Decimal everyday in school or in your life  
Base-10 mean you have 10 digits (from 0 to 9) to represent your number
<!--more-->

**0 1 2 3 4 5 6 7 8 9**

How do you add two numbers in base-10?  
We gonna start from 0 and increse it to 22

| base-10 | Increase by | Result |
| -----  | ---      | ---    |
| 00     | +1       | = 1    |
| 01     | +1       | = 2    |
| 02     | +1       | = 3    |
| ...    | +1       | = ...  |
| 09     | +1       | = ?   |

What we're doing is we **increase the rightmost digit by 1**.  
Now we have `09` then what next? We all know 09 + 1 = 10 but the detail is  
**We reset the rightmost digit -> 0 and increase the next digit by 1 then we have 10**

| base-10 | Increase by | Result   |
| -----  | ---      | ---      |
| **09** | **+1**   | = **10** |
| 10     | +1       | = 11     |
| 11     | +1       | = 12     |
| ...    | +1       | = ...    |
| 19     | +1       | = **?**  |

then what next?  
then we do the same thing as 09 +1

**reset the rightmost digit -> 0 and increase the next digit by 1 then we have 20**

| base-10 | Increase by | Result |
| -----  | ---      | ---    |
| 19     | +1       | = 20   |
| 20     | +1       | = 21   |
| 21     | +1       | = 22   |
| 22     | +1       | = 23   |

## Binary
Binary number works exactly the same but now we only have 2 digits

**0 and 1**

We gonna start from 0 and increase it to 5 (because 22 gonna be long in binary)

| base-2 | in base-10 | Increase by | Result |
| -----  | ---        | ---      | ---    |
| 00     | 0          | +1       | = 01   |
| 01     | 1          | +1       | = **?**|

Because we only have 0 and 1 so can not increase the rightmost digit 1->2, there's no digits left so

**We reset the rightmost numbers -> 0 and increase the next number by 1 then we have 10**  
but `10` in this case is not `10 in base-10` it's `2 in base-10`

| base-2 | in base-10 | Increase by | Result |
| -----  | ---        | ---      | ---    |
| 01     | 1          | +1       | = 10   |
| 10     | 2          | +1       | = 11   |
| 11     | 3          | +1       | = 100  |
| 100    | 4          | +1       | = 101  |
| 101    | 5          | +1       | = 111  |

## How about Ternary (base-3)

Ternary number works exactly the same but now we have 3 digits

**0 and 1 and 2**

| base-3 | in base-10 | Increase by | Result |
| -----  | ---        | ---      | ---    |
| 00     | 0          | +1       | = 01   |
| 01     | 1          | +1       | = 02   |
| 02     | 2          | +1       | = 10   |

There's no digit left for the rightmost digit  
**We reset the rightmost numbers -> 0 and increase the next number by 1 then we have 10**  
but `10` in this case is not `10 in base-10` it's `3 in base-10`

| base-3 | in base-10 | Increase by | Result |
| -----  | ---        | ---      | ---    |
| 10     | 3          | +1       | = 11   |
