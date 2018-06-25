$(function () {
    var pageInfo = 1;
    var pageTotal;

    //根据页码渲染数据

    //art-template访问jQuery全局变量
    template.helper('getJquery', function () {
        return $;
    });

    getUserData(function (data) {
        $('tbody').html(template('userListTlp', data));
    });


    //初始化翻页功能
    var setPaginator = function (sumPage) {
        $('.pageList').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            alignment: 'right',
            size: 'small',
            currentPage: pageInfo, //当前页
            numberOfPages: 4,
            totalPages: sumPage, //总页数
        });
    };


    //获取用户信息
    function getUserData(callback) {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: pageInfo,
                pageSize: 3
            },
            dataType: 'json',
            success: function (data) {
                callback(data);
            }
        })
    };
})