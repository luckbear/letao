$(function () {
    //设置轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });

    //根据url获取产品id
    var key = CT.getCurrentKey();

    //根据id渲染页面
    getProductDetail(key, function (data) {
        $('.mui-scroll').html(template('slideTpl', data));
        getProParam();
    });

    //商品参数值获取
    var getProParam = function () {
        //点击获取尺码
        var currSize;
        $('.size span').on('tap', function () {
            $(this).addClass('active').siblings().removeClass('active');
            currSize = $(this).text();
        });

        //初始化数字输入框,并获取值
        mui('.mui-numbox').numbox();
        var currNum = $('.count input').val();

        //加入购物车
        $('.mui-btn-primary').on('tap', function () {
            if(!currSize) {
                mui.toast('请选择尺寸');
            } else if (!currNum) {
                mui.toast ('请选择数量');
            }
        })

    };


})









//获取ajax数据
var getProductDetail = function (param, callback) {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: param
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    })
};