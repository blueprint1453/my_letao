/**
 * Created by blueprint on 2017/11/10.
 */
$(function () {
    var currentPage = 1;
    var pageSize = 5;
    //初始化页面
    loadData();
    //加载页面的函数
    function loadData(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                $('tbody').html(template('first-temp',data));
                //渲染分页的功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked: function (event, originalEvent, type,page) {
                        currentPage = page;
                        loadData();
                    }
                });
            }
        })
    }

    //点击 添加分类按钮 弹出模态框 btn-add
    $('.btn-add').on('click',function(e){
        //模态框显示
        $("#add-Modal").modal('show');
        //表单校验
        $('#form').bootstrapValidator({
            //1. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields:{
                categoryName:{
                    validators:{
                        notEmpty:{
                            message:"请输入一级分类名称"
                        }
                    }
                }
            }
        });
        //点击模态框的 确定 按钮 提交ajax请求 重新加载数据
        //$('.btn-addCategory').on('click', function () {
        //    //阻止默认提交行为
        //    e.preventDefault();
        //    var categoryName = $('#categoryName').val();
        //    console.log(categoryName);
        //    $.ajax({
        //        url:"/category/addTopCategory",
        //        type:"post",
        //        data:$('#form').serialize(),
        //        success: function(data) {
        //            if(data.success){
        //                $("#add-Modal").modal('hide');
        //                //重新渲染第一页
        //                currentPage = 1;
        //                loadData();
        //                //清空表单内容
        //
        //            }
        //        }
        //    })
        //})
        $("#form").on('success.form.bv', function (e) {
            e.preventDefault();
            //使用ajax提交逻辑
            var categoryName = $('#categoryName').val();
            console.log(categoryName);
            $.ajax({
                url:"/category/addTopCategory",
                type:"post",
                data:$('#form').serialize(),
                success: function(data) {
                    if(data.success){
                        $("#add-Modal").modal('hide');
                        //重新渲染第一页
                        currentPage = 1;
                        loadData();
                        //清空表单内容
                        //先获取表单校验实例 才能调用方法
                        var validator = $("#form").data("bootstrapValidator");
                        validator.resetForm();//重置样式
                        $("#form").reset();//清空内容

                    }
                }
            })
        });
    })
})