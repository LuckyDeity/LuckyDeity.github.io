//A小组导航栏的开始---------------------------------------------------
$(function () {
    $('.pop_wrap').mouseenter(function () {
        $(this).addClass("pop_on");
    }).mouseleave(function () {
        $(this).removeClass("pop_on");
    })
})
//响应式布局未成功
//$(function () {
//    var r = document.body.offsetWidth / window.screen.availWidth;
//    $(document.body).css("-webkit-transform", "scale(" + r + ")");
//});
//$(window).resize(function () {
//    var r = document.body.offsetWidth / window.screen.availWidth;
//    $(document.body).css("-webkit-transform", "scale(" + r + ")");
//});

//A小组导航栏的结束------------------------------------------------


//B小组js部分的开始----------------------------------------------
window.onresize = function () {
  banxin();
  minimumVisibleArea();
  console.log("111");
};
banxin();


var ul1 = document.getElementById("inner").children[0];
var divInner = ul1.parentNode.parentNode;
var slide = document.getElementById("slide");
var slideUl = slide.children[0];
var lis1 = slideUl.children;
var imgWidth = divInner.offsetWidth;
var lis = ul1.children;
var leftA = ul1.parentNode.parentNode.children[0];
var rightA = ul1.parentNode.parentNode.children[2];
var bg = document.getElementById("bg");
var poster = slide.parentNode;
var bgArr = [
  {"text": "赤瞳、虎牙、,还有棒棒糖(?).....这届僵尸,可以说是很强势了~"},
  {"text": "这是一个降魔卫道的玄幻世界!"},
  {"text": "人魔神大乱斗!为了活下去,连够都在努力..."},
  {"text": "没有人能在我的世界里打败我,因为我就是主宰!"},
  {"text": "一代背锅小学生,竟成为carry全场的核心人物~"},
  {"text": "云想衣裳花想容,盛世大唐下掩藏着多少光怪陆离?"},
  {"text": "'隔壁老王'竟是美女神仙?天神的兴趣爱好果然跟凡人不太一样..."},
]
leftA.onmouseover = function (){
  leftA.style.opacity = 1;
}

rightA.onmouseover = function (){
  rightA.style.opacity = 1;
}

leftA.onmouseout = function (){
  leftA.style.opacity = .2;
}

rightA.onmouseout = function (){
  rightA.style.opacity = .2;
}

leftA.onclick = function () {
  animation(ul1,0);
}

rightA.onclick = function () {
  animation(ul1,-212);
}

for (var j = 0; j < lis.length; j++) {
  lis[j].children[2].style.display = "none";
  lis[j].children[1].style.zIndex = "2";
}
lis[0].children[2].style.display = "block";
lis[0].children[1].style.zIndex = "3";
lis1[0].style.zIndex = 1;

for(var i = 0;i < lis.length;i++){
  lis[i].setAttribute("index",i);
  lis[i].onmouseover = function(){
    clearInterval(timerID);
    for(var j = 0;j < lis.length;j++){
      lis[j].children[2].style.display = "none";
      lis[j].children[1].style.zIndex = "2";
      lis1[j].style.zIndex = 0;
    }
    this.children[2].style.display = "block";
    this.children[1].style.zIndex = "3";
    index1 = pitchOn = this.getAttribute("index");
    lis1[index1].style.zIndex = 1;
    bg.innerHTML = '<div class="tip-h"></div>' + bgArr[index1]["text"];
  }
}

poster.onmouseover = function (){
  clearInterval(timerID);
}

poster.onmouseout = function (){
  clearInterval(timerID);
  timerID = setInterval(function () {
    large();
  }, 3000)
}

var timerID = setInterval(function () {
  large();
}, 3000)

var index1 = 0;
var pitchOn = 0;
function large() {
  if(index1 == lis.length - 3){
    ul1.style.left = -(lis[0].offsetWidth + 12) * 2 + "px";
  }else if(index1 == lis.length - 1){
    ul1.style.left = 0 + "px";
  }else if(index1 == lis.length){
    index1 = 0;
  }
  index1++;
  
  for (var i = 0; i < lis.length; i++) {
    lis[i].setAttribute("index", i);
    lis[i].children[2].style.display = "none";
    lis[i].children[1].style.zIndex = "2";
    lis1[i].style.zIndex = 0;
  }
  pitchOn++;
  if (pitchOn == lis.length) {
    pitchOn = 0;
  }
  lis[pitchOn].children[2].style.display = "block";
  lis[pitchOn].children[1].style.zIndex = "3";
  lis1[pitchOn].style.zIndex = 1;
  bg.innerHTML = '<div class="tip-h"></div>' + bgArr[pitchOn]["text"];
}

//封装------------------------------

