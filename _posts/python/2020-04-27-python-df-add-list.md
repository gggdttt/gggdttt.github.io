---
title: Python:add new columns
tags: Python DataAnalysis Pandas
article_header:
  type: cover
---

- 如果需要在指定的位置添加新的一列，可以使用insert( )方法。



```python
df_google_map.insert(len(df_google_map.columns),i,'')
```



