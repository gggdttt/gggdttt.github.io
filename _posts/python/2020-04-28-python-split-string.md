---
title: Python:Split string with multi-operator
tags: Python 
article_header:
  type: cover
---



re模块的split()函数可以使用多个分隔符对句子进行分割，其中不同的分隔符要用 “|” 隔开。



```python
import re
 
re.split('。|！|？',text)
Out[67]: ['你好', '吃早饭了吗', '再见', '']
```





