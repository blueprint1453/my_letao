/**
 * Created by blueprint on 2017/11/9.
 */
$(function () {
    //��ʼ��ҳ��������
    var currentPage = 1;
    var pageSize = 5;
    loadData();
    //�õ�ǰ��Ŀ¼����

    //��Ⱦҳ��ĺ���
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
                //��Ⱦ��ҳ�Ĺ���
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

    // �����û�״̬ ��� ����/���� ��ť
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
                    if(data.success){
                        $('#user-Modal').modal('hide');
                        loadData();
                    }
                }
            })
        })

    })

})