---
title: Python: List and Set
tags: Python DataAnalysis
article_header:
  type: cover
date:   2018-04-27 16:01:40 +0800
key: python-ListAndSet
aside:
  toc: true
category: [Note,Python]
---



Here  we need ast. 

```python
from ast import literal_eval

location_type = set([])
for i in df_google_map['type']:
    mlist = literal_eval(i)
    for item in mlist:
        location_type.add(item)
```



