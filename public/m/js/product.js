$(function () {


    //根据url获取产品id
    var key = CT.getCurrentKey();

    //初始化页面
    var render = function () {

        // 根据id渲染页面
        getProductDetail(key, function (data) {
            $('.mui-scroll').html(template('slideTpl', data));
            //初始化轮播图
            mui('.mui-slider').slider({
                interval: 2000 //自动轮播周期
            });

            //初始化数字选择框
            mui('.mui-numbox').numbox();
        });
    };
    render();



    //刷新按钮
    $('.mui-icon-refresh').on('tap', function () {
        $('.mui-scroll').html('<div class="loading"><span class="mui-icon mui-icon-spinner-cycle mui-spin"></span></div>')
        render();
    })

    //点击选择尺码
    $('.mui-scroll').on('tap', '.selec_size', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })


    //点击加入购物车行为
    $('.mui-btn-primary').on('tap', function () {
        //构造加入购物车请求
        var data = {
            productId: key,
            size: parseInt($('.selec_size.active').html()),
            num: $('.mui-input-numbox').val()
        };

        //判断尺码、数量选择情况
        if (!data.size) {
            mui.toast('请选择尺码');
            return false;
        };

        if (!data.num) {
            mui.toast('请选择数量');
            return false;
        };

        CT.getAjaxData({
            type: 'post',
            url: '/cart/addCart',
            data: data,
            beforeSend: function () {

            },
            success: function () {
                if (data.success) {
                    mui.confirm('加入购物车成功!', '是否去购物车', ['是', '否'], function (e) {
                        if (e.index == 0) {
                            location.href = 'cart.html'
                        } else {

                        }
                    })
                }
            },
            error: function () {
                mui.toast('网络繁忙！');
            }
        });

    });
});



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