/**
 * 获取页面可视区的宽和高
 * window.innerWidth  谷歌 火狐
 * document.documentElement.clientWidth  ie8
 * returns {{clientWidth: (Number|number), clientHeight: (Number|number)}}
 */
function getClient() {
  return {
    clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
    clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
  }
}

//响应式布局-版心
function banxin() {
  var classW = document.getElementsByClassName("w");
  for (var i = 0; i < classW.length; i++) {
    var banxin = getClient().clientWidth;
    classW[i].style.margin = "0 auto";
    if (banxin > 1550) {
      classW[i].style.width = 1550 + "px";
    } else {
      classW[i].style.width = 1200 + "px";
    }
  }
}

//版心最小值
$(window).resize(function() {
  var width = $(this).width();
  var height = $(this).height();
  if(width > 1200){
    $(".poster .slide ul li").css({
      left: 50 + "%",
      marginLeft: -960
    })
  }else {
    $(".poster .slide ul li").css({
      width:1200,
      left: -360,
      marginLeft: 0
    })
  }
  });

$(window).resize(function() {
    var width = $(this).width();
    var height = $(this).height();
    if(width <= 1500){
        $(".content_slideshow ul li a img,.content_slideshow1 ul li a img").css({
            width: 237
        })
    }else {
        $(".content_slideshow ul li a img,.content_slideshow1 ul li a img").css({
            width: 240
        })
    }
})

$(document).ready(function(){
    var width = $(window).width();
    if(width > 1500){
        $(".content_slideshow ul li a img,.content_slideshow1 ul li a img").css({
            width: 240
        })
    }else {
        $(".content_slideshow ul li a img,.content_slideshow1 ul li a img").css({
            width: 237
        })
    }
    if(width > 1200){
        $(".poster .slide ul li").css({
            left: 50 + "%",
            marginLeft: -960
        })
    }else {
        $(".poster .slide ul li").css({
            width:1200,
            left: -360,
            marginLeft: 0
        })
    }
});


//动画封装
function animation(element, target) {
  clearInterval(element.timerID);
  element.timerID = setInterval(function () {
    var current = element.offsetLeft;
    var step = target > current ? 9 : -9;
    current += step;
    if (Math.abs(target - current) > Math.abs(step)) {
      element.style.left = current + "px";
    } else {
      element.style.left = target + "px";
      clearInterval(element.timerID);
    }
  }, 10)
}

//获取页面滚出去的部分
function getScroll() {
  return {
    scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
    scrollLeft: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
  }
}


// B小组js部分的结束---------------------------------------------------------


