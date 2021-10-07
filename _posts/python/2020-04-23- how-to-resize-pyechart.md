---
title: echarts setting size
ags: Python Pyechart
article_header:
  type: cover
date:   2020-04-23 16:01:40 +0800
key: python-echartsSettingSize
aside:
  toc: true
category: [Note,Python]
---





内部图表大小是与div容器大小相关的，如果想调整图表大小，调整div就可以了

如果是想调整图表与div间上下左右留白，则设置grid属性就可以了



![img](https://img-blog.csdn.net/20170926102918841?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzM5NTE1NDk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



```javascript

option = {
     title:'',
     grid:{
               x:35,
               y:55,
               x2:35,
               y2:60,
               borderWidth:1
              },

```

