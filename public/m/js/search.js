$(function () {
    $('.search_btn').on('tap',function(){
        var key= $.trim($('input').val());
        if (!key) {
            console.log('11111');
            
            mui.toast('请输入关键字');
            return false;
        }else {
           $(this).attr('href','searchList.html?key='+key+'')
        }
    })
})