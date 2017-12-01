$(function () {
    /*导航条左侧底部动画*/
    var lineL=$('.navLeft li').eq(1).offset().left,lineW=$('.navLeft li').eq(1).width();
    $('nav li.line').css({
        left:$('.navLeft li').eq(1).offset().left,
        width:$('.navLeft li').eq(1).width()
    });
    $('.navLeft li').click(function () {
        lineL = $(this).offset().left;
        lineW=$(this).width();
        $('nav li.line').css({
           left:lineL,
           width:lineW
       })
    });
    $('header .navLeft li').mouseover(function () {
        var l=$(this).offset().left;
        var w = $(this).width();
        $('.nav li.line').stop().animate({
            left:l,
            width:w
        })
    });
    $('header .navLeft li').mouseout(function () {
            $('.nav li.line').stop().animate({
                left:lineL,
                width:lineW
            })
    });
    /*导航条右侧显示输入框*/
    $('.icon-search').click(function () {
        $(this).parent().animate({
            width:'150px'
        });
    });
    $('body').bind('click', function(event) {
        // IE支持 event.srcElement ， FF支持 event.target
        var e = event.srcElement ? event.srcElement : event.target;
        if(e.id == 'search'||e.className =='icon-search' || e.id=='searchText' ) return; // 如果是元素本身，则返回
        else {
            $('#search').animate({
                width:'35px'
            }); // 如不是则隐藏元素
        }
    });

    /*面向对象*/

    function DivList(obj) {
        this.init(obj);
    }
    DivList.prototype = {
        constructor:DivList,
        init : function (obj) {
            obj = obj || {};
            this.fatherDiv = obj.fatherDiv;
            this.oDiv = obj.oDiv;
            this.jSonUrl = obj.jSonUrl;
            this.jSonUrlArea=obj.jSonUrlArea;
            /*上边*/
            this.oDivMain=obj.oDivMain;
            this.userNum=obj.userNum;
            this.detail = obj.detail;
            this.bgImage=obj.bgImage;
            this.oDivData=[];
    },
        getData: function () {
            var self = this;
            var xhr = new XMLHttpRequest();
            xhr.open('get',this.jSonUrl);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var responseJson = JSON.parse(xhr.responseText);
                    var dataArr =responseJson[self.jSonUrlArea];
                    $.each(dataArr, function (index,value) {
                        self.oDivData[index] = value;
                    });
                }
            }
        },
        build: function () {
            /*创建标签*/
            var self =  this;
            setTimeout(function () {
                for (var i = 0; i < self.oDivData.length; i++) {
                    self.oDivMain=self.oDivData[i]["main"];
                    self.userNum=self.oDivData[i]["userNum"];
                    self.detail=self.oDivData[i]["detail"];
                    self.bgImage=self.oDivData[i]["bg"];
                    self.oDiv = document.createElement('div');
                    $(self.oDiv).html('<div class="oDivMask"></div>' +
                        '<a href="javascript:" class="oA">'+self.oDivMain+'</a>' +
                        '<div class="oDivBottom">' +
                        '<div class="oDivBLeft">' +
                        '<i class="icon-userNum"></i>' +
                        '<p class="oP">'+self.userNum+'</p>' +
                        '</div>' +
                        '<div class="oDivBRight">' +
                        '<span class="oSpan">'+self.detail+'</span>' +
                        '</div>' +
                        '</div>');
                    $(self.oDiv).addClass('oDiv');
                    $(self.oDiv).css({backgroundImage:'url('+self.bgImage+')'});
                    $(self.fatherDiv).append($(self.oDiv));
                }

            }, 50)
        }
    };
    /*创建初始20个项目*/
    var p1 = new DivList({fatherDiv:'.chat-topicList',jSonUrl:'data.json',jSonUrlArea:'module'});
    p1.getData();
    p1.build();
    /*滚动加载*/
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.save();
    ctx.beginPath();
    ctx.arc(50,50,50,0,270*Math.PI/180);
    ctx.strokeStyle='#202020';
    ctx.stroke();
    ctx.restore();

    /*点击加载事件*/

    $('#loadData').click(function () {
            $('#loading').show();
            $('#addMore').hide();
            setTimeout(function () {
                $('#loading').hide();
                $('#addMore').show();
                var p2= new DivList({fatherDiv:'.chat-topicList',jSonUrl:'data.json',jSonUrlArea:'add'});
                p2.getData();
                p2.build()
            },500);
    });

    /*到多少显示*/
    $(window).scroll(function () {
        if($(window).scrollTop()>=500){
            $('#returnTop').show();
        }else{
            $('#returnTop').hide();
        }
    });
    /*点击到顶部*/
    $('#returnTop').click(function () {
        var speed=500;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    })





});