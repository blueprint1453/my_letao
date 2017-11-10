/**
 * Created by blueprint on 2017/11/9.
 */
$(function () {
    //初始化页数和条数
    var page = 1;
    var pageSize = 10;
    loadData();
    //让当前的目录高亮
    if(window.location.href.indexOf('user.html')!=-1){
        console.log(666);
        $('.menu a:eq(0)').addClass('now');
    }
    function loadData(){
        $.ajax({
            url:"/user/queryUser",
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success: function (data) {
                console.log(data);
                $('.user-info tbody').html(template('user-temp',data));

            }
        });
    }

    // 更新用户状态 点击 禁用/启用 按钮
    $('.user-info tbody').on('click','.btn-status',function(){
        var id = $(this).parent().siblings().eq(1).attr('id');
        var isDelete = $(this).attr('isDelete');
        console.log(isDelete);
        if(isDelete==1){
            $('#user-Modal .add-words').html("启用");
        }else{
            $('#user-Modal .add-words').html("禁用");
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
                    $('#user-Modal').modal('hide');
                    loadData();
                }
            })
        })

    })

})