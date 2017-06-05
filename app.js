// 用户名称 - 修改为自己的名称
var userName = 'Lu仔酱';
// 需要渲染的页面的数据
// 朋友圈页面的数据
var data = [{
  user: {
    name: '阳和',
    avatar: './img/avatar2.png'
  }, 
  content: {
    type: 0, // 多图片消息
    text: '华仔真棒，新的一年继续努力！',
    pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
    timeString: '3分钟前',
  }, 
  reply: {
    hasLiked: false,
    likes: ['Guo封面', '源小神'],
    comments: [{
      author: 'Guo封面',
      text: '你也喜欢华仔哈！！！'
    },{
      author: '喵仔zsy',
      text: '华仔实至名归哈'
    }]
  }
}, {
  user: {
    name: '伟科大人',
    avatar: './img/avatar3.png'
  },
  content: {
    type: 1, // 分享消息
    text: '全面读书日',
    pics: [],
    share: {
      pic: '',
      text: '飘洋过海来看你'
    },
    timeString: '50分钟前',
  },
  reply: {
    hasLiked: false,
    likes: ['阳和'],
    comments: []
  }
}, {
  user: {
    name: '深圳周润发',
    avatar: './img/avatar4.png'
  },
  content: {
    type: 2, // 单图片消息
    text: '很好的色彩',
    pics: ['http://coding.imweb.io/img/default/k-2.jpg'],
    timeString: '一小时前',
  },
  reply: {
    hasLiked: false,
    likes:[],
    comments: []
  }
}, {
  user: {
    name: '喵仔zsy',
    avatar: './img/avatar5.png'
  },
  content: {
    type: 3, // 无图片消息
    text: '以后咖啡豆不敢浪费了',
    pics: [],
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
 * 循环：消息体 
 * 生成的html文本可参考 message.html文件
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
  // 消息内容-图片列表 （目前只支持多图片消息，需要补充完成其余三种消息展示）
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
  // TODO: 目前只渲染了一个消息（多图片信息）,需要展示data数组中的所有消息数据。
  var messageHtml = messageTpl(data[0]);
  $momentsList.html(messageHtml);
}

/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() {
  // TODO: 完成页面交互功能
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