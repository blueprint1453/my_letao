/**
 * Created by blueprint on 2017/11/9.
 */
$(function () {
    //初始化页数和条数
    var page = 1;
    var pageSize = 10;
    loadData();
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


    //更新用户状态
    $('.user-info tbody').on('click','.btn-update',function(){
        console.log(12345);
        var id = $(this).parent().siblings().eq(1).attr('id');
        var isDelete = $(this).attr('isDelete');
        console.log(111);
        console.log(isDelete);
        $.ajax({
            url:"/user/updateUser",
            type:'post',
            data:{
                id:id,
                isDelete:isDelete
            },
            success: function (data) {
                console.log(data);
                loadData();
            }
        })
    })
})