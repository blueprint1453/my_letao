/**
 * Created by blueprint on 2017/11/9.
 */
$(function () {
    //��ʼ��ҳ��������
    var page = 1;
    var pageSize = 10;
    loadData();
    //�õ�ǰ��Ŀ¼����
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

    // �����û�״̬ ��� ����/���� ��ť
    $('.user-info tbody').on('click','.btn-status',function(){
        var id = $(this).parent().siblings().eq(1).attr('id');
        var isDelete = $(this).attr('isDelete');
        console.log(isDelete);
        if(isDelete==1){
            $('#user-Modal .add-words').html("����");
        }else{
            $('#user-Modal .add-words').html("����");
        }
        // ����ģ̬���ṩ��js���� ��ʾģ̬��
        $('#user-Modal').modal('show');

        //��ģ̬���ȷ����ť��ӵ���¼�
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
                    // ����ģ̬���ṩ��js���� ����ģ̬��
                    $('#user-Modal').modal('hide');
                    loadData();
                }
            })
        })

    })

})