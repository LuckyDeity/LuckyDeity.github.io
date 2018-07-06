 //缓动动画-添加回调函数
 function animateSlow(ele, attrs, fn) {
     //设置计时器之前,清空计时器
     clearInterval(ele.timerID);
     //设置计时器
     ele.timerID = setInterval(function () {

         //假设这次计时器,所有的属性都到达了目的地.
         var flag = true;

         //因为传递过来的是json数据,包含多个属性,以及这些属性们要到达的目标,所以要遍历这些属性,让这每个属性都要做缓动动画.
         for (var key in attrs) {
             //每一个传入的样式都要做缓动动画,传入的样式有可能是透明度opacity和层级zindex.
             if (key == "opacity") {
                 //如果传入的是透明度,可以先放大100倍计算,等到计算好了,再缩小100倍赋值.
                 var currentLeft = getStyle(ele, key) * 100;
                 //计算步长.
                 var step = (attrs[key] * 100 - currentLeft) / 10; //(100-50) /10
                 step = step > 0 ? Math.ceil(step) : Math.floor(step);
                 //计算
                 currentLeft += step;
                 //赋值:因为步长最后是1,无论如何都会赋值的.
                 ele.style[key] = currentLeft / 100;
                 console.log(currentLeft);


                 //如果当前这个属性的当前位置,不等于目的位置,说明这个属性没有到达目的地,就假设失败
                 if (currentLeft / 100 != attrs[key]) {
                     flag = false;
                 }

             } else if (key == "zIndex") {
                 //赋值:因为步长最后是1,无论如何都会赋值的.
                 ele.style[key] = attrs[key];
             } else {
                 //获取当前的传入的attr属性的值,有可能得到的是这样的值"100px",所以要做类型转换.
                 var currentLeft = parseInt(getStyle(ele, key));
                 //计算步长.
                 var step = (attrs[key] - currentLeft) / 10;
                 step = step > 0 ? Math.ceil(step) : Math.floor(step);
                 //计算
                 currentLeft += step;
                 //赋值:因为步长最后是1,无论如何都会赋值的.
                 ele.style[key] = currentLeft + "px";
                 console.log(currentLeft);

                 //下面这个清空计时器的代码有问题.
                 //不应该是某一个属性到达了目的地就清空计时器.而应该是所有的属性都到达了目的地才清空计时器.
                 // if(currentLeft == attrs[key]){
                 //   clearInterval(ele.timerID);
                 // }

                 //如果当前这个属性的当前位置,不等于目的位置,说明这个属性没有到达目的地,就假设失败
                 if (currentLeft != attrs[key]) {
                     flag = false;
                 }
             }
         }

         //如果当前这次计时器里面的forin做完了,flag的值还是true,说明这次计时器,所有的属性都到达了目的位置,假设成立.
         //就应该清空计时器
         if (flag) {
             clearInterval(ele.timerID);
             //计时器清空了,就表示动画做完了,动画做完了,就执行传入的回调函数.
             if (Object.prototype.toString.call(fn) == "[object Function]") {
                 fn();
             }
         }

     }, 50);

 }