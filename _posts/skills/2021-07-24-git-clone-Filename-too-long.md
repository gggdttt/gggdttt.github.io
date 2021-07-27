---
title: git clone 时显示Filename too long的解决办法
tags: git
article_header:
  type: cover
---



在git bash中，运行下列命令： git config --global core.longpaths true

就可以解决该问题。

--global是该参数的使用范围，如果只想对本版本库设置该参数，只要在上述命令中去掉--global即可。

[End]()

{:.info}  
