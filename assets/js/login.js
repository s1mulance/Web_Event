$(function(){
    $('#linkRegister').on('click', function() {
        $('.loginBox').hide()
        $('.registerBox').show()
    })

    $('#linkLogin').on('click', function() {
        $('.registerBox').hide()
        $('.loginBox').show()
    })

    //获取layui的form对象
    let form = layui.form
    //获取layui的layer对象
    let layer = layui.layer
    //layui里的form.verify()
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
          ],
        repwd: function(value) {//value：表单的值
            //pwd为密码框中的value
            let pwd = $('.registerBox [name="password"]').val()
            if(value !== pwd) {
                //return自动弹出默认提示框
                return '输入的密码不一致'
            }
        } 
    })

    //监听注册表单的提交事件
    $('#registerForm').on('submit', function(e) {
        e.preventDefault()//防止自动跳转
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: { 
                username: $('#registerForm [name="username"]').val(),
                password: $('#registerForm [name="password"]').val()
            },
            success: function(res) {
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功');
            }
        })
    })

    //监听登录表单的提交事件
    $('#loginForm').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layer.msg('登录失败')
                layer.msg('登陆成功')
                //href 属性是一个可读可写的字符串，可设置或返回当前显示的文档的完整 URL
                location.href = '/index.html'//跳转到首页
                localStorage.setItem('token', res.token)
            }
        })
    })
})