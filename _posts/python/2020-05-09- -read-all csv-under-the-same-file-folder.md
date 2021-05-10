---
title: Read All Csv files in the same file folder
tags: Python Pandas
article_header:
  type: cover
---

We need use the lib `glob`. According to it we could get all the files' names.

Then we could use `pd.concat` to read all the csv here.

```python
import glob
path = r'./Transaction' # use your path
all_files = glob.glob(path + "/*.csv")
df_transaction = pd.concat((pd.read_csv(f, sep=';', encoding='iso-8859-1') for f in all_files))

df_transaction['Dato/tid parkeringsstart'] = pd.to_datetime(df_transaction['Dato/tid parkeringsstart'],format='%d-%m-%Y, %H:%M')
df_transaction['Dato/tid parkeringsslut'] = pd.to_datetime(df_transaction['Dato/tid parkeringsslut'],format='%d-%m-%Y, %H:%M')
df_transaction = df_transaction.sort_values(by='Dato/tid parkeringsstart')
```

