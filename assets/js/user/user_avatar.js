// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

//通过input实现上传按钮
$('#btnChooseImage').on('click', function () {
    $('#file').click()
})

//给input绑定change事件，当选择的文件发生变化时触发
$('#file').on('change', function (e) {
    //console.log(e);
    //得到用户选择的文件
    let file = e.target.files[0]
    if(e.target.files.length === 0) {
        return layui.layer.msg('请选择格式正确的图片')
    }
    //得到用户选的文件的路径
    let newImgURL = URL.createObjectURL(file)
    //将图片裁剪区域的文件替换为用户选择的文件
    // 销毁旧的裁剪区域
    $image.cropper('destroy')
        // 重新设置图片路径
        .attr('src', newImgURL)
        // 重新初始化裁剪区域
        .cropper(options)
})

//监听确定按钮的点击事件
$('#btnUpload').on('click', function () {
    //得到用户裁剪后的头像
    let dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    //发起上传头像请求
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function(res) {
            if(res.status !== 0) return layui.layer.msg('上传头像失败')
            layui.layer.msg('上传头像成功')
            //更新父界面中的头像
            window.parent.getUserInfo()
        }
    })
})