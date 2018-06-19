$(function () {

    //下拉刷新
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识
            down: {
                auto: true,
                callback: function () {
                    var that = this;
                    getCartData(function (data) {
                        $('.mui-table-view').html(template('cart', data));
                        that.endPulldownToRefresh();
                    })
                }
            }
        }
    });


    //点击进行编辑
    $('.mui-table-view').on('tap', '.mui-icon-compose', function () {

        // 根据id获取被点击的商品
        var dataId = $(this).attr('data-id');
        var focusData;
        allData.forEach(function (item, index) {
            if (item.id == dataId) {
                focusData = item;
            }
        });


        // 编辑框
        mui.confirm(template('edit', focusData).replace(/\n/g, ''), '编辑商品', ['确定', '取消'], function (e) {
            if (e.index == 0) {

                console.log('111');

                CT.loginAjax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                        id: dataId,
                        size: $('.lt_cart_edit span.now').html(),
                        num: $('.mui-numbox input').val()
                    },
                    success: function (data) {
                        if (data.success) {
                            mui.toast('操作成功');
                            //重新渲染
                            getCartData(function (data) {
                                $('.mui-table-view').html(template('cart', data));
                            })

                        }
                    }
                })
            } else {

            }
        })

        //初始化输入框
        mui('.mui-numbox').numbox();

        $('.lt_cart_edit').on('tap', 'span', function () {
            $(this).addClass('now').siblings().removeClass('now');
        })
    })

    //点击进行删除
    $('.mui-table-view').on('tap', '.mui-icon-trash', function () {
        // 根据id获取被点击的商品
        var dataId = $(this).attr('data-id');
        var that = $(this);

        mui.confirm('是否删除', '', ['确定', '取消'], function (e) {
            if (e.index == 0) {
                CT.loginAjax({
                    url: '/cart/deleteCart',
                    data: {
                        id: dataId,

                    },
                    success: function (data) {
                        if (data.success) {
                            that.parent().parent().remove();
                            mui.toast('删除成功');
                            //重新渲染
                            getCartData(function (data) {
                                $('.mui-table-view').html(template('cart', data));
                            })
                        }
                    }
                })
            }
        })
    })

})


//点击计价
$('.mui-table-view').on('change','input',function () {
    setAmount();

    
})


var getCartData = function (callback) {
    CT.loginAjax({
        url: '/cart/queryCartPaging',
        data: {
            page: 1,
            pageSize: 1000
        },
        success: function (data) {
            window.allData = data.data;
            callback && callback(data);
        }
    });
}

// 计价
var setAmount = function () {
    var amount = 0;
    $('input:checked').each(function () {
        var num = $(this).attr('data-num');
        var price = $(this).attr('data-price');
        amount += num * price;
    })

    if(Math.floor(amount*100)%10) {
        amount=Math.floor(amount*100)/100;
    }else {
        amount=Math.floor(amount*100)/100;
        amount=amount.toString()+'0';
    }

    $('.lt_cart span').html(amount)
}