var isIE6 = $.browser.msie && ($.browser.version == "6.0") && !$.support.style;
var comic_fans = 1;
/**
 * 登录区刷新
 * @return
 */
function flush_login() {
    var user = get_user();
	//alert(user);
    if (user) {	//已登录
        //判断是否超级登录 如果超级登陆则种植cookie
        if ($.xcookie("sessioneditor") !== null) {
            $.cookie("super_login", true, {
                expires: 900,
                path: '/',
                domain: 'u17.com'
            });
        };

        var html = '';
		html+='<div class="pop_wrap username" id="username">';
		html+='<div class="u_nav"><a href="' + _cfg_host_user + '" target="_blank">' + user.nickname + '</a></div>';
		html+='<div class="pop_box" id="pop_user"></div>';
		html+='</div>';
		html+='<div class="pop_wrap userlevel" id="usertype"><div class="pop_box" id="pop_topvip"></div></div>';
		html+='<div class="pop_wrap ticket_box">';
		html+='<div class="u_nav">';
		html+='<a href="' + _cfg_host_user + '/ticket/" target="_blank">月票</a>';
		html+='<i class="num_ticket" id="ticket_num">0</i>';
		html+='</div>';
		html+='<div class="pop_box">';
		html+='<div class="pop_box_con">月票是用来投给自己喜欢的作品，表示了对作品的支持和鼓励。<a href="'+_cfg_host_user+'/ticket/" target="_blank" class="blue">[详情]</a></div>';
		html+='</div>';
        html+='</div>';
        html+='<div class="pop_wrap user_i">';
        html+='<div class="u_nav">';
        html+='<a href="' + _cfg_host_user + '" target="_blank">个人中心</a>';
        html+='</div>';
        html+='</div>';
		html+='<q>|</q>';
		html+='<a href="javascript:void(0);" onclick="logout_ajax();" class="logout">退出</a>';

        $('#userbar').html(html);
        //获取vip图标
        var user_vip_img = '';
        if (user.group_user > 0) {
            if (user.group_user == 1 || user.group_user == 2) {
				var user_vip_img = '<div class="u_nav"><a href="' + _cfg_host_vip + '" target="_blank" class="ico_viplev viplev_'+user.vip_level+'" title="VIP会员  Lv.' + user.vip_level + '"></a></div>';
            } else {
				var user_vip_img = '<div class="u_nav"><a href="' + _cfg_host_vip + '" target="_blank" class="ico_m ever_vip'+user.vip_level+'_b" title="曾经是VIP会员  Lv.' + user.vip_level + '"></a></div>';
            }
        } else {
			var user_vip_img = '<div class="u_nav"><a href="' + _cfg_host_vip + '" target="_blank" class="ico_viplev viplev_'+user.vip_level+'n"></a></div>';
        }
        $('#usertype').prepend(user_vip_img);

		//通知系统的数量刷新（包括新短信，新系统短信，新粉丝，新漫画更新）
        get_notify_count();
        MessageTimeId = setInterval(get_notify_count, 5 * 30000);	//循环执行

        $('#usertype').bind('mouseenter', function() {	//VIP图标绑定鼠标指针穿过被选元素事件
            //$(this).addClass('open');
            var user = get_user();
            if ($('#pop_topvip').html() == '' || user.id != parseInt($('#this_vip_member_id').val())) {
                $.ajax({
                    url: '/user/ajax.php?mod=user_vip&act=get_vip_v4_1',
                    type: "GET",
                    dataType: 'json',
                    cache: false,
                    success: function(o) {
                        $('#pop_topvip').html(o.html);
                    }
                });
            }
        }).bind('mouseleave', function() {
           //$(this).removeClass('open')
        });

        $('#username').bind('mouseenter', function() {	//用户昵称绑定事件
            //$(this).addClass('open');
            var user = get_user();
            if ($('#pop_user').html() == '' || user.id != parseInt($('#this_member_id').val())) {
                $.ajax({
                    url: '/passport/ajax.php?mod=member&act=get_member_info_v4_1',
                    type: "GET",
                    dataType: 'text',
                    cache: false,
                    success: function(o) {
                        if (o == 'loginout') {
                            logout_ajax();
                        } else {
                            $('#pop_user').html(o);
                        }
                    }
                });
            }
        }).bind('mouseleave', function() {
            //$(this).removeClass('open')
        });
    } else {	//未登录
        //盛大通行证登录状态接口验证
        var returnUrl = window.location.href;
      //  returnUrl = encodeURIComponent(returnUrl);
      //  var loginUrl = _cfg_host_passport + '/sdo/login.php?url=' + returnUrl;
      //  var regUrl = _cfg_host_passport + '/sdo/signup.php?url=' + returnUrl;
		var regUrl = _cfg_host_passport + '/member_v2/signup.php?url=' + returnUrl;
		var loginUrl = _cfg_host_passport + '/member_v2/login.php?url=' + returnUrl;
        //var html = '<a href="' + loginUrl + '" class="btn_login">登录<em></em></a><a href="' + regUrl + '" class="btn_regist">立即注册</a>';
		//var html = '<a href="javascript:void(0);" onclick = showLoginDialog() class="btn_login">登录<em></em></a><a href="javascript:void(0);" onclick=showSignupDialog() class="btn_regist">立即注册</a>';
		var html = '<a href="' + loginUrl + '" class="btn_login">登录<em></em></a><a href="' + regUrl + '" class="btn_regist">立即注册</a>';
        $('#userbar').html(html);
        if (MessageTimeId != 0) clearInterval(MessageTimeId);
		//未登录默认显示最近看的漫画(因为未登录没有收藏的漫画)Start
		$('#index_v4_1_favorite_history').find('.tab').find('.curr').removeClass('curr');
		$('#tab_recent_read').addClass('curr');
		$('#recent_read').show();
		$('#recent_store').hide();
		//未登录默认显示最近看的漫画(因为未登录没有收藏的漫画)End
    }
    //我的书架传绑定事件
    //bindmybookshelf();
    //get_lastcomic();
}

