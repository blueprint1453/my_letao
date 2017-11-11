/**
 * Created by blueprint on 2017/11/9.
 */
$(function () {
    //初始化页数和条数
    var currentPage = 1;
    var pageSize = 5;
    loadData();
    //让当前的目录高亮
    if(window.location.href.indexOf('user.html')!=-1){
        console.log(666);
        $('.menu a:eq(0)').addClass('now');
    }
    //渲染页面的函数
    function loadData(){
        $.ajax({
            url:"/user/queryUser",
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success: function (data) {
                console.log(data);
                $('.user-info tbody').html(template('user-temp',data));
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
        });
    }

    // 更新用户状态 点击 禁用/启用 按钮
    $('.user-info tbody').on('click','.changeStatus',function(){
        var id = $(this).parent().data('id');
        console.log(id);
        var isDelete;
        if($(this).hasClass('btn-danger')){
             isDelete = 0;
        }
        if($(this).hasClass('btn-success')){
             isDelete = 1;
        }

        // 调用模态框提供的js方法 显示模态框
        $('#user-Modal').modal('show');
        //给模态框的确定按钮添加点击事件
        $('.btn-confirm-user').on('click', function () {
            $.ajax({
                url:"/user/updateUser",
                type:'post',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success: function (data) {
                    console.log(data);
                    // 调用模态框提供的js方法 隐藏模态框
                    if(data.success){
                        $('#user-Modal').modal('hide');
                        loadData();
                    }
                }
            })
        })

    })

})