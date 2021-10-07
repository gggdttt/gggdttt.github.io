---
title: Python:Split string with multi-operator
tags: Python 
article_header:
  type: cover
date:   2018-04-28 16:01:40 +0800
key: python-splitString
aside:
  toc: true
category: [Note,Python]
---



re模块的split()函数可以使用多个分隔符对句子进行分割，其中不同的分隔符要用 “|” 隔开。



```python
import re
 
re.split('。|！|？',text)
Out[67]: ['你好', '吃早饭了吗', '再见', '']
```





