---
title: How to detect function's type by hand
tags: F#
article_header:
  type: cover
date:   2021-09-29 16:01:40 +0800
key: Note-DetectTypeByHand
aside:
  toc: true
category: [Note,F#]
---



This exercise is on book《Functional Programming Using F#》.

## Exercise 4.18

```java
let rec f g = function
| [] -> [] 
| x::xs -> g x :: f (fun y -> g(g y)) xs;;
//Find the type for f and explain the value of the expression:
f g [x0; x1; x2; . . . ; xn−1]
```

1. From `let rec f g = function`, we can not make sure anything about f and g.

   > f: ??->??

2. According to the `[]->[]`, it is clear that the result of `f` is a type of list, but we can not deduce which type it is. And the input of `f` is also a list. ~~We could guess that `g` is an argument whose type is a list~~(It is wrong after reading the next line).  For we can not deduce the concrete type so here we set it as an abstract type : `'a`

   > f:  'a list -> 'a list

3. The pattern `x::xs` ensures our deduce of the input of f is a list.  But then we find the usage of `g x`.  So we get an error deduce that `g` is an argument of list-- actually `g` is a function here. So there is an additional parameter  `_arg` which is a list.

   > f:            g:(??->??)->_arg: 'a list -> 'a list

   Then with `f (fun y -> g(g y)) xs ` , we could ensure that `f` is a function with two parameters: `(fun y -> g(g y))` (g) and `xs`(_arg). And with `g(g y))` ,we could determine that the input and result of `g` is the same.

   >  f:        g:('a ->'a )->_arg: 'a list -> 'a list

