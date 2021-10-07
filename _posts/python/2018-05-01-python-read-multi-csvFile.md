---
title: Python:Read Multi Csv File as one dataFrame
tags: Python 
article_header:
  type: cover
date:   2018-05-01 16:01:40 +0800
key: python-ReadMultiCsv
aside:
  toc: true
category: [Note,Python]
---





```python
import pandas as pd
import os
inputdir=r'C:\Users\数据\Desktop\新建文件夹'
df_empty=pd.DataFrame(columns=['名称','列1','列2'])
for parents, dirnames, filenames in os.walk(inputdir):
    for filename in filenames:
        df=pd.read_excel(os.path.join(parent,filename))
        df_empty=df_empty.append(df,ignore_index=True)
```





