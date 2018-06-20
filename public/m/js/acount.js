$(function(){
    CT.loginAjax({
        url:'/user/queryUserMessage',
        data:'',
        success:function (data) {
            $('.mui-media-body').html(''+data.username+'<p class="mui-ellipsis">绑定手机:'+data.mobile+'</p>')            
        }
    })

    //点击退出
    $('.mui-block').on('tap',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            data:'',
            dataType:'json',
            success:function(){
                location.href='login.html';
            }
        })
    })
})