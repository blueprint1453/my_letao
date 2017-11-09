/**
 * Created by blueprint on 2017/11/8.
 */
$(function () {
    //1.用户名不能为空
    //2.密码不能为空
    //3.密码长度6-12位
    var $form = $('form');
    $form.bootstrapValidator({
        //配置校验时的小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //规则
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback:{
                        message:"用户名错误"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度6-12位"
                    },
                    callback:{
                        message: "密码错误"

                    }

                }
            }
        }

    })

    //给表单注册一个校验成功事件 success.form.bv
    $form.on('success.form.bv', function (e) {
        //阻止提交按钮的默认事件 采用ajax提交
        e.preventDefault();
        console.log($form.serialize());
        $.ajax({
            url:"/employee/employeeLogin",
            type:"post",
            data:$form.serialize(),
            success: function (data) {
                console.log(data);
                if(data.success){
                    //跳转到首页
                    location.href = "index.html";
                }
                if(data.error==1000){
                    console.log(123);
                    $form.data("bootstrapValidator").updateStatus('username','INVALID',"callback");
                }
                if(data.error==1001){
                    console.log(123);
                    $form.data("bootstrapValidator").updateStatus('password','INVALID',"callback");
                }
            }
        })
    })

    //给重置按钮注册一个事件
    $('button[type=reset]').on('click', function () {
        $form.data("bootstrapValidator").resetForm();
    })
})