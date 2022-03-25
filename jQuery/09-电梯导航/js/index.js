$(function() {
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的li 的背景选择 添加current
    // 节流阀 互斥锁 
    let flag = true; // 正确执行
    // 显示隐藏电梯导航
    let toolTop = $('.recommend').offset().top;

    toggleTool() //防刷新

    function toggleTool() { // 封装函数调用 
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        } else { // 判断调用刷新
            $('.fixedtool').fadeOut();
        }
    }
    $(window).scroll(function() {
        toggleTool() //防刷新
            //页面滚动到某个内容区域 左侧电梯导航小li 相应添加和删除current类名

        if (flag) { // 节流阀 只有正确的时候操作
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i); //拖到哪 回馈坐标号
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass()
                }
            })
        }
    })


    // 点击电梯导航页面可以滚动到相应内容区域
    $('.fixedtool li').click(function() {
        flag = false // 节流阀
            // 当我们每次点击点击小li 就需要计算出页面去往位置
        let current = $('.floor .w').eq($(this).index()).offset().top
            // 页面动画滚动效果
        $('body,html').stop().animate({
                scrollTop: current
            }, function() {
                flag = true // 打开节流阀
            })
            // 点击之后 让当前的小li 添加current 类 姐妹移除current
            // 点的添红 其他去红
        $(this).addClass("current").siblings().removeClass();
    })
})