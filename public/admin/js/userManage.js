$(function () {
    var pageInfo = 1;

    //根据页码渲染数据
    //art-template访问jQuery全局变量
    template.helper('getJquery', function () {
        return $;
    });

    var render = function () {
        getUserData(pageInfo, function (data) {
            $('tbody').html(template('userListTlp', data));
            setPaginator(Math.ceil(data.total / data.size));
        });

    };
    render();


    //初始化翻页功能
    var setPaginator = function (sumPage) {
        $('.pageList').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            alignment: 'right',
            size: 'small',
            currentPage: pageInfo, //当前页
            numberOfPages: 4,
            totalPages: sumPage, //总页数
            onPageClicked: function (event, originalEvent, type, page) {
                pageInfo = page;
                render();
            }
        });
    };

    // 点击禁用用户
    $('tbody').on('click', '#userBtn', function () {
        var currBtn = $(this).attr('class').split(' ')[1]; //获取当前按钮类型
        var user_id = $(this).attr('data-id'); //获取用户id
        //如果点击的是禁用按钮
        if (currBtn == 'btn-danger') {
            $('.modal-body').html('确定要禁用该用户么？')
            //点击确定禁用
            $('.modal .btn-primary').on('click', function () {
                userOperating(user_id, 0,render)
                $('.modal').modal('hide'); 
            })
        } else if (currBtn == 'btn-primary') {
            $('.modal-body').html('确定要启用该用户么？')
            $('.modal .btn-primary').on('click', function () {
                userOperating(user_id, 1,render)
                $('.modal').modal('hide'); 
            })
        }
    });

})

//发送禁用或者启用用户请求
var userOperating = function (id, isDele,callback) {
    $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
            id: id,
            isDelete: isDele
        },
        dataType: 'json',
        success: function (data) { 
            callback();
        }
    });
}


//获取用户信息
var getUserData = function (page, callback) {
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data: {
            page: page,
            pageSize: 3
        },
        dataType: 'json',
        success: function (data) {
            callback(data);
        }
    })
};