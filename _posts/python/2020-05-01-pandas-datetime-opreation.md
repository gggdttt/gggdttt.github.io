---
title: Pandas:Time Operation of pandas
tags: Python Pandas timedate
article_header:
  type: cover
---







```python
import pandas as pd

#方法一：
#先利用to_datetime转换为时间格式，tm列的数据形式为'yyyy-MM-dd HH:mm:ss'
df['tm_1'] = pd.to_datetime(df['tm_1'])
df['tm_2'] = pd.to_datetime(df['tm_2'])
#利用".dt.seconds"转换为秒，除以相对于的间隔数得到分钟、小时等
df['diff_time'] = (df['tm_1'] - df['tm_2']).dt.seconds/60
#利用round函数可进行四舍五入
df['diff_time'] = round(df['diff_time'])

#方法二，日期相减变为小时；变为天的话将h替换为D即可：
df['diff_time'] = (df['tm_1'] - df['tm_2']).values/np.timedelta64(1, 'h')

# the comparison of time
delta_t_lt1day = delta_t[delta_t < pd.Timedelta(1,'D')]

delta_t_lt1hour = delta_t[delta_t < pd.Timedelta(1,'h')]

delta_t_lt1minute = delta_t[delta_t < pd.Timedelta(1,'m')]


```







