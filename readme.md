# 朋友圈

## 项目概述
在前面的项目中，我们实现一篇个人游记、完成了博客美化，以及个人简历的制作。或许有些同学会觉得这几个项目都十分简单。
那么接下来的实战项目估计能让你眼前一亮。

接下来我们将利用至今所学到的所有知识，来开发一个我们生活中十分熟悉以及火热的页面。那就是 `微信的朋友圈`。



## 项目说明

- 仓库：[moments](http://git.imweb.io/imweb-teacher/moments)
- 目标：完成6个任务，实现一个基本微信朋友圈的界面


### 项目结构
- moments.html 页面 HTML 
- style.css 样式基本样式
- app.js 页面逻辑 （提供了基础的逻辑函数和页面数据变量 `data`）
- img 存放页面展示所需的图片
- demo 存放文档展示的效果图
- message.html 多图片消息的html结构的示例
- readme.md 项目说明文档


## 具体要求
### 1、实现四种消息类型
对于朋友圈页面，消息大致分成四种情况：
#### 1.1、多图片消息 (消息 type 为0)


![](http://coding.imweb.io/img/project/moments/type1.png)

#### 1.2、分享消息  (消息 type 为1)

![](http://coding.imweb.io/img/project/moments/type2.png)

#### 1.3、单图片消息 (消息 type 为2)

![](http://coding.imweb.io/img/project/moments/type3.png)

#### 1.4、无图片消息 (消息 type 为3)

![](http://coding.imweb.io/img/project/moments/type4.png)


`注：基础代码已提供多图片消息的实现方法，需补充完成其余三种消息的展现所需的html、css和js。`

### 2、将提供的页面数据 `data` 转换成页面
在app.js 中提供了以下页面数据 ：
- userName： 用户名称 （可修改为自己的名字）
- data: 页面消息数据对象数组，需要对这个数据进行解析，并生成页面

```javascript
// 用户名称 - 修改为自己的名称
var userName = '张学友';
// 需要渲染的页面的数据
var data = [...];
```


### 3、实现回复按钮功能
- 点击信息的回复按钮，弹出回复操作面板
- 同时只能展现一个回复操作面板
- 点击非回复操作面板的区域，隐藏回复操作面板

具体效果如下：

![](http://coding.imweb.io/img/project/moments/replypanel.gif)


### 4、实现点赞功能
- 对于未点赞的信息，点击回复按钮，展现点赞的按钮

![](http://coding.imweb.io/img/project/moments/icon-like.png)

- 对于已点赞的信息，点击回复按钮，展现取消点赞的按钮

![](http://coding.imweb.io/img/project/moments/icon-unlike.png)

- 点击点赞按钮，完成点赞
- 点击取消按钮，取消点赞

具体效果如下：


![](http://coding.imweb.io/img/project/moments/like.gif)


### 5、实现增加评论功能
- 点击回复按钮，底部展现输入框和发送按钮
- 当文本框为空，发送按钮为灰色不可点击状态
- 当文本框不为空，发送按钮为绿色且点击发送，在信息栏中增加信息


具体效果如下：

![](http://coding.imweb.io/img/project/moments/comment.gif)


### 6、点击图片放大功能
- 点击信息的图片，展示放大图片
- 点击放大展示的图片区域，隐藏放大图片区域

具体效果如下：

![](http://coding.imweb.io/img/project/moments/pic.gif)



PS：做好项目之后，你也可以写个简单的总结，对之前的知识进行一个回顾吸收。如果有什么疑问，也可以到我们的 [issue](http://git.imweb.io/imweb-teacher/moments/issues) 上进行提问（提问之前，可以先看下是否有人曾经提过类似的问题，减少没必要的重复问题）。