////�����������̶�����
//$(window).scroll(function () {
//    if ($(window).scrollTop() >= 0) {
//        $('.top-nav').css({
//            position: "fixed",
//            top: 0,
//        })
//        $('.banner').css({
//            marginTop: $('.top-nav').height(),
//        })
//    } else {
//        $('.top-nav').css({
//            position: "",
//            top: 0,
//        })
//        $('.banner').css({
//            marginTop: 0,
//        })
//    }
//})


//��ȡԪ��
var bannerRound = $(".banner-round li");
var bannerImgs = $(".banner-imgs li");
var index = 0;

//�������СԲ���ɫ
bannerRound.mouseenter(function () {
    $(this).addClass("active").siblings().removeClass("active");
    //��ȡСԲ�������
    var roundIndex = $(this).index();
    index = roundIndex;
    //СԲ���ӦͼƬ��ʾ
    bannerImgs.eq(roundIndex).fadeIn().siblings().fadeOut();
})

$('.banner').mouseenter(function () {
    clearInterval(timerID);
})
$('.banner').mouseleave(function () {
    timerID = setInterval(function () {
        index++;
        if (index > bannerRound.length - 1) {
            index = 0;
        }
        bannerImgs.eq(index).fadeIn().siblings().fadeOut();
        bannerRound.eq(index).addClass("active").siblings().removeClass("active");
    }, 2500);
})


//���Ҽ�ͷ�л�ͼƬ
$('#rightBtn').click(function () {
    //��ȡ��ǰͼƬ��index,Ӧ�ú�СԲ����ͬ,Ҫȫ������
    index++;
    if (index > bannerRound.length - 1) {
        index = 0;
    }
    bannerImgs.eq(index).fadeIn().siblings().fadeOut();
    bannerRound.eq(index).addClass("active").siblings().removeClass("active");
})

$('#leftBtn').click(function () {
    index--;
    if (index < 0) {
        index = bannerRound.length - 1;
    }
    bannerImgs.eq(index).fadeIn().siblings().fadeOut();
    bannerRound.eq(index).addClass("active").siblings().removeClass("active");
})

//�Զ������ֲ�
var timerID = setInterval(function () {
    index++;
    if (index > bannerRound.length - 1) {
        index = 0;
    }
    bannerImgs.eq(index).fadeIn().siblings().fadeOut();
    bannerRound.eq(index).addClass("active").siblings().removeClass("active");
}, 2500);

//��������������Ч
$(function () {
    $(".bg").parent().mouseenter(function () {
        var that = this;
        $(that).children(".bg").stop().slideDown("speed", function () {
            $(that).children(".bg").css({
                background: "rgba(0, 0, 0, .5)"
            });
        });
    })

    $(".bg").parent().mouseleave(function () {
        $(this).children(".bg").stop().slideUp("speed");
    })

//�ײ���ť��ͷ��
    $(".go-top a").click(function () {
        $(".bodyMask").fadeIn(250);

        $("html,body").stop().delay(300).animate({
            scrollTop: 0
        },800)

        $("html,body").stop().delay(800,function(){
            $(".bodyMask").fadeOut();
        })
    })

    $(window).resize(function() {
        var width = $(this).width();
        var imgWidth = $(".banner-imgs ul li").width();
        if(width < imgWidth){
            $(".banner-imgs").width(width)
        }else {
            $(".banner-imgs").width(1920)
        }
    })

    $(window).ready(function() {
        var width = $(window).width();
        var imgWidth = $(".banner-imgs ul li").width();
        if(width < imgWidth){
            $(".banner-imgs").width(width)
        }else {
            $(".banner-imgs").width(1920)
        }
    })

})




for(var i = 0 ; i < 20 ; i++ ){
    //����div
    var $round = $('<div></div>');
    //���λ��
    var randomTop = Math.floor(Math.random() * $('.fix').height());
    var randomLeft = Math.floor(Math.random() * $('.fix').width());
    var randomSize = Math.floor(Math.random() * 200);


    //��ȦȦ��cssֵ
    $round.css({
        width: randomSize,
        height: randomSize,
        position: "absolute",
        borderRadius: 150,
        zIndex: 1,
        backgroundColor: "rgba("+135+","+202+","+67+","+0.5+")",
        top: randomTop,
        right: randomLeft,
    })

    //��ӵ���������
    $round.appendTo('.fix');
}

    ////�������ƶ�
    //$round.animate({
    //    right : 1000,
    //}, 5000, function () {
    //    $round.fadeOut('slow',function(){
    //        $round.remove();
    //    })
    //})



//��̬����С��
for(var i = 0 ; i < 20 ; i++ ){
    //����div
    var $round = $('<div></div>');
    //���λ��
    var randomTop = Math.floor(Math.random() * $('.fix').height());
    var randomLeft = Math.floor(Math.random() * $('.fix').width());
    var randomSize = Math.floor(Math.random() * 200);



    //��ȦȦ��cssֵ
    $round.css({
        width: randomSize,
        height: randomSize,
        position: "absolute",
        borderRadius: 150,
        zIndex: 1,
        backgroundColor: "rgba("+135+","+202+","+67+","+0.5+")",
        top: randomTop,
        right: randomLeft,
    })

    //��ӵ���������
    $round.appendTo('.fix');
}



//ѭ���ƶ���С��
//var currentIndex = 0;
for (var i = 0; i < 5; i++) {
    $round = $('<div></div>');
    randomTop = Math.floor(Math.random() * $('.fix').height());
    randomLeft = Math.floor(Math.random() * $('.fix').width());
    $round.css({
        width: 150,
        height: 150,
        position: "absolute",
        borderRadius: 150,
        zIndex: 1,
        backgroundColor: "rgba(" + 135 + "," + 202 + "," + 67 + "," + 0.5 + ")",
        top: randomTop,
        right: randomLeft,
    })
    $round.attr("class", 'moveBall');
    $round.appendTo('.fix');
    //currentIndex = $round.index();
}

//���ƶ�
function moveRight() {
    $('.moveBall').each(function (index, elem) {
        randomTop = Math.floor(Math.random() * $('.fix').height());
        randomLeft = Math.floor(Math.random() * $('.fix').width());
        $(elem).animate({
            left: randomLeft,
            top: randomTop,
        }, 5000, function () {
            moveLeft();
        })
    })
}

//���ƶ�
function moveLeft() {
    $('.moveBall').each(function (index, elem) {
        randomTop = Math.floor(Math.random() * $('.fix').height());
        randomLeft = Math.floor(Math.random() * $('.fix').width());
        $(elem).animate({
            left: randomLeft,
            top: randomTop,
        }, 5000, function () {
            moveRight();
        })
    })
}

moveRight();







