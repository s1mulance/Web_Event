$(function() {
    let form = layui.form

    //验证表单内容
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
         //验证新密码是否与原密码相同
        newpwd: function(value) {
            if(value === $('[name="oldPwd"]').val()) {
                return '请输入新密码'
            }
        },
        repwd: function(value) {
            if(value !== $('[name="newPwd"]').val()) {
                return '两次输入的新密码不一致'
            }
        }
    })

    //监听表单的提交
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        //发起重置密码请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) return layui.layer.msg('修改密码失败')
                layui.layer.msg('修改密码成功')
                //操作dom对象用.reset()方法重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})