$(function (){

//B小组jQuery部分的开始--------------------------------------------------------------
  



  $(".TOP-click").mouseenter(function(){
    $(".TOP-click").removeClass("top-click").addClass("top-click1");
  }).mouseleave(function(){
    $(".TOP-click").removeClass("top-click1").addClass("top-click");
  })

  $(".TOP-code").mouseenter(function(){
    $(".TOP-code").removeClass("top-code").addClass("top-code1");
    $(".top-box").css("display","block");
  }).mouseleave(function(){
    $(".TOP-code").removeClass("top-code1").addClass("top-code");
    $(".top-box").css("display","none");
  })

  $(".TOP-feedback").mouseenter(function(){
    $(".TOP-feedback").removeClass("top-feedback").addClass("top-feedback1");
  }).mouseleave(function(){
    $(".TOP-feedback").removeClass("top-feedback1").addClass("top-feedback");
  })

  $(".TOP-service").mouseenter(function(){
    $(".TOP-service").removeClass("top-service").addClass("top-service1");
  }).mouseleave(function(){
    $(".TOP-service").removeClass("top-service1").addClass("top-service");
  })

  $(document).ready(function(){
    $(window).scroll(function(){
    if($(window).scrollTop() >= 130){
      $(".topApp").fadeIn();
    }else {
      $(".topApp").fadeOut();
    }
  })
})

$(".top-click").click(function(){
    $("html").animate({
        scrollTop: 0
    },300)
})

  //B小组jQuery部分的结束--------------------------------------------------------------

   //B小组全站最热jQuery部分的开始--------------------------------------------------------------
//头部
var $qb = $('#qb');
var $young = $('#young');
var $sn = $('.sn');
$qb.click(function () {
    $qb.css({borderBottom: '2px solid #8ccd58'})
    $young.css({borderBottom: '0px'})
    $sn.css({borderBottom: '0px'})
    $('.ul1').css('display', 'block').siblings('ul').css('display', 'none')

})
$young.click(function () {
    $qb.css({borderBottom: '0px'})
    $young.css({borderBottom: '2px solid #8ccd58'})
    $sn.css({borderBottom: '0px'})
    $('.ul2').css('display', 'block').siblings('ul').css('display', 'none')
})
$sn.click(function () {
    $sn.css({borderBottom: '2px solid #8ccd58'})
    $qb.css({borderBottom: '0px'})
    $young.css({borderBottom: '0px'})
    $('.ul3').css('display', 'block').siblings('ul').css('display', 'none')
})

//中部
$(function () {
    var $li = $('.hot-list ul li')
    $li.mouseenter(function () {
        var $this = $(this)
        $this.children('div').show();
        $this.children('p').hide();
        $this.siblings().children('div').hide();
        $this.siblings().children('p').show();
    })
})
//尾部控制
// 1-10
var $rank1 = $('.rank1');
var $rank2 = $('.rank2');
var $rank3 = $('.rank3');
$rank1.click(function () {
    $rank1.css({
        color: '#9cd12b',
        textDecoration: 'underline'
    }).siblings('div').css({color: '#c4c4c4', textDecoration: 'none'})
    $('.ul1').css('display', 'block').siblings('ul').css('display', 'none')
})
//11-20
$rank2.click(function () {
    $rank2.css({
        color: '#9cd12b',
        textDecoration: 'underline'
    }).siblings('div').css({color: '#c4c4c4', textDecoration: 'none'})
    $('.ul2').css('display', 'block').siblings('ul').css('display', 'none')
})
//
$rank3.click(function () {
    $rank3.css({
        color: '#9cd12b', textDecoration: 'underline'
    }).siblings('div').css({color: '#c4c4c4', textDecoration: 'none'})
    $('.ul3').css('display', 'block').siblings('ul').css('display', 'none')
})
    //B小组全站最热jQuery部分的结束--------------------------------------------------------------

  //C小组订阅部分的开始----------------------------------------------------------

  // 设置菜单默认的颜色
  $('#all').addClass('btncolor').siblings('li').removeClass('btncolor');
  $('#all1').addClass('btncolor1').siblings('li').removeClass('btncolor1');
  // tab栏切换颜色(排它)
  $('.content-ding .content_top ul li').click(function() {
      $(this).addClass('btncolor').siblings('li').removeClass('btncolor');
  })

  $('。content_top1 ul li').click(function() {
    $(this).addClass('btncolor1').siblings('li').removeClass('btncolor1');
})

  // 设置向右移动的距离
  function moveRight(target) {
      $('#ul').stop().animate({
          left: -target,
      }, 1000)
  }

  function moveRight1(target1) {
    $('#ul1').stop().animate({
        left: -target1
    }, 1000)
}
  // 设置向左移动的距离
  function moveLeft(target) {
      $('#ul').stop().animate({
          left: -target
      }, 1000)
  }

  function moveLeft1(target1) {
    $('#ul1').stop().animate({
        left: -target1
    }, 1000)
}
  // 封装排它
  function exclusive() {
      if (index == 1) {
          $('#person').addClass('btncolor').siblings('li').removeClass('btncolor');
          $('.left,.right').stop().show();
      } else if (index == 2) {
          $('#maid').addClass('btncolor').siblings('li').removeClass('btncolor');
          $('.right').stop().hide();
          $('.left').stop().show();
      } else {
          $('#all').addClass('btncolor').siblings('li').removeClass('btncolor');
          $('.left').stop().hide();
      }
  }

  function exclusive1() {
    if (index1 == 1) {
        $('#person1').addClass('btncolor1').siblings('li').removeClass('btncolor1');
        $('.left1,.right1').stop().show();
    } else if (index1 == 2) {
        $('#maid1').addClass('btncolor1').siblings('li').removeClass('btncolor1');
        $('.right1').stop().hide();
        $('.left1').stop().show();
    } else {
        $('#all1').addClass('btncolor1').siblings('li').removeClass('btncolor1');
        $('.left1').stop().hide();
    }
}
  // 点击右侧按钮移动图片
  var index = 0;
  $('.right').stop().click(function() {
      index++;
      $('.left,.right').stop().show();
      if (index > 2) {
          index = 0;
      }
      moveRight(index * 1500);
      exclusive();
  })

  var index1 = 0;
  $('.right1').stop().click(function() {
      index1++;
      $('.left1,.right1').stop().show();
      if (index1 > 2) {
          index1 = 0;
      }
      moveRight1(index1 * 1500);
      exclusive1();
  })

  // 点击左侧按钮移动图片
  $('.left').stop().click(function() {
      index--;
      $('.left,.right').stop().show();
      if (index < 0) {
          index = 2;
      }
      moveLeft(index * 1500);
      exclusive();
  })

  $('.left1').stop().click(function() {
    index1--;
    $('.left1,.right1').stop().show();
    if (index1 < 0) {
        index1 = 2;
    }
    moveLeft1(index1 * 1500);
    exclusive1();
})

  // 点击全部跳转到第一张
  $('#all').stop().click(function() {
      index = 0;
      moveRight(index * 1500);
      exclusive();
  })

  $('#all1').stop().click(function() {
    index1 = 0;
    moveRight1(index1 * 1500);
    exclusive1();
})

  // 点击少年切换切换
  $('#person').stop().click(function() {
      index = 1
      moveRight(index * 1500);
      exclusive();
  })

  $('#person1').stop().click(function() {
    index1 = 1
    moveRight1(index1 * 1500);
    exclusive1();
})

  //点击少女切换切换
  $('#maid').stop().click(function() {
      index = 2;
      moveRight(index * 1500);
      exclusive();
  })

  $('#maid1').stop().click(function() {
    index1 = 2;
    moveRight1(index1 * 1500);
    exclusive1();
})

  // 鼠标移入高亮
  // $('.content_slideshow ul li').mouseenter(function() {
  //     // 自己的透明度为1
  //     $(this).animate({
  //             opacity: 1
  //         }, 100)
  //         // 找其他的li标签
  //     $(this).siblings().animate({
  //         opacity: .3
  //     }, 200)
  // })

  // // ul移出之后 把他内部的所有li标签 的透明度 还原为1
  // $('.content_slideshow').mouseleave(function() {
  //     // ul的子节点 li 都还原透明度
  //     $(this).children().children().animate({
  //         opacity: 1
  //     }, 200)
  // })



  window.onresize = function() {
    banxin();
};
banxin();






//封装----------------------------------------------------------------


/**
 * 获取页面可视区的宽和高
 * window.innerWidth  谷歌 火狐
 * document.documentElement.clientWidth  ie8
 * returns {{clientWidth: (Number|number), clientHeight: (Number|number)}}
 */
function getClient() {
    return {
        clientWidth: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight ||
            0
    }
}


//响应式布局-版心
function banxin() {
    var classW = document.getElementsByClassName("w");
    for (var i = 0; i < classW.length; i++) {
        var banxin = getClient().clientWidth;
        classW[i].style.margin = "0 auto";
        if (banxin > 1500) {
            classW[i].style.width = 1500 + "px";
        } else {
            classW[i].style.width = 1200 + "px";
        }
    }
}

   //C小组订阅部分的结束----------------------------------------------------------

  //C小组部分的开始-------------------------------------------------------------

  $(".tab ul li").click(function(){
    $(".li-img div div ul li a img").css("transform","rotateY(180deg)");
    $(this).addClass("active").siblings("li").removeClass("active");
    var indexC = $(this).index();
    $(".li-img>div").stop().hide(1000);
    $(".li-img>div").eq(indexC).stop().show(1000);
    $(".li-img>div").eq(indexC).find("img").css("transform","rotateY(0deg)");
  })

  $(".content .li-img li").mouseenter(function(){
    $(this).find("img").css("transform","rotateY(180deg)");
  }).mouseleave(function(){
    $(this).find("img").css("transform","rotateY(0deg)");
  })

//C小组部分的结束-------------------------------------------------------------

  //D小组 底部部分的jQuery开始--------------------------------


  function heighttop() {
    $(".axian").animate({
        top: 92
    }, 1200, function () {
        $(".axian").animate({
            top: -3
        }, 1200)
    });

      $(".bxian").animate({
        top: 92
    }, 1200, function () {
        $(".bxian").animate({
            top: -3
        }, 1200,function(){
          heighttop();
        })
    });
 }
 heighttop();
  
//D小组 底部部分的jQuery结束--------------------------------



    //底部按钮回头部
    $(".top-click").click(function () {
        $(".bodyMask").fadeIn(250);

        $("html,body").stop().delay(300).animate({
            scrollTop: 0
        },800)

        $("html,body").stop().delay(800,function(){
            $(".bodyMask").fadeOut();
        })
    })




})


// D小组部分  追翻轮播的开始 --------------------------------------------------------------
    //获取div 和 ul
    var cartoonContents = document.querySelector('.cartoon-contents');
    var cartoonIcon = document.querySelector('.cartoon-icon');

    //用外Contents的div包icon的div
    cartoonContents.onmousemove = function (e) {
        e = e || window.event;
        //当我鼠标移入,获取了鼠标在盒子的x坐标位置
        var x = getDocPage(e).pageX - cartoonContents.offsetLeft;
        //等比例移动
        cartoonIcon.style.left = -((cartoonIcon.offsetWidth-cartoonContents.offsetWidth) / cartoonContents.offsetWidth * x)+ "px";
    }

    //page获取页面左上角距离触发事件的那一点的距离
    function getDocPage(e){
      e = e || window.event;
      return {
        //谷歌.火狐     || ie8及以前版本
        pageX: e.pageX || e.clientX - document.documentElement.clientLeft,
        pageY: e.pageY || e.clientY - document.documentElement.clientTop
      }
    }

// D小组部分  追翻轮播的结束 --------------------------------------------------------------

