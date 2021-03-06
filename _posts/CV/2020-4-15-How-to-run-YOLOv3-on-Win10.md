---
title: Configure Darknet YOLOv3 on Win10 + VS2019 
tags: CV
article_header:
  type: cover
key: Note-configureDarknetYolov3
aside:
  toc: true
category: [Note,CV]
date:   2020-04-15 16:01:40 +0800
---





> Reference：https://pjreddie.com/darknet/yolo/
>
> 这个链接是YOLO的官方网站。
>
> 想要了解更多YOLO3更新的内容的同学，可以点击https://pjreddie.com/darknet/yolo/ 下载paper阅读。

其实YOLO团队已经训练完成了很多内容，我们只需要下载就能将其应用到我们的程序中。

我的配置

- CPU: i7-8565u（别吐槽我用的轻薄本=-=）
- GPU: GeForce MX150（同上）
- OS: Windows 10 家庭中文版 64bit
- CUDA: 10.2
- CUDNN: 7.6.4
- OpenCV: 3.2

> 此处默认读者已部署上述环境,值得一提的是如果读者有**部署GPU版本**的需求的话,切记前往NVIDIA官网查看驱动版本是否需要更新,否则容易遇到GPU版无法正常运行的问题,**永远不要相信第三方检测工具告诉你的数据**,笔者为此浪费近两个小时时间 = =
>
> 另外希望读者注意安装VS2017 / VS2019时特别注意**勾选MSVC v140组件**，且安装VS后再安装CUDA及CUDNN
>
> CUDA和CUDNN完整的安装过程可以参考：https://blog.csdn.net/c20081052/article/details/86683446
>
> 全部过程也可以参考：https://blog.csdn.net/StrongerL/article/details/81007766

## 1.win10 下直接运行YOLO

### 1.1 下载项目

