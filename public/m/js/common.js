$(function () {
    //添加滑动功能
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });

});

//根据url获取参数
var CT = {};
CT.url = location.href;

//根据url获取参数
CT.getCurrentKey = function () {
    var key = CT.url.split('?')[1].split('=')[1];
    return key;
}

//ajax处理函数
CT.loginAjax = function (option) {
    $.ajax({
        type: option.type || 'get',
        url: option.url,
        data: option.data,
        dataType: option.dataType || 'json',
        beforeSend: function () {
            
        },
        success: function (data) {
            if (data.error == 400) {
                location.href = 'login.html?returnUrl=' + location.href;
            } else {
                option.success && option.success(data);
            }
        },
        error: function () {
            option.error && option.error();
        }
    })
};