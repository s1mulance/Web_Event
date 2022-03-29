$(function () {
    //在调用$.post/.get/.ajax前该方法可获取本次请求中的配置对象options
    $.ajaxPrefilter(function (options) {
        //统一为ajax请求补齐路径
        options.url = 'http://www.liulongbin.top:3007' + options.url
        //统一为需要权限的借口设置请求头
        if(options.url.indexOf('/my/') !== -1) {
            options.headers = {
                //从localStorage获取数据，如果没有token则用空字符串代替
                Authorization: localStorage.getItem('token') || ''
            }
        }
        //访问需要权限的接口时检测是否为未登录用户
        //ajax请求无论成功与否都会执行complete回调函数
        options.complete = function(res) {
            console.log(res)
            //验证用户是否登录
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                //清空token
                localStorage.removeItem('token')
                //返回登录页面
                location.href = '/login.html'
            }
        }
    })
})