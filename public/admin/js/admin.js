$(function () {
    //禁用转圈
    NProgress.configure({
        showSpinner: false
    })
    //进度条
    $(window).ajaxStart(function () {
        NProgress.start();
        
    });
    $(window).ajaxStop(function () {
        NProgress.done();
    });

    //侧边栏折叠
    $('[data-menu]').on('click', function () {
        $('.ad_side').toggle();
        $('.ad_section').toggleClass('menu');
    });

    //二级分类菜单折叠
    $('.child').prev().on('click', function () {
        $('.child').toggle();
    })

    //注销框
    $('[data-logout]').on('click', function () {
        //插入模态框代码
        $('.ad_side').before(['<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog">',
            '        <div class="modal-dialog" role="document">',
            '            <div class="modal-content">',
            '                <div class="modal-header">',
            '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">',
            '                        <span aria-hidden="true">&times;</span>',
            '                    </button>',
            '                    <h4 class="modal-title">提示：</h4>',
            '                </div>',
            '                <div class="modal-body">',
            '                    <p>确定要注销么？</p>',
            '                </div>',
            '                <div class="modal-footer">',
            '                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
            '                    <button type="button" class="btn btn-primary">确定</button>',
            '                </div>',
            '            </div>',
            '        </div>',
            '    </div>'
        ].join(""));

        //点击确定的话，发送ajax请求注销
        $('.modal .btn-primary').on('click', function () {
            $.ajax({
                type: 'get',
                url: '/employee/employeeLogout',
                data: '',
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        location.href='/admin'
                    }else if(data.error) {

                    }
                }
            })
        })

    })

})