/**
 * 搜索
 * @param q
 * @param new_window
 */
function search(q, new_window) {
	q = $.trim(q);
	if (typeof(q) == undefined || q == '' || q == '我要搜......') {
		showMsg('请填写搜索的关键字');
	} else {
		var url = _cfg_host_so + "/all/" + encodeURI(q) + "/m0_p1.html";
		if (new_window) {
			window.open(url);
		} else {
			location.href = url;
		}
	}
}

//获取我收藏的漫画
function get_favorite_comic_list(){
	//判断dom结构是否已载入
	var recent_read_content = $.trim($('#recent_read').find('.loading').html());
	//ajax只请求一次
	if(recent_read_content!=null && recent_read_content!=''){
		$.ajax({
			url: "/www/ajax.php?mod=comic&act=get_favorite_history",
			data: '',
			type: "POST",
			dataType: 'json',
			cache: true,
			success: function(o) {
                if (o.code > 0) {
                    //alert(o);
                    $('#recent_read').html(o.read_html);
                    $('#recent_store').html(o.store_html);
                    $('#comic_history_banner').html(o.banner_html);
                    if(o.comic_update_num>0){
                        $('#banner_comic_update_num').html('+'+o.comic_update_num).show();
                    }
                } else {
                    $('.readed').hide();
                }
				
			},
			error: function() {
				//showMsg('网络错误，请稍后重试');
			}
		});
	}
}

//导航下拉(公共)
function index_pop_wrap(){
	var user = get_user();
    var $popWrap=$(".pop_wrap");
	$popWrap.each(function() {
		$(this).mouseenter(function(){
			var topclock = typeof($(this).find('#tip_topclock').attr('class'));
			if(topclock != 'undefined'){
				$(this).find('#tip_topem').show();
				$(this).find('#tip_topclock').hide();
			}
			$(this).addClass("pop_on");
		})
		$(this).mouseleave(function(){
			var topclock = typeof($(this).find('#tip_topclock').attr('class'));
			if(topclock != 'undefined'){
				$(this).find('#tip_topem').hide();
				if(user!='' && user!=null){
					var tip_message_num = 0;
					$('#top_nav_right .pop_box ul li em').each(function(i,o){
						tip_message_num+=parseInt($(o).html());
					});
					if(tip_message_num > 0){	//登录后如果有消息通知鼠标离开后显示小闹钟
						$(this).find('#tip_topclock').show();
					}else{
						$(this).find('#tip_topem').show();	//否则显示向下箭头
					}
				}
			}
			$(this).removeClass("pop_on");
			$('.pop_box').hide();
		})
    });
}
//书架背景变色(公共)
function index_bookList(){
	var $bookList=$(".book_pop li");
	$bookList.each(function() {
        $(this).mouseover(function(){
			$(this).addClass("hover");
		})
		$(this).mouseout(function(){
			$(this).removeClass("hover");
		})
    });
}
//传送门展开收缩(公共)
function index_portal(){
	$('#portal .btn_portal').mouseenter(function(){
		$('#portal .portal_pop').stop(false, true).slideDown("normal");
		$(this).addClass("open");
	});
	$('#portal').mouseleave(function(){
		$('#portal .portal_pop').stop(false, true).slideUp("normal");
		$('#portal .btn_portal').removeClass("open");
	});
}
//tab切换(公共)
function index_tab(){
	$(this).addClass("curr").siblings("a").removeClass("curr");
	var tabname = $(this).attr("rel");
	var myattrlink = $(this).attr('myattrlink');	//品牌馆为more更换链接
	if(typeof(myattrlink)!='undefined'){
		$('#index_v4_1_brand_more').attr('href',myattrlink);
	}
	$("#" + tabname).show().siblings().hide()
};

