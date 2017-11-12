/**
 * Created by blueprint on 2017/11/10.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    //初始化加载
    loadData();
    //加载函数
    function loadData(){
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
               page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                $('tbody').html( template("second-temp",data) );
                //分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked: function (event, originalEvent, type,page) {
                        //将当前页变为点击页码
                        currentPage=page;
                        loadData();
                    }
                });

            }
        })
    }

    //1.点击 添加分类按钮 弹出模态框
    //2.点击一级分类下拉框 渲染分类列表
    //3.选中某条分类后 下拉框显示的文本变为选中的那个分类名称
    //4.输入二级分类名称
    //5.点击上传图片 ajax上传图片后接受返回的数据 用一个img标签预览上传的图片
    //6.表单校验
    //7.表单校验成功事件
    //重置表单的样式和内容

    //1.点击 添加分类按钮
    $(".btn-add").on('click', function () {
        //弹出模态框
        $("#add-Modal").modal('show');
        //2.点击一级分类下拉框 渲染分类列表
        $('.btn-list').on('click', function () {
            $.ajax({
                url: "/category/queryTopCategoryPaging",
                type: "get",
                data: {
                    page: 1,
                    pageSize: 100
                },
                success: function (data) {
                    //console.log(222);
                    console.log(data);
                    $('.dropdown-menu').html(template('list-temp', data));

                }
            })
        });
    })

        //3.选中某条分类后 下拉框显示的文本变为选中的那个分类名称
         $('.dropdown-menu').on('click','a', function () {
             console.log($(this).data('id'));
             $('.select-text').text($(this).text());
             //保存一级分类的id用于发送
             $("#categoryId").val($(this).data('id'));
             $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID');

         });
        //4.输入二级分类名称

        //5.点击上传图片
        //5.1. type:file
        //5.2. 必须指定name属性，因为后台通过这个name属性去获取图片
        //5.3. 必须data-url：指定图片上传的地址
        $("#brandLogo").fileupload({
            dataType:"json",
            done: function (e,data) {
                console.log(data.result.picAddr);//图片地址
                $(".pic-box img").attr('src',data.result.picAddr);//图片预览
                $("#brand").val( data.result.picAddr );
                $("#form").data('bootstrapValidator').updateStatus('brandLogo','VALID');

            }
        });
        //6.1表单校验
        $("#form").bootstrapValidator({
            excluded:[],
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields:{
                categoryId:{
                    validators:{
                        notEmpty:{
                            message:"请输入一级分类名称"
                        }
                    }
                },
                brandName:{
                    validators:{
                        notEmpty:{
                            message:"请输入二级分类名称"
                        }
                    }
                },
                brandLogo:{
                    validators:{
                        notEmpty:{
                            message:"请上传图片"
                        }
                    }
                }
            }
        })


    //6.1表单校验成功
    $('#form').on('success.form.bv', function (e) {
        console.log(555);
        e.preventDefault();
        $.ajax({
            url:"/category/addSecondCategory",
            type:"post",
            data:$('#form').serialize(),
            success: function (data) {
                console.log(9999);
                if(data.success){
                    $("#add-Modal").modal('hide');
                    currentPage = 1;
                    loadData();
                    //重置表单样式 清空内容
                    $("#form").data('bootstrapValidator').resetForm();
                    $("#form")[0].reset();
                    $(".select-text").text("请选择");
                    $(".pic-box img").attr('src','images/none.png');


                }
            }
        })

    })


})