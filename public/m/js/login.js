$(function () {
    if (window.login) {
        return false;
    }

    $('.mui-btn-primary').on('tap', function () {

        //表单序列化为对象
        var loginInfo = $('form').serialize().split('&');
        var data = {};
        loginInfo.forEach(function(item ,index){
            data[item.split('=')[0]] = item.split('=')[1];
        }) 
        
        //验证输入有效性
        if (!data.username) {
            mui.toast('请输入账号');
            return false;
        }

        if (!data.password) {
            mui.toast('请输入密码');
            return false;
        }

        //发送验证
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:data.username,
                password:data.password
            },
            dataType:'json',
            success :function(data) {
                if (data.error) {
                    mui.toast(data.message);
                    window.login=false;
                } else if (data.success) {
                    if (location.search && location.search.indexOf('?returnUrl=')>-1) {
                        location.href=location.search.replace ('?returnUrl=','');
                    } else {
                        location.href = 'acount.html'
                    }
                    
                }
            }
        })
    })
})