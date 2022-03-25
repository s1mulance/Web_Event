$(function(){
    //在调用$.post/.get/.ajax前该方法可获取本次请求中的配置对象
    $.ajaxPrefilter(function(option){
        option.url = 'http://www.liulongbin.top:3007' + option.url
    })
})