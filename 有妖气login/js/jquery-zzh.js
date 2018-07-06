(function (window) {
    //背景的移动

    $(function () {
        $(".background img").animate({
            marginTop: -105
        }, 1000)
        // $('.sunshine').animate({
        //     transformRotate: rotate(-40deg)
        // })
        //邮箱,手机,用户名 进入焦点时触发
        $(".usName").focus(function () {
            //通过input获取这个盒子,改变框的颜色(父亲)
            $(this).css({
                borderColor: "#9de3ee",
            })
            //获取文本框,清空文字
            var oldValue = $(this).val();
            if (oldValue == this.defaultValue) {
                $(this).val("");
            }
            //通过input获取背景精灵图,改变位置(兄弟)
            $(this).siblings().css({
                backgroundPositionY: -43,
                backgroundPositionX: -0,
            })
            // 显示关于用户名的信息
            $('.register_info').html('手机号可以作为登录名，同时也用于密码找回等功能');
            $('.register_info').css({
                visibility: 'visible'
            })
        })
        //失去焦点时触发
        $(".usName").blur(function () {
            var oldValue = $(this).val();
            if (oldValue == "") {
                $(this).val(this.defaultValue);
                $(this).css({
                    borderColor: "#c2c2c2",
                });
                $(this).siblings().css({
                    backgroundPositionY: 0,
                    backgroundPositionX: -0,
                })
            }
        });

        // 手机验证码
        $(".code").blur(function () {
            var oldValue = $(this).val();
            if (oldValue == "") {
                $(this).val(this.defaultValue);
                $(this).css({
                    borderColor: "#c2c2c2",
                });
                $(this).siblings().css({
                    backgroundPositionY: 0,
                    backgroundPositionX: -0,
                })
            }
        });
        // 手机验证码
        $(".code").focus(function () {
            //通过input获取这个盒子,改变框的颜色(父亲)
            $(this).css({
                borderColor: "#9de3ee",
            })
            //获取文本框,清空文字
            var oldValue = $(this).val();
            if (oldValue == this.defaultValue) {
                $(this).val("");
            }

            // 显示关于验证码的信息
            $('.register_info').html('')
        })



        /*密码 进入焦点时触发*/
        $(".password").focus(function () {
            //通过input获取这个盒子,改变框的颜色(父亲)
            $(this).parent().css({
                borderColor: "#9de3ee",
            })
            //获取文本框,清空文字
            $(this).removeAttr("placeholder");
            var oldValue1 = $(this).val();
            if (oldValue1 == this.defaultValue) {
                $(this).val("");
            }

            //通过input获取背景精灵图,改变位置(兄弟)
            $(this).siblings().css({
                backgroundPositionY: -127,
                backgroundPositionX: -0,
            })
            // 显示关于用户名的信息
            $('.register_info').html('密码至少为6位');
            $('.register_info').css({
                visibility: 'visible'
            })
        })
        /*失去焦点时触发*/
        $(".password").blur(function () {
            $(this).attr("placeholder", "密码");
            var oldValue1 = $(this).val();
            if (oldValue1 == "") {
                $(this).parent().css({
                    borderColor: "#c2c2c2",
                });
                $(this).siblings().css({
                    backgroundPositionY: -85,
                    backgroundPositionX: -0,
                })
            }
        });

        // 点击切换邮箱注册&鼠标移入移出事件
        $('.tit a:last').click(function () {
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.inputUsreName').addClass('hied_code');
            $('.inputUsreName').eq(1).removeClass('hied_code');
        })
        $('.tit a:last').mouseenter(function () {
            $(this).addClass('cur').siblings().removeClass('cur');
        })
        // 点击切换手机注册&鼠标移入移出事件
        $('.tit a:first').click(function () {
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.inputUsreName').eq(0).removeClass('hied_code');
            $('.inputUsreName').eq(2).removeClass('hied_code');
            $('.inputUsreName').eq(1).addClass('hied_code');
        })
        $('.tit a:first').mouseenter(function () {
            $(this).addClass('cur').siblings().removeClass('cur');
        })

        // 点击记住密码
        $('.checkbox').click(function () {
            $(this).toggleClass('icn')
        })

        // 鼠标移入移出注册按钮变色
        $('.login').mouseenter(function () {
            $(this).css({
                opacity: .8
            })
        })
        $('.cur').mouseenter(function () {})
        $('.login').mouseleave(function () {
            $(this).css({
                opacity: 1
            })
        })

        $(".sunshine img").animate({
            aa: "-45" //目的就是取一个属性值360
        }, {
            step: function (now, fx) {
                //console.log(now);
                $(".sunshine img").css({
                    "transform": "rotate(" + now + "deg)"
                })
            },
            duration: 1100
        });



    })

    $(window).ready(function () {
        var flag = 0;
        var width = $(window).width();
        if (width > 1730) {
            $(".w").css({
                width: width
            })
            flag = 1;
        } else if (width < 1366) {
            $(".w").css({
                width: width
            })
            flag = 2;
        } else {
            $(".w").css({
                width: width
            })
            flag = 3;
        }

        if (flag == 1) {
            $(window).resize(function () {
                var width = $(this).width();
                if (width >= 1750) {
                    $(".w").width(width);
                }
            })
            flag = 0;
        } else if (flag == 3) {
            $(window).resize(function () {
                var width = $(this).width();
                if (width >= 1550) {
                    $(".w").width(width);
                }
            })
            flag = 0;
        } else {
            $(window).resize(function () {
                var width = $(this).width();
                if (width <= 1366) {
                    $(".w").width(width);
                }
            })
            flag = 0;
        }
    })
}(window))