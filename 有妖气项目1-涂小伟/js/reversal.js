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
        clientHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
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