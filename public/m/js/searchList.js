$(function () {
    //根据url填充搜索框
    var key = CT.getCurrentKey();
    $('input').val(key);
    var currentPage = 1;

    //页面渲染
    var render = function (callback) {
        //获取输入框的值
        var key = $.trim($('input').val());
        if (!key) {
            mui.toast('请输入关键字');
            return false;
        }

        //获取排序的参数（通过是否有active类和箭头样式）
        var type = $('[data-order].active').attr('data-order');
        var value = $('[data-order].active').find('span').hasClass('fa-angle-down') ? 2 : 1;
        var order = {};
        //组装排序项和顺序
        if (type) {
            order[type] = value;
        };

        var pageSize = 2;

        //根据模板渲染页面
        getProductListData($.extend({
            proName: key,
            page: currentPage,
            pageSize: pageSize
        }, order), function (data) {
            if (currentPage == 1) {
                $('.search_pro').html(template('searchTem', data));
            } else {
                $('.search_pro').append(template('searchTem', data));
            }
            callback && callback();
        });

    };

    render();

    //当前页的搜索(要去掉排序状态)
    $('.btn_search').on('tap', function () {
        //重置样式
        $('[data-order].active').removeClass('active').removeClass('fa-angle-up').addClass('fa-angle-down');
        //加载动画
        $('.search_pro').html('<div class="loading"><span class="mui-icon mui-icon-spinner-cycle mui-spin"></span></div>')
        currentPage = 1;
        render();
    });

    //点击进行排序
    $('[data-order]').on('tap', function () {
        var $this = $(this);
        var $arrow = $this.find('span');
        $this.addClass('active').siblings().removeClass('active');
        //更改上下箭头
        if ($arrow.hasClass('fa-angle-down')) {
            $arrow.removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            $arrow.removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        currentPage = 1;
        render();
    })

    // 下拉刷新
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识
            down: {
                callback: function () {
                    currentPage = 1;
                    var that = this;
                    render(function () {
                        that.endPulldownToRefresh();
                    });
                }
            },
            //上拉加载
            up: {
                callback: function () {
                    currentPage++;
                    var that = this;
                    render(function () {
                        that.endPullupToRefresh();
                    })
                }
            }
        }
    });
});





//请求Ajax数据
var getProductListData = function (param, callback) {
    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: param,
        dataType: 'json',
        success: function (data) {
            if (data.data.length == 0) {
                mui.toast('没有更多商品');
            }
            callback && callback(data);
        }
    })
}