//首页top导航(手机版、小说、有熊、商城、游戏)
$.xtab({
	tab:'#top_nav .nav',
	body:'#top_nav .pop_box',
	tab_show_class:'cur',
	tab_hide_class:'',
	event:'mouseover',
	lazy_time:200,
	default_tab:6,
	callback:function(tab,body,flag){
	if(body.html()=='' && flag!=7){
		$.ajax({
			url:'/z/fp/index_inc_v4_1/index_nav_'+flag+'.html',
			dataType:'text',
			type:'get',
			success:function(html){
				body.html(html);
			},
			error:function(){
				showMsg('通讯错误');
			}
		});
	}
}});
//获取有熊日排行榜数据
function get_xiong_rank_ajax(){
	var xiong_rank_content = $.trim($('#xiong_day_rank_data').html());
	if(xiong_rank_content==null || xiong_rank_content==''){
		$.ajax({
			url: '/www/ajax.php?mod=comic&act=get_xiong_rank',
			data: '{}',
			type: "POST",
			dataType: 'json',
			cache: true,
			success: function(o) {
				if(o.code>0){
					$('#xiong_day_rank_data').html(o.li_html);
				}else{
					//console.log(o.message);
				}
			}
		});
	}
}

/*
 * Desc:    显示漫画互动对话框
 * @param:  int comic_id=漫画id
 *          string type=对话框类型(month_ticket:月票 donate:捐赠 grade:作品评分 recommend:空间推荐 forward:推广 tongren:同人图投稿)
 * @return: void
 */
function show_action_dialog(comic_id, type, gift_type) {
    var gift_type = arguments[2] ?arguments[2] : 0;
    var user_info = get_user();
    if (!user_info) {
        login_ajax(function() {
            show_action_dialog(comic_id, type);
        });
        return false;
    }
    var loadingdiv = '<div id ="loadingdiv" class="mark" style="width: 100%; height: 100%; background: #000; opacity: .6; z-index: 99; position: fixed; left: 0; top: 0;"></div>';

    if ($('#action_dialog_'+comic_id).length > 0) {
        $('body').append(loadingdiv);
        var top = ($(window).height() - $('#action_dialog_'+comic_id).height())/2;
        var scrollTop = $(document).scrollTop();
        top = Number(top)+Number(scrollTop);
        $('#action_dialog_'+comic_id).css('top',top+'px').show();
        $('#'+type+'_cur').click();
        if (gift_type) {
            $('#'+gift_type).click();
        };
    } else {
        $.ajax({
            url: "/comic/ajax.php?mod=comic&act=action_dialog_v4",
            data: {
                comic_id: comic_id,
                type: type
            },
            type: "GET",
            dataType: 'json',
            cache: false,
            async:false,
            success: function(o) {
                if (o.code > 0) {
                    $('body').append(loadingdiv);
                    $('body').append(o.html);
                    var top = ($(window).height() - $('#action_dialog_'+comic_id).height())/2;
                    var scrollTop = $(document).scrollTop();
                    top = Number(top)+Number(scrollTop);
                    $('#action_dialog_'+comic_id).css('top',top+'px').show();
                    if($(window).width() == 766) {
                    	 $('#action_dialog_'+comic_id).css('left','355px').show();
                    }
                    $('#'+type+'_cur').click();
                    if (gift_type) {
                        $('#'+gift_type).click();
                    };
                } else {
                    showMsg(o.message);
                }
            },
            error: function() {
                showMsg('网络错误，请稍后重试');
            }
        });
    }
}
/**
 * 获取窗口宽度
 * @returns
 */
function getTotalWidth(){
    if($.browser.msie){
        return document.compatMode == "CSS1Compat"? document.documentElement.clientWidth : document.body.clientWidth;
    }else{
        return self.innerWidth;
    }
}
/**
 * 根据浏览器宽度设定显示1000或1200版本
 */
function set_client_width_class(){

}


 //显示新百提醒
function showDialogBox(msg,msg_html) {
    var html = '';
    html += '<div id="showDialogBox" style="width: 400px; margin-left: -200px; min-height: 140px;display:none" class="dialogBox">';
    html += '<a class="close" title="关闭" href="javascript:;" onclick="$(this).parent().remove();$(\'#loadingdiv\').remove();"><i></i></a>';
    html += '<div class="sendSucc">';
    html += '<p>'+msg+'</p>';
    html += msg_html;
    html += '</div>';
    html += '</div>';
    var loadingdiv = '<div id ="loadingdiv" class="mark" style="width: 100%; height: 100%; background: #000; opacity: .6; z-index: 99; position: fixed; left: 0; top: 0;"></div>';
    $('body').append(loadingdiv);
    $('body').append(html);
    var top = ($(window).height() - $('#showDialogBox').height())/2;
    var scrollTop = $(document).scrollTop();
    top = Number(top)+Number(scrollTop);
    $('#showDialogBox').css('top',top+'px').show();
}

function closeNewFuncDialog(obj, func_name, timeout, callback) {
    $(obj).hide();
    $('#mask_' + func_name).hide();
    if (typeof (timeout) != 'undefined' && timeout) {
        $.cookie(func_name, 1, {expires: timeout, path: "/", domain: _cfg_domain_root});
    }
    if (typeof (callback) == 'function') {
        callback();
    }
}
