$(function () {
    $('form').bootstrapValidator({
        feedbackIcons: { //提示图标
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //服务器验证后提示消息
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 20,
                        message: '密码必须为6到20个字符'
                    },
                    //服务器验证后提示消息
                    callback: {
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault(); //阻止默认提交

        var $form = $(e.target);
        var $formData = $form.serializeArray()
        //提交验证
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: {
                username: $formData[0].value,
                password: $formData[1].value
            },
            dataType: 'json',
            success: function (data) {
                //验证通过
                if (data.success) {
                    location.href = 'index.html';
                    //验证失败
                } else {
                    $form.data('bootstrapValidator').disableSubmitButtons(false);
                    if (data.error == 1000) {
                        //更改消息提示
                        $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    } else if (data.error == 1001) {
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }
                }
            }
        });
    });
    //重置图标、提示等
    $('[type="reset"]').on('click', function () {
        $('form').data('bootstrapValidator').resetForm(true);
    });
})