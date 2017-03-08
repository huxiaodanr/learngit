/**
 * Created by danr on 2017/3/7.
 */
;
(function ($) {

    var LightBox = function () {
       var self = this;

        //创建遮罩和弹出框
        this.popupMask = $('<div id="G-lightbox-mask">');
        this.popupWin = $('<div id="G-lightbox-popup">');

        //保存BODY
        this.bodyNode = $(document.body);

        //渲染剩余的DOM并插入body
       this.renderDOM();

        this.picViewArea = this.popupWin.find('div.lightbox-pic-view');//图片预览区域
        this.popupPic = this.popupWin.find('img.lightbox-iamge');
        this.picCaptionArea = this.popupWin.find('div.lightbox-pic-caption');//图片描述区域
        this.nextBtn = this.popupWin.find('span.lightbox-next-btn');//按钮
        this.prevBtn = this.popupWin.find('span.lightbox-prev-btn');
        this.captionText = this.popupWin.find('p.lightbox-pic-desc'); //图片描述
        this.currentIndex = this.popupWin.find('span.lightbox-of-index'); //图片当前索引
        this.closeBtn = this.popupWin.find('span.lightbox-close-btn');this.nextBtn = this.popupWin.find('span.lightbox-next-btn');
        this.prevBtn = this.popupWin.find('span.lightbox-prev-btn');
        this.captionText = this.popupWin.find('p.lightbox-pic-desc'); //图片描述
        this.currentIndex = this.popupWin.find('span.lightbox-of-index'); //图片当前索引
        this.closeBtn = this.popupWin.find('span.lightbox-close-btn');

        //准备开发事件委托，获取组数据
        this.groupName = null;
        this.groupData = [];
        this.bodyNode.delegate('.js-lightbox,*[data-role=lightbox]', 'click', function(e) {
            //阻止事件冒泡
             e.stopPropagation();

            var currentGroupName = $(this).attr('data-group');

            if(currentGroupName != self.groupName){//组名
                self.groupName = currentGroupName;
                //根据当前组名获得同一组数据
                self.getGroup();
            }
            //初始化弹框
            self.initPopup($(this));

        });
    };

    LightBox.prototype = {
        showMaskAndPopup:function (sourceSrc,currentId) {
            var self = this;

            this.popupPic.hide();
            this.picCaptionArea.hide();
            this.popupMask.fadeIn();

            var winWidth = $(window).width(),
                winHeight = $(window).height();
            this.picViewArea.css({
                width:winWidth/2,
                height:winHeight/2
            });
            this.popupWin.fadeIn();
            var viewHeight = winHeight/2 + 10;
            this.popupWin.css({
                width: winWidth / 2 + 10, //有5像素的边框
                height: winHeight / 2 + 10,
                marginLeft: -(winWidth / 2 + 10) / 2, //水平居中
                // top: (this.isIE6 ? -(winHeight + scrollTop) : -viewHeight)
                top:-viewHeight
            }).animate({
                top:(winHeight-viewHeight)/2
            },function () {
                //加载图片
            });

        },
        initPopup:function (currentObj) {

            var self = this,
                sourceSrc = currentObj.attr('data-source'),
                currentId = currentObj.attr('data-id');

            this.showMaskAndPopup(sourceSrc,currentId);

        },
        getGroup:function () {
            var  self = this;

            //根据当前组别名称获取页面所有相同组别的对象
            var groupList = this.bodyNode.find("*[data-group="+this.groupName+"]");

            groupList.each(function () {
                self.groupData.push({
                    src:$(this).attr('data-source'),
                    id:$(this).attr('data-id'),
                    caption:$(this).attr('data-caption')
                });
            });
console.log(self.groupData);
        },
        renderDOM:function () {
            var strDOM = '<div class="lightbox-pic-view">'+
                        '<span class="lightbox-btn lightbox-prev-btn"><</span>'+
                        ' <img src="" alt="" class="lightbox-image" width="100%">'+
                        ' <span class="lightbox-btn lightbox-next-btn">></span>'+
                        '</div>'+
                        ' <div class="lightbox-pic-caption">'+
                        '<div class="lightbox caption-area">'+
                        ' <p class="lightbox-pic-desc"></p>'+
                        '<span class="lightbox-of-index">当前索引：0 of 0</span>'+
                        '</div>'+
                        '<span class="lightbox-close-btn"></span>'+
                        '</div>';
            //插入到popupwin
            this.popupWin.html(strDOM);
            //吧遮罩和弹出框插入到body
            this.bodyNode.append(this.popupMask,this.popupWin);
        }
    };

    window["LightBox"] = LightBox;
})(jQuery);