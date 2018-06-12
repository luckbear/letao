$(function(){
    //设置轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
    });

    //根据url获取产品id
    var key = CT.getCurrentKey();
    
    //根据id渲染页面
    getProductDetail(key,function (data) {
        $('.mui-scroll').html(template('slideTpl', data));      
    })
})


//获取ajax数据
var getProductDetail = function (param, callback) {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {id:param},
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    })
};