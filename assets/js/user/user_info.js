$(function () {
    let form = layui.form
    let layer = layui.layer

    //表单信息验证
    form.verify({
        nickname: function(value){ //value：表单的值
          if(value.length > 8){
            return '用户昵称不能超过8个字符'
          }
        }
    })

    //获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status !== 0) return layer.msg('获取用户信息失败')
                // console.log(res);
                //为表单赋值，formUserInfo为lay-filter="" 对应的值
                form.val('formUserInfo', res.data);
            }
        })
    }
    initUserInfo()

    //监听表单的提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        //请求更新用户基本信息
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //表单元素序列化
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layer.msg('修改用户信息失败')
                layer.msg('修改用户信息成功')
                //在当前iframe页面中调用父页面index.html中的getUserInfo()方法在父页面中重新渲染用户信息
                window.parent.getUserInfo()
            }
        })
    })


    //监听重置按钮
    $('#resetBtn').on('click', function(e) {
        //阻止默认重置
        e.preventDefault()
        //重新获取用户信息
        initUserInfo()
    })
})