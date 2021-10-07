---
title: Pandas:Boolean Operation of pandas
tags: Python Pandas 
article_header:
  type: cover
date:   2018-05-03 16:01:40 +0800
key: python-booleanOperator
aside:
  toc: true
category: [Note,Python]
---





Don't use `not`. Use `~`

```python
In [7]: s = pd.Series([True, True, False, True])

In [8]: ~s
Out[8]: 
0    False
1    False
2     True
3    False
dtype: bool

```







