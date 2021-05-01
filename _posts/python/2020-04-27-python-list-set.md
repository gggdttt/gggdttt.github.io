---
title: Python:List and Set
tags: Python DataAnalysis
article_header:
  type: cover
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