前往[Darknet YOLOv3](https://github.com/alexeyab/darknet)下载项目或`git clone https://github.com/alexeyab/darknet.git`

需要注意的是：**这里的版本是可以适用于win10的，官方的版本只测试了mac和linux上可能会出错**

### 1.2 修改配置文档

* 首先我们进入到`.\darknet\build\darknet`目录下，用sublime或记事本打开`darknet.vcxproj`,将2个`CUDA xx.x[版本号，一般默认都是9.0]`替换为自己的CUDA版本号，例如本人使用CUDA 10.2,则替换为CUDA 10.2即可。

  TIP:在部分比较老的文章中，这里默认的版本号是`9.1`,推荐大家直接在文本中搜索`CUDA`即可，替换掉标签上的两处。

* 这里我顺便给各位从来没有接触过的新手解释一下，这个路劲下的内容：

  <img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051300071.png" alt="1587631765569" style="zoom:80%;" />

  ​	熟悉 VS的小伙伴们应该知道，`.sln`文件对应的是一个个vs项目。这里一共有5个.sln文件，对应了5种不同的在windows下的YOLO版本。

  * darknet.sln,这个版本是可以直接生成`.exe`文件的，可以直接在win10下运行
  * darknet_no_gpu.sln ,这个版本也是可以直接生成`.exe`文件的，但是不调用gpu会慢很多。（现在一般电脑哪怕是轻薄本都会带个显卡，所以推荐编译gpu版本，会快不少）
  * yolo_console_dll.sln,一般用不到，略
  * yolo_cpp_dll.sln，重头戏，后面如果我们要在编程的时候调用yolo，需要编译这个版本，然后会生成我们需要的dll文件等。这样我们可以在c++编程种调用yolo也可以在python编程中调用。具体步骤可以看**2.win10下python调用yolo**。
  * yolo_cpp_dll_no_gpu.sln，同上但是不调用gpu。



### 1.3 visualStudio 2019编译

#### **1.3.1** 

打开`darknet.sln`,应该会弹出如下图所示界面，如果没有就在选项卡中 项目–重定向打开，特别注意平台工具集选择无升级，且**SDK版本要选择具体的版本，不能选`最新版`**，否则选了编译会有报错。

[<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051301247.png" alt="KkePSJ.png" style="zoom:80%;" />](https://imgchr.com/i/KkePSJ)

#### **1.3.2** 

同时打开选项卡 调试–darknet属性修改项目属性。

配置属性–VC++目录–包含目录–编辑
填入(.为读者opencv路径)
`.\opencv\bulid\include`
`.\opencv\bulid\include\opencv`
`.\opencv\bulid\include\opencv2`

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051301981.png" alt="KkdWCQ.png" style="zoom:80%;" />

#### **1.3.3** 配置属性–VC++目录–库目录–编辑

填入`.\opencv\bulid\x64\vc14\lib`
<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051301581.png" alt="Kkdj29.png" style="zoom:80%;" />

#### **1.3.4** 链接器–输入–附加依赖项

加入`.\opencv\build\x64\vc14\lib`下读者的库名字（根据opencv版本变化会有不同）
<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051301766.png" alt="Kkwi5D.png" style="zoom:80%;" />

### 1.4 进行编译 

* 将`.\opencv\build\x64\vc14\bin`下的`opencv_world330.dll` 和`opencv_ffmpeg330_64.dll`(每个版本这两个文件的名称可能会有略微不同，比如我这边的是320而不是330) 复制到 `.\darknet\darknet-master\build\darknet\x64`目录下。

* 检查项目属性为Release、 x64后，右键项目重新生成即可。

* <img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051301234.png" alt="KkwQIS.png" style="zoom:80%;" />

* 生成结果：根据上述步骤，我的`darknet-master\build\darknet\x64`下出现了`darknet.exe`以及相关文件。

  <img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051301609.png" alt="1587633781005" style="zoom:80%;" />

### 1.5 进行yolo的测试

前往[Darknet Github](https://github.com/AlexeyAB/darknet/blob/master/README.md)下载训练好的模型进行测试，如下图所示，根据自己需求（可以选择YOLOV3也可以选择YOLOV3-tiny，后者更小，更适合用于实时目标检测，更符合我目前的需求）。
<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051301690.png" alt="KkwfIO.png" style="zoom:80%;" />
以yolov3.weights为例，

进到对应目录下的cmd命令行，输入：

```shell
darknet detect cfg/yolov3.cfg yolov3.weights data/bird.jpg
#darknet [detect] [选用哪个cfg文件][选用哪个对应的weights] [识别哪张图片] 
```

当然你要确保你的data路径下有这张图片，才能识别。你也可以自己去截图然后丢进去跑。

## 2. win10下通过python调用YOLO

### 2.1 编译出python所库

重复1.1-1.4所有步骤，唯一不同的是这次我们打开的项目是`\darknet-master\build\darkne\yolo_cpp_dll.sln`

大致步骤（细节部分可以参考上文）：

* 修改`yolo_cpp_dll.vcxproj`，把里面的两个CUDA的版本修改到和自己的一致（修改方法如1.2，只是需要打开的文件不同）

* 在VS中进行变量的相关配置（如1.3）

* 选择`X64`和`Release`之后，进行编译，编译结束之后，我们就有了这些内容：

  <img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051300097.png" alt="1587636665977" style="zoom:80%;" />

### 2.2 python运行yolo

其实我们不难发现，在`\darknet-master\build\darknet\x64`路径下官方早就给我们写好了`darknet.py`，我们如果需要修改功能也可以直接在里面修改或者模仿其进行编码即可。我们这边就以运行改文件为例子：

#### 2.2.1 确认python的版本以及位数

这边我踩过一个坑，就是python官网你直接点击`Download`它默认给你下载的32位的，我们需要下载一个64位的python，否则会在运行的时候报`OSError: [WinError 193] %1 不是有效的 Win32 应用程序`这个错。

下面是我的python版本，换了64位的python之后就可以运行了。

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051300435.png" alt="1587637354802" style="zoom:80%;" />

#### 2.2.2  给python安装必要的包

其实一开始我也不知道要怎么用python运行，然后忽然发现在`\darknet-master\build\darknet\x64`文件夹下有好多`.cmd`文件，其中有个`darknet_python.cmd`，右击用文本打开之后发现了宝藏：

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051300064.png" alt="1587637913803" style="zoom:80%;" />

其内容如下（我自己加了简单的注释）：

```shell
# 不推荐用python2，因为2020年可能要废弃python2（不再更新维护了）
rem download Python 2.7.14 from: https://www.python.org/downloads/release/python-2714/
rem C:\Python27\Scripts\pip install numpy
rem C:\Python27\Scripts\pip install scikit-image
rem C:\Python27\Scripts\pip install scipy
rem C:\Python27\Scripts\pip install opencv-python

rem C:\Python27\python.exe darknet.py


# python 3需要的包，其pip安装位置和2.7不大一致
#分别是numpy、scikit-image、scipy和opencv包
rem Python 3.6
rem C:\Users\Alex\AppData\Local\Programs\Python\Python36\Scripts\pip install numpy
rem C:\Users\Alex\AppData\Local\Programs\Python\Python36\Scripts\pip install scikit-image
rem C:\Users\Alex\AppData\Local\Programs\Python\Python36\Scripts\pip install scipy
rem C:\Users\Alex\AppData\Local\Programs\Python\Python36\Scripts\pip install opencv-python

#运行py文件
C:\Users\Alex\AppData\Local\Programs\Python\Python36\python.exe darknet.py

pause
```

我们需要给python3安装这些东西，然后为了速度快些我们给pip替换成清华的镜像源，具体流程如下：

* 将清华镜像源设置为默认

  升级 pip 到最新的版本 (>=10.0.0) 后进行配置（如果显示没有权限，则以管理员权限打开）：

```
pip install pip -U
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

* 升级完成之后，在cmd中输入以下命令，分别安装numpy、scikit-image、scipy和opencv包

``` shell
pip install numpy
pip install scikit-image
pip install scipy
pip install opencv-python
```

* 打开IDLE（3.7-64bit），`File`->`open`->`[你的darknet/darknet-master\build\darknet\x64]/darknet.py`，打开之后，选择`run`,运行之后如下：

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051300631.png" alt="1587655182498" style="zoom:80%;" />

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051300588.png" alt="1587655211829" style="zoom:80%;" />









> reference:[https://www.zhezhi.press/2019/10/17/win10-vs2019-%E9%85%8D%E7%BD%AEdarknet-yolov3/](https://www.zhezhi.press/2019/10/17/win10-vs2019-配置darknet-yolov3/)

