$(function() {

    //调用getUserInfo（）获取用户基本信息
    getUserInfo()

    let layer = layui.layer

    //点击按钮 实现退出功能
    $('#btnLogout').on('click', function() {
        // console.log('ok');
        // 提示用户是否退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // console.log('ok')
            // 清空本地存储中的 yoken
            localStorage.removeItem('token')
                // 重新跳转到登录页面
            location.href = '/大事件项目/login.html'
                // 关闭 confirm 询问框
            layer.close(index);
        })
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // header 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 不论成功还是失败 最终都会调用 complete 回调函数
        // complete: function(res) {
        //     // console.log('执行了 complete回调');
        //     // console.log(res);
        //     // 在complete 回调函数中 可以使用 res.response拿到服务器响应回来的参数
        //     if (res.responseJSON.stasus === 1 && res.responseJSON.message === '身份验证失败！') {
        //         // 强制 清空token
        //         localStorage.removeItem('token')
        //             // 强制跳转到登录页面
        //         location.href = '/大事件项目/login.html'
        //     }
        // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 获取用户的名称
    let name = user.nickname || user.username
        // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}