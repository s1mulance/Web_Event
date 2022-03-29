$(function(){
    getUserInfo()

    //给退出绑定点击事件
    $('#loginOut').on('click', function() {
        //退出提示框
        layer.confirm('点击确定退出登录', {btn: ['确定', '取消']}, function(index, layero){
            //清除登录时本地存储的token
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href = '/login.html'
          }, function(index){
            //按钮【取消】的回调
          });
    })
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //请求头对象
        // headers: {
        //     //从localStorage获取数据，如果没有token则用空字符串代替
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if(res.status !== 0) return layui.layer.msg('获取用户信息失败')
            //渲染用户信息
            // console.log(res.data);
            renderAvatar(res.data)
        },
        // //访问需要权限的接口时检测是否为未登录用户
        // //ajax请求无论成功与否都会执行complete回调函数
        // complete: function(res) {
        //     console.log(res)
        //     //验证用户是否登录
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         //清空token
        //         localStorage.removeItem('token')
        //         //返回登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//渲染用户信息
function renderAvatar(user) {
    //渲染用户名
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染头像
    //判断用户是否有user_pic
    if(user.user_pic) {
        $('.textAvatar').hide()
        $('.userinfo .layui-nav-img').attr('src', user.user_pic).show()
    } else {
        //取用户首字母大写作为文本头像
        let first = name[0].toUpperCase()
        $('.userinfo .layui-nav-img').hide()
        $('.textAvatar').html(first).show()
    }
}