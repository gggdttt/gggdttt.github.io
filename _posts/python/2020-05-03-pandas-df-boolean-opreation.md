---
title: Pandas:Boolean Operation of pandas
tags: Python Pandas 
article_header:
  type: cover
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







