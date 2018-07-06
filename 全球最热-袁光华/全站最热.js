/**
 * Created by Hello Mr.Yuan on 2018/4/20.
 */
$(function () {
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
        var $li = $('li')
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
            color: '#d9616a',
            textDecoration: 'underline'
        }).siblings('div').css({color: '#c4c4c4', textDecoration: 'none'})
        $('.ul1').css('display', 'block').siblings('ul').css('display', 'none')
    })
//11-20
    $rank2.click(function () {
        $rank2.css({
            color: '#d9616a',
            textDecoration: 'underline'
        }).siblings('div').css({color: '#c4c4c4', textDecoration: 'none'})
        $('.ul2').css('display', 'block').siblings('ul').css('display', 'none')
    })
//
    $rank3.click(function () {
        $rank3.css({
            color: '#d9616a', textDecoration: 'underline'
        }).siblings('div').css({color: '#c4c4c4', textDecoration: 'none'})
        $('.ul3').css('display', 'block').siblings('ul').css('display', 'none')
    })

})

