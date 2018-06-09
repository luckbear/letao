//左边滑动
mui('.cate_left').scroll({
    indicators:false
});


$(function () {
    getTopCateData(topCateRender);
});


// 获取一级分类数据
var getTopCateData = function (callback) {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        data: '',
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    })
};

// 渲染一级分类
var topCateRender = function (data) {
    $('.cate_left ul').html(template('topCateTem', {
        data
    }));
    var cateId = $('.cate_left ul').find('li.active').attr('data-id');
    if (listData[cateId]) {
        secondCateRender(listData[cateId]);
    } else {
        getSecCateData(secondCateRender, cateId);
    }
};


// 获取二级分类数据
var listData=[];
var getSecCateData = function (callback, id) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: {id:id},
        dataType: 'json',
        success: function (data) {
            listData[id]=data;
            callback && callback(data);    
        }
    })
};

// 渲染二级分类
var secondCateRender = function (data) {
    $('.cate_right ul').html(template('secondCateTem', {
        data
    }));
};

$('.cate_left ul').on('tap','li',function(){
    if ($(this).attr('class')) return
    $('.cate_left ul li').removeClass('active');
    $(this).addClass('active');
    var cateId = $('.cate_left ul').find('li.active').attr('data-id');
    if (listData[cateId]) {
        secondCateRender(listData[cateId]);
    } else {
        getSecCateData(secondCateRender, cateId);
    }
});
