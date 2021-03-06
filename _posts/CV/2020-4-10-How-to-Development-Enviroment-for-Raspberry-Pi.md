---
title: How to Build Development Environment
tags: EmbeddedDevelopment Raspberry
article_header:
  type: cover
key: Tool-buildDevelopmentEnvironment
aside:
  toc: true
category: [Tool,RaspberryPi]
date:   2020-04-10 16:01:40 +0800
---

## 1. 树莓派连接

### 1.1.WiFi 网络配置

用户可以在未启动树莓派的状态下单独修改 `/boot/wpa_supplicant.conf` 文件配置 WiFi 的 SSID 和密码，这样树莓派启动后会自行读取 wpa_supplicant.conf 配置文件连接 WiFi 设备。

操作方法：将刷好 Raspbian 系统的 SD 卡用电脑读取。在 boot 分区，也就是树莓派的 `/boot` 目录下新建 wpa_supplicant.conf 文件，按照下面的参考格式填入内容并保存 wpa_supplicant.conf 文件。

```shell
country=CN
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
 
network={
ssid="CMCC-TWS4"
psk="peccnq8q"
key_mgmt=WPA-PSK
priority=8
}
 
network={
ssid="warren_m9pro"
psk="82955575"
key_mgmt=WPA-PSK
priority=9
}
```

说明以及不同安全性的 WiFi 配置示例：
**#ssid:网络的ssid**
**#psk:密码**
**#priority:连接优先级，数字越大优先级越高（不可以是负数）**
**#scan_ssid:连接隐藏WiFi时需要指定该值为1**

需要强调的是，其中`#key_mgmt`属性是你的wifi的加密方式，注意一下这里**不管是WPA还是WPA2加密方式，这里都统一填`WPA-PSK`就行了**。

如果你的 WiFi 没有密码

```shell
network={
ssid="你的无线网络名称（ssid）"
key_mgmt=NONE
}
```

如果你的 WiFi 使用WEP加密

```shell
network={
ssid="你的无线网络名称（ssid）"
key_mgmt=NONE
wep_key0="你的wifi密码"
}
```

如果你的 WiFi 使用WPA/WPA2加密

```shell
network={
ssid="你的无线网络名称（ssid）"
key_mgmt=WPA-PSK
psk="你的wifi密码"
}
```

如果你不清楚 WiFi 的加密模式，可以在安卓手机上用 root explorer 打开 `/data/misc/wifi/wpa/wpa_supplicant.conf`，查看 WiFi 的信息。

### 1.2.开启 SSH 服务

如果通过 ssh 连接树莓派出现 Access denied 这个提示则说明 ssh 服务没有开启。要手动开启的话，和 WiFi 配置相似，同样在 boot 分区新建一个文件，空白的即可，文件命名为 ssh。注意要小写且不要有任何扩展名。
树莓派在启动之后会在检测到这个文件之后自动启用 ssh 服务。随后即可通过登录路由器找到树莓派的 IP 地址，通过 ssh 连接到树莓派了。（[有关开启 SSH 服务的详细方法](https://shumeipai.nxez.com/2017/02/27/raspbian-ssh-connection-refused.html)）

如果需要远程桌面方式操作树莓派，可以通过 ssh 安装 xrdp，[再用 Windows 的远程桌面客户端连接到树莓派](https://shumeipai.nxez.com/2013/10/06/windows-remote-desktop-connection-raspberry-pi.html)。

这个小技巧对于没有有线网卡、没有标准 USB 接口来直连键鼠，但集成了 WiFi 的[树莓派 Zero W](https://item.taobao.com/item.htm?id=557980870076) 尤其实用。

### 1.3.树莓派的初始化

初次使用树莓派系统时，默认用户是**pi** ，密码为**raspberry**。

这里我们为了能够使用windows自带的远程桌面

#### 1.3.1 树莓派更换镜像源

如果使用树莓派默认的镜像源，可能下一些工具要一年。。。然后就更新一下树莓派的镜像源先。

先备份 万一崩了拉

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
sudo cp /etc/apt/sources.list.d/raspi.list /etc/apt/sources.list.d/raspi.list.bak
```

```shell
# 编辑 `/etc/apt/sources.list` 文件，删除原文件所有内容，用以下内容取代：
deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main non-free contrib
deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ buster main non-free contrib

# 编辑 `/etc/apt/sources.list.d/raspi.list` 文件，删除原文件所有内容，用以下内容取代：
deb http://mirrors.tuna.tsinghua.edu.cn/raspberrypi/ buster main ui
```

之后需要更新一下apt-get

```shell
sudo apt-get update

sudo apt-get upgrade
#也可以尝试 `sudo apt full-upgrade`
```

#### 1.3.2 树莓派远程桌面连接服务安装

* 方法一：使用windows自带的远程remote工具

```shell
### 在树莓派上安装xrdp服务
sudo apt-get install xrdp
### 在树莓派上安装tightvncserver服务
sudo apt-get install vnc4server tightvncserver
##重新启动xrdp服务
sudo /etc/init.d/xrdp restart
```

注意，安装过程中可能需要使用命令`sudo apt-get update`来更新一下apt-get。然后再执行上面的命令即可

 安装好以上两个服务后，即可使用WIndows自带工具远程连接到树莓派。

* 方法二：使用tightvnc

  后来莫名其妙windows自带的remote工具无法连接或者连上去之后特别卡，我就在网上找了另外一种方法连接

  * WIN10上安装：
    下载软件：tightvnc-2.8.5-gpl-setup-64bit.msi
    下载地址：http://www.tightvnc.com/
    下载完成后，一路默认安装到底。

  * raspberry上安装：

    ```shell
    $ sudo apt-get update
    $ sudo apt-get install tightvncserver
    $ tightvncserver
    ```

    此时，会要求输入密码，总共输入4次

  * **具体使用：**

    PC端运行：tightvnc viewer
    如下所示：

    <img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051323529" alt="这里写图片描述" style="zoom:80%;" />

    输入树莓派地址：如图所示。
    注意：**IP地址后的数字不要忽略**，从1 开始…，我试了了1，2，3都行，换据话说，可以多台PC 同时连接上来，估计每个的桌面内容不同…点”connect“后，就可以看到树莓派的桌面了。（而且非常流畅）

    如果安装完之后发现连接之后的文件管理器点开后闪退，再次`sudo apt full-upgrade`即可。

#### 1.3.3 树莓派摄像头的安装

**警告：摄像头对静电非常敏感。如果您在安装摄像头电路板时没有防静电手环，可以尝试触摸一下水龙头、金属水槽或其它类似的东西即可。**
摄像头电路板与 Raspberry Pi 通过一条 15 芯的排线进行连接。仅有两个连接座需要连接，排线需要安装到摄像头电路板和 Raspberry Pi 上。您需要正确安装，否则摄像头无法工作。对于摄像头电路板，排线末端的蓝色标记应该背对着电路板。而 Raspberry Pi 部分，蓝色标记应该正对着网络接口方向。

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051323675" alt="img" style="zoom:80%;" />
尽管两部分连接座不尽相同，但它们的工作方式很相似。对于 Raspberry Pi，拉起连接座两端的卡扣。它应该很容易拉起，并能够轻微活动。把排线完全插入到连接座中，并保证竖直，然后轻轻按下两端的卡扣。摄像头电路板方面，也需要您将卡扣向电路板相反方向拉开，然后轻轻插入排线，最后将卡扣推回。摄像头电路板的连接座与 Pi 上的区别就在这里。

硬件安装完毕之后，下面进行软件的安装。

执行下文介绍的命令行进行下载并安装最新的内核，GPU 固件及应用程序。您需要连接到互联网才可以实现以下操作。

```shell
$ sudo apt-get update
$ sudo apt-get upgrade
```

接下来，您首先需要在 Raspberry Pi 的 raspi-config 程序中启用摄像头的支持。

* 连接摄像头与树莓派
* 修改树莓派配置，开启摄像头模块。

```shell
$ sudo raspi-config
```

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051323257" alt="这里写图片描述" style="zoom:80%;" />
       将光标移动到摄像头选项（Camera option）处，并选择启用（Enable）。在退出 raspi-config 时会要求您重新启动。启用选项是为了确保重启后 GPU 固件能够正确运行（包括摄像头驱动和调节电路），并且 GPU 从主内存划分到了足够的内存使摄像头能够正确运行。

![这里写图片描述](https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051323241)


测试系统已经完成安装并正常工作，可尝试以下命令：

```shell
$ raspistill -v -o test.jpg
```

> 这里如果无法正常运行摄像头，可以试着**reboot**一下

这个命令将显示来自摄像头 5 秒钟的预览图像，并且拍摄一张照片，然后保存为文件 test.jpg，保存在/home/pi的目录下面，同时显示出需要相关信息。

> 这里需要着重说明的一点是：如果你的树莓派没有安装图片相关文件的查看器，是无法通过图形用户界面发现这个`test.jpg`的。我们需要在命令行界面中通过`ls`命令才能发现。如果想查看这张图片，可以安装图片查看器。

[更多有关树莓派摄像头的命令请点击](https://blog.csdn.net/fhqlongteng/article/details/80433633 )

#### 1.3.4 开发相关软件的安装

* **1.3.4.1** python 3.x 的安装

  如果 `which python3` 返回空，运行 `sudo apt-get install python3`。

* **1.3.4.2**  nodejs的安装

  * Node.js 二进制包下载

  

  <img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051323473.jpg" alt="img" style="zoom:80%;" />

  > 登录 Node.js 官网，我们可以从下载页面看到，Node.js 提供了 ARM 平台的的二进制包下载，我们的树莓派3B官网Raspbian系统是属于 ARMV7l的，因此我们选择对应的二级制包下载即可，具体方法如下：

  ```shell
  wget https://nodejs.org/dist/v10.0.0/node-v10.0.0-linux-armv7l.tar.xz
  ```

  > 有部分宽带可能存在下载慢的问题，如果遇到下载非常慢的情况，我们也可以尝试使用国内的镜像源下载：

  ```shell
  wget https://npm.taobao.org/mirrors/node/latest/node-v10.0.0-linux-armv7l.tar.xz
  ```

  * 解压并安装 Node.js

    下载完成后，我们需要先解压刚下载好的包，具体方法如下：

  ```shell
  xz -d node-v10.0.0-linux-armv7l.tar.xz
  tar -xavf node-v10.0.0-linux-armv7l.tar
  ```

  完成解压后，我们将 Node.js 的二进制包移动到 `/usr/local/node` 中，操作如下：

  ```shell
  sudo mv ./node-v10.0.0-linux-armv7l /usr/local/node
  # 如果系统内原本存在 /usr/bin.node ，先将其删除
  sudo rm -rf /usr/bin/node
  ```

  完成后，我们在为 `node` 和 `npm` 创建软连接：

  ```shell
  sudo ln -s /usr/local/node/bin/node /usr/bin/node
  sudo ln -s /usr/local/node/bin/npm /usr/bin/npm
  ```

  然后，我们尝试测试一下 node 是否能正常使用：

  ```shell
  node --version
  >> v10.0.0
  npm --version
  >>
  5.6.0
  ```

  到这里为止，我们已经完成在 Raspbian 系统上安装 Node.js 了。

* **1.3.4.3**  Nginx Server

  安装 nginx：`sudo apt-get install nginx`

  开启服务器：`sudo /etc/init.d/nginx start`

* **1.3.4.4**   音频视频相关

  安装ALSA开发库：**sudo apt-get install libasound2-dev**。如果返回 404，先运行 **sudo apt-get upgrade --fix-missing**。

  ***avconv*** 用来转换录像为 .mp4 格式：**sudo apt-get install libav-tools**

  ***mpg123*** 用来播放 .mp3：**sudo apt-get install mpg123**

* **1.3.4.5**  下载 repo

```shell
cd ~
git clone https://github.com/shaqian/PiBot.git
```

## 2.测试/安装硬件

### 2.1 马达驱动及马达

* 按电路图接线。

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051322637.jpg" alt="img" style="zoom:80%;" />

* 安装 [rpio](https://link.zhihu.com/?target=https%3A//github.com/jperkin/node-rpio)，运行 **npm install rpio**

* 运行 **node**

* 初始化端口输出:

```text
var rpio = require('rpio');
rpio.open(29, rpio.OUTPUT, rpio.LOW);
rpio.open(31, rpio.OUTPUT, rpio.LOW);
rpio.open(38, rpio.OUTPUT, rpio.LOW);
rpio.open(40, rpio.OUTPUT, rpio.LOW);
```

* 前进:

```javascript
rpio.write(29, rpio.LOW);
console.log('Pin 29 is currently ' + (rpio.read(29) ? 'high' : 'low'));
rpio.write(31, rpio.HIGH);
console.log('Pin 31 is currently ' + (rpio.read(31) ? 'high' : 'low'));
rpio.write(38, rpio.LOW);
console.log('Pin 38 is currently ' + (rpio.read(38) ? 'high' : 'low'));
rpio.write(40, rpio.HIGH);
console.log('Pin 40 is currently ' + (rpio.read(40) ? 'high' : 'low'));
```

* 后退:

```python
rpio.write(29, rpio.HIGH);
rpio.write(31, rpio.LOW);
rpio.write(38, rpio.HIGH);
rpio.write(40, rpio.LOW);
```

* 停止:

```python
rpio.write(29, rpio.LOW);
rpio.write(31, rpio.LOW);
rpio.write(38, rpio.LOW);
rpio.write(40, rpio.LOW);
```

* **问题汇总：**

  这里我走了不少弯路，因为正常情况下走到这一步就可以正常的驱动点击了，下面是我汇总的问题：

  * **问题一：L298N的电源指示灯不亮：**干电池作为电源接通L298N后发现L298N的电源指示灯不亮，排查一下是否是因为其电压未达到L298N的需要的电压*(我的L298N需要至少5v才能驱动，但是第一次买的爱乐普的可充电池四节电压只有1.2x4=4.8v,没达到驱动电压的标准，晕死）*
  * **问题二：L298N电源指示灯正常亮，接线也正常，但是给到前进后退的信号的时候小车不动：**我这边的主要原因是，**没有将树莓派的ground和L298N的地线接起来**。一般来说，两个ground应该都是一样的，但是有的时候会出现树莓派的ground和L298N（或者电源）的ground不一致。将电源的负极、树莓派任意一个ground针脚（树莓派有多个ground针脚）引出来的线接到L298N的ground口之后，小车正常运转！

  > 总结一下：1.电池电压不够；2.没有供地导致L298N没有获取到明显的电压变化，故无反应。

### 2.2 红外接收模块

> 红外接收模块用来接收和解码遥控器信号，然后树莓派发送相同信号即可模拟遥控器。
> 代码借用[这个 repo](https://link.zhihu.com/?target=https%3A//github.com/tanhangbo/RaspberryIR)，修改了端口，以及 ST_BASE 的值，树莓派 3 (BCM2837) 为0x3F003000 ，而旧版为 0x20003000。

* 按电路图接线：

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051321123.jpg" alt="img" style="zoom:80%;" />

* 运行 **gpio -v** 检查是否已安装 wiringPi。没有的话，安装 [Wiring Pi](https://link.zhihu.com/?target=http%3A//wiringpi.com/download-and-install/)。

* 运行 **cd ~/PiBot/PiBotServer/bin**。编译代码生成可执行文件：

```shell
gcc ir_decode.c -lwiringPi -o decode.out
chmod +x decode.out
```

* 运行 **sudo ./decode.out**。没有信号时屏幕每秒打印 *[0]*。

* 将遥控器对准红外接收模块并按键。解码后的信号为一串十六进制数，如：*0xb2,0x4d,0x1f,0xe0,0x98,0x67,[48]*。

* 重复以上步骤，解码空调开机和关机的信号。

### 2.3  红外发射模块

> 红外解码完成后移除红外接收模块

* 按电路图接线：

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051321022.jpg" alt="img" style="zoom:80%;" />

* 运行以下命令复制编码代码：

```shell
cd ~/PiBot/PiBotServer/bin
cp ir_encode.c on.c
cp ir_encode.c off.c
```

* 运行 **vi on.c**，将 166 行的十六进制数改为解码所得的开机信号，如：

```shell
char data[6] = {0xb2,0x4d,0x1f,0xe0,0xd8,0x27};
```

* 运行 **vi off.c**，将 166 行的十六进制数改为解码所得的关机信号，如：

```shell
char data[6] = {0xb2,0x4d,0x7b,0x84,0xe0,0x1f};
```

* 编译代码生成可执行文件：

```shell
gcc on.c -lwiringPi -o on.out
chmod +x on.out
gcc off.c -lwiringPi -o off.out
chmod +x off.out
```

* 发射开机信号：**sudo ./on.out**

* 发射关机信号：**sudo ./off.out**

### 2.4 摄像头

借用[ picam ](https://link.zhihu.com/?target=https%3A//github.com/iizukanao/picam)生成 [HTTP Live Streaming (HLS)](https://link.zhihu.com/?target=https%3A//developer.apple.com/streaming/) 直播视频流。

* 将树莓派摄像头接至树莓派。

* 运行 **sudo raspi-config**，选择 **Interfacing Options**，选择 **Camera** > **Yes**。

* 安装 picam 的依赖:

```shell
sudo apt-get update
sudo apt-get install libharfbuzz0b libfontconfig1
```

* 创建目录和软连接:

```shell
cd ~;mkdir picam;cd picam
cat > make_dirs.sh <<'EOF'

#!/bin/bash
DEST_DIR=~/picam
SHM_DIR=/run/shm
mkdir -p $SHM_DIR/rec
mkdir -p $SHM_DIR/hooks
mkdir -p $SHM_DIR/state
mkdir -p $DEST_DIR/archive
ln -sfn $DEST_DIR/archive $SHM_DIR/rec/archive
ln -sfn $SHM_DIR/rec $DEST_DIR/rec
ln -sfn $SHM_DIR/hooks $DEST_DIR/hooks
ln -sfn $SHM_DIR/state $DEST_DIR/state
EOF

chmod +x make_dirs.sh
./make_dirs.sh
```

* 安装 picam 库:

```shell
wget https://github.com/iizukanao/picam/releases/download/v1.4.6/picam-1.4.6-binary-jessie.tar.xz
tar xvf picam-1.4.6-binary-jessie.tar.xz
cp picam-1.4.6-binary-jessie/picam ~/picam/
```

* 创建 HLS 视频直播流:

```shell
cd ~/picam
./picam -o /run/shm/hls
```

*  配置 Nginx 服务器。运行 **sudo vi /etc/nginx/sites-available/default**，在 server 的 { ... } 块中添加以下内容:

```shell
location /hls/ {
root /run/shm;
}
```

* 重启 Nginx:

```shell
sudo /etc/init.d/nginx restart
```

* 测试播放视频流：

> HLS 地址为 http://[IP-of-Raspberry-Pi]/hls/index.m3u8

i.使用 Mac 自带的 QuickTime 播放：

​	打开 ***QuickTime***，选择 ***File*** > ***Open Location***, 输入 **http://[IP-of-Raspberry-Pi]/hls/index.m3u8**。

ii. 或使用网页播放：

​	a. 下载测试用的 html 复制至 Nginx 服务器根目录：
**sudo cp ~/PiBot/PiBotServer/public/hls_test.html /var/www/html/hls_test.html**

​	b. 在树莓派或同一网络中的电脑上，打开浏览器，转到 **http://[IP-of-Raspberry-Pi]/hls_test.html**。

### 2.5 测试2D激光雷达

> 先留着坑，后面来写

## 3.配置python的远程开发（Pycharm）

> 如果想尝试远程开发，即在自己的pc端开发写代码然后在树莓派上运行，可以尝试下面的方法：
>
> reference:[pycharm远程连接树莓派并调试代码](https://blog.csdn.net/xuancailinggan/article/details/94656107?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-3&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-3)

### 3.1 树莓派接入网络

详见`1.树莓派连接`。

### 3.2 配置PyCharm并运行程序

* 首先打开PyCharm，新建一个项目：

  > 其实我们既可以在项目创建的时候配置，也可以在项目创建以后配置。这里演示的是先创建，后修改。

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051320690.png" alt="1586686585910" style="zoom: 50%;" />


我们点击`Create`按钮创建项目

* 现在进行项目的配置:
  `file`—`settings`—`project`：`Demo`
  然后配置解释器

* 初次配置，我们点击小齿轮，选择Add，也就是增加一个解释器

  <img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051319441.png" alt="1586686853726" style="zoom: 50%;" />

* 选择SSH编译器，也就是用SSH方式连接

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051319701.png" alt="1586695296758" style="zoom: 50%;" />

TIP:这里的填写的依次是树莓派址和树莓派的用户名，端口不改。

* 点击下一步输入树莓派系统的密码

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051319010.png" alt="1586695329227" style="zoom: 50%;" />

* 点击下一步，设置解释器。
  * 点击文件夹选项，在/usr/bin下找到你想要使用的版本，因为树莓派安装了2和3，但是2以后是要淘汰的，我这里选择的是/usr/bin/python3.5
  * 同时记得勾选root权限，不然后续代码肯能运行有问题。

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051318177.png" alt="1586695363793" style="zoom:50%;" />

TIP:当然，这个过程中你也可以配置其他选项，比如文件的远程存放位置和名字之类的，就不一一赘述了。

* 点击完成，创建就完毕了。

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051318095.png" alt="1586695429771" style="zoom: 50%;" />

* 无报错，则证明创建过程无错误。创建后会将项目代码传输到树莓派里面去，这里红色字体是因为我的项目没有文件可以传输。

<img src="https://raw.githubusercontent.com/gggdttt/ImageBeds/master/img/202110051318026.png" alt="1586695460722" style="zoom: 50%;" />

**当然，需要注意的是传输的默认位置，在树莓派的临时文件夹，系统重启以后将被清空。所以，请勿轻易删除本地代码文件。**

* 写完代码，运行。这里代码被自动上传到树莓派系统的/tmp/pycharm_project_947/去执行了。
  `sudo+ssh://pi@192.168.0.101:22/usr/bin/python3.5`是告诉了我们解释器用的是哪一个，sudo表示管理员权限。
  现在，你可以写自己的代码了，在运行的时候，他会调用树莓派的解释器，实现树莓派上显示实时效果。







