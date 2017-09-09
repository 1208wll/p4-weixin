// TODO: 用户名称需修改为自己的名称
var userName = '王丽丽';
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
        share: {},
        timeString: '3分钟前'
    },
    reply: {
        hasLiked: false,
        likes: ['Guo封面', '源小神'],
        comments: [{
            author: 'Guo封面',
            text: '你也喜欢华仔哈！！！'
        }, {
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
            pic: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
            text: '飘洋过海来看你'
        },
        timeString: '50分钟前'
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
        share: {},
        timeString: '一小时前'
    },
    reply: {
        hasLiked: false,
        likes: [],
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
        share: {},
        timeString: '2个小时前'
    },
    reply: {
        hasLiked: false,
        likes: [],
        comments: []
    }
}];

// 相关 DOM
var $page = $('.page-moments');
var $momentsList = $('.moments-list');

/**
 * 点赞内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function likesHtmlTpl(likes) {
    if (!likes.length) {
        return '';
    }
    var htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
    if (likes.length) {
        htmlText.push(' <a class="reply-who" href="#">' + likes[0] + '</a>');
    }
    // 后面的前面都有逗号
    for (var i = 1, len = likes.length; i < len; i++) {
        htmlText.push('，<a class="reply-who" href="#">' + likes[i] + '</a>');
    }
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 评论内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function commentsHtmlTpl(comments) {
    if (!comments.length) {
        return '';
    }
    var htmlText = ['<div class="reply-comment">'];
    for (var i = 0, len = comments.length; i < len; i++) {
        var comment = comments[i];
        htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
    }
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 评论点赞总体内容 HTML 模板
 * @param {Object} replyData 消息的评论点赞数据
 * @return {String} 返回html字符串
 */
