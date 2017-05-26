// 用户名称 - 修改为自己的名称
var userName = '张学友';
// 需要渲染的页面的数据
var data = [{
  user: {
    name: '刘德华',
    avatar: './img/avatar-liudehua.png'
  }, 
  content: {
    type: 0, // 多图片信息
    text: '感谢大家，新的一年继续努力！',
    pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'], // 图片路径
    timeString: '51分钟前',
  }, 
  reply: {
    hasLiked: false, // 是否已点赞
    likes: ['梁朝伟', '周杰伦'],
    comments: [{
      author: '周润发',
      text: '恭喜华仔！！！'
    },{
      author: '曾志伟',
      text: '什么时候请客啊'
    }]
  }
}, {
  user: {
    name: '周杰伦',
    avatar: './img/avatar-zhoujielun.png'
  },
  content: {
    type: 1, // 分享信息
    text: '全面读书日',
    share: {
      pic: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
      text: '飘洋过海来看你'
    },
    timeString: '51分钟前',
  },
  reply: {
    hasLiked: false,
    likes: ['梁朝伟'],
    comments: []
  }
}, {
  user: {
    name: '周润发',
    avatar: './img/avatar-zhourunfa.png'
  },
  content: {
    type: 2, // 单图片信息
    text: '很好的色彩',
    pic: 'http://coding.imweb.io/img/default/k-2.jpg',
    timeString: '一小时前',
  },
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}, {
  user: {
    name: '刘德华',
    avatar: './img/avatar-liudehua.png'
  },
  content: {
    type: 3, // 无图片信息
    text: '伤心太平洋',
    timeString: '2个小时前',
  }, 
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}];

// 页面元素
var $momentsList = $('.moments-list');

/**
 * 渲染函数：点赞列表
 * @param {Array} likes 点赞名称数组
 */ 
function likesHtmlTpl(likes) {
  if (!likes.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
  if (likes.length) {
    htmlText.push(' <a class="reply-who" href="#">' + likes[0] + '</a>');
  }
  // 后面的前面都有逗号
  for(var i = 1, len = likes.length; i < len; i++) {
    htmlText.push('，<a class="reply-who" href="#">' + likes[i] + '</a>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 渲染函数：评论内容
 * @param {Array} comments 评论信息对象数组
 */ 
function commentsHtmlTpl(comments) {
  if (!comments.length) {
    return '';
  }
  var  htmlText = ['<div class="reply-comment">'];
  for(var i = 0, len = comments.length; i < len; i++) {
    var comment = comments[i];
    htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
  }
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 渲染函数：消息回复
 * @param {Array} comments 评论信息对象数组
 */ 
function replyTpl(replyData) {
  var htmlText = [];
  htmlText.push('<div class="reply-zone">');
  // 点赞模板
  htmlText.push(likesHtmlTpl(replyData.likes));
  // 评论模块
  htmlText.push(commentsHtmlTpl(replyData.comments));
  htmlText.push('</div>');
  return htmlText.join('');
}
/**
 * 渲染函数：多张图片
 */
function multiplePicTpl(pics) {
  var htmlText = [];
  htmlText.push('<ul class="item-pic">');
  for (var i = 0, len = pics.length; i < len; i++) {
    htmlText.push('<img class="pic-item" src="' + pics[i] + '">')
  }
  htmlText.push('</ul>');
  return htmlText.join('');
}
/**
 * 循环：消息体 （目前只支持多图片消息，需要补充完成其余三种消息展示）
 * @param {Object} messageData 对象
 */ 
function messageTpl(messageData) {
  var user = messageData.user;
  var content = messageData.content;
  var htmlText = [];
  htmlText.push('<div class="moments-item" data-index="0">');
  // 消息用户头像
  htmlText.push('<a class="item-left" href="#">');
  htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
  htmlText.push('</a>');
  // 消息右边内容
  htmlText.push('<div class="item-right">');
  // 消息内容-用户名称
  htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
  // 消息内容-文本信息
  htmlText.push('<p class="item-msg">' + content.text + '</p>');
  // 消息内容-图片列表
  htmlText.push(multiplePicTpl(content.pics));
  // 消息时间和回复按钮
  htmlText.push('<div class="item-ft">');
  htmlText.push('<span class="item-time">' + content.timeString + '</span>');
  htmlText.push('<div class="item-reply-btn">');
  htmlText.push('<span class="item-reply"></span>');
  htmlText.push('</div></div>');
  // 消息回复模块（点赞和评论）
  htmlText.push(replyTpl(messageData.reply));
  htmlText.push('</div>');
  return htmlText.join('');
}

/**
 * 页面渲染函数：render
 */
function render() {
  // 只渲染第一个消息（多图片信息）
  var messageHtml = messageTpl(data[0]);
  $momentsList.html(messageHtml);
}

/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() {
  // TODO
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
  // 展现自己的名称
  $('.user-name').text(userName);
  render();
  bindEvent();
}

init();