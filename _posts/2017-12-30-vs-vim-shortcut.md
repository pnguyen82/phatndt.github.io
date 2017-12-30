---
title: Vim in VS shortcut
layout: default
categories: productivity
---
## VS shortcut
- `cmd + b`: show/hide file explorer
- `cmd + opt+right arrow/left arrow`: next/previous tab
- `cmd \`: split view 



## Vim shortcut
- copy then paste replace:
ex:
```
{(
list.add(abc)
aff
)
}
```
- `vib`: slellect inside block ()
- Inside a yarenthesis blocky, I use vib ("select inner block")
- Inside a curly braces block you can use viB ("capital B")
- To make the selections "inclusive" (select also the quotes, parenthesis or braces) you can use `a` instead of `i`.
- surround:
  * `d s` `<existing char>`	Delete existing surround
  * `c s` `<existing char>` `<desired char>`	Change surround existing to desired
  * `y s` `<motion>` `<desired char>`	Surround something with something using motion (as in "you surround")
  * `S`  `<desired char>`	Surround when in visual modes (surrounds full selection)