function replyTpl(replyData) {
    var htmlText = [];
    htmlText.push('<div class="reply-zone">');
    htmlText.push(likesHtmlTpl(replyData.likes));
    htmlText.push(commentsHtmlTpl(replyData.comments));
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 多张图片消息模版 （可参考message.html）
 * @param {Object} pics 多图片消息的图片列表
 * @return {String} 返回html字符串
 */
function multiplePicTpl(pics) {
    var htmlText = [];
    htmlText.push('<ul class="item-pic">');
    for (var i = 0, len = pics.length; i < len; i++) {
        htmlText.push('<img class="pic-item" src="' + pics[i] + '">');
    }
    htmlText.push('</ul>');
    return htmlText.join('');
}

//单张图片消息模板

function simplePicTpl(pic) {
    var htmlText = '<div class="item-pic"><img class="single-pic-item pic-item" src="' + pic + '" alt=""></div>';
    return htmlText;
}

//分享消息模板

function shareTpl(share) {
    var htmlText = [];
    htmlText.push('<a class="item-share">');
    htmlText.push('<img class="share-img" src="' + share.pic + '"width="40" height="40" alt="">');
    htmlText.push('<p class="share-tt">' + share.text + '</p>');
    htmlText.push('</a>');
    return htmlText.join();
}


/**
 * 循环：消息体
 * @param {Object} messageData 对象
 */
function messageTpl(messageData) {
    var user = messageData.user;
    var content = messageData.content;
    var htmlText = [];
    htmlText.push('<div class="moments-item" data-index="' + data.indexOf(messageData) + '">');
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
    var contentHtml = '';
    // 目前只支持多图片消息，需要补充完成其余三种消息展示
    switch (content.type) {
        // 多图片消息
        case 0:
        case 3:
            contentHtml = multiplePicTpl(content.pics);
            break;
        case 1:
            contentHtml = shareTpl(content.share);
            break;
        case 2:
            contentHtml = simplePicTpl(content.pics);
            break;
    }
    htmlText.push(contentHtml);
    // 消息时间和回复按钮
    htmlText.push('<div class="item-ft">');
    htmlText.push('<span class="item-time">' + content.timeString + '</span>');
    htmlText.push('<div class="item-reply-btn">');
    htmlText.push('<span class="item-reply"></span>');
    // htmlText.push('<div class="reply-panel"><div class="reply-btn do-like"><i class="icon-like"></i><span class="reply-btn-text haslike">点赞</span></div><div class="reply-btn do-comment"><i class="icon-comment"></i><span class="reply-btn-text">评论</span></div></div>');
    htmlText.push('</div></div>');
    // 消息回复模块（点赞和评论）
    htmlText.push(replyTpl(messageData.reply));
    htmlText.push('</div></div>');
    return htmlText.join('');
}


/**
 * 页面渲染函数：render
 */
function render() {
    // TODO: 目前只渲染了一个消息（多图片信息）,需要展示data数组中的所有消息数据。
    var messageHtml = '';
    for (var i = 0; i < data.length; i++) {
        messageHtml += messageTpl(data[i]);
    }
    $momentsList.html(messageHtml);

    $('.enlarge-image').hide();
}


/**
 * 页面绑定事件函数：bindEvent
 */
function bindEvent() {
    // TODO: 完成页面交互功能事件绑定
    var $enlargeimg = $('.enlarge-image');
    var $image = $enlargeimg.find('img');
    var $panel = $('.reply-panel');

    //点击图片查看事件
    $page.on('click', '.item-pic .pic-item', function () {
        var imgsrc = $(this).attr('src');
        $image.attr('src', imgsrc);
        $enlargeimg.show();
    });

    //点击图片放大区域隐藏
    $enlargeimg.on('click', function () {
        $enlargeimg.hide();
    });


    //点击回复按钮，出现回复面板

    $('.moments-list').on('click', '.item-reply-btn', function () {
        $('.reply-panel').hide();
        var content;
        var index = $(this).parents('.moments-item').attr('data-index');
        if (data[index].reply.likes.indexOf(userName) == -1) {
            content = '点赞';
        } else {
            content = '取消';
        }
        var replypanel = '<div class="reply-panel"><div class="reply-btn do-like"><i class="icon-like"></i><span class="reply-btn-text has-like">' + content + '</span></div><div class="reply-btn do-comment"><i class="icon-comment"></i><span class="reply-btn-text">评论</span></div></div>';
        $(this).parents('.item-ft').append(replypanel);
        return false;
    });

    //隐藏回复面板
    $page.on('click', function () {
        $('.reply-panel').addClass('slide-right');
    });

    //点赞功能
    $('.moments-list').on('click', '.do-like', function () {
        var $elem = $(this).parents('.moments-item');
        var index = $elem.attr('data-index');
        if (!data[index].reply.hasLiked) {
            data[index].reply.likes.push(userName);
        } else {
            data[index].reply.likes.pop(userName);
        }
        data[index].reply.hasLiked = !data[index].reply.hasLiked;
        var htmlText = likesHtmlTpl(data[index].reply.likes);
        $elem.find('.reply-like').remove();
        $elem.find('.reply-zone').prepend(htmlText);
    });

    //评论发送框
    $page.on('click', '.do-comment', function () {
        $('.commenter').remove();
        $(this).parents('.moments-item').append('<div class="commenter"><input class="commenter-input" type="text" placeholder="评论"><button class="send-btn" disabled="disabled">发送</button>')
    });


    //发送框和按钮状态事件
    $page.on('input', '.commenter-input', function() {
     var textValue = $(this).val().trim();
     var $btn = $(this).siblings('.send-btn');
     if (textValue !== '') {
     $btn.css('background-color', '#3BA80D');
     $btn.css('color', 'white');
     $btn.attr("disabled", false);
     } else {
     $btn.css('background-color', '#faf8fa');
     $btn.css('color', '#e7e5e7');
     $btn.attr("disabled", true);
     }
     });

    //评论功能
    $page.on('click', '.send-btn', function () {
        var content = $('.commenter-input').val();
        var element = $(this).parents('.moments-item');
        var index = element.attr('data-index');
        var newmag = {
            author: userName,
            text: content
        };
        data[index].reply.comments.push(newmag);
        var commenthtmlText = commentsHtmlTpl(data[index].reply.comments);
        element.find('.reply-comment').remove();
        element.find('.reply-zone').append(commenthtmlText);
        $('.commenter').remove();


    });
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
    // 渲染页面
    render();
    bindEvent();
}
init();