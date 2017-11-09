/**
 * Created by blueprint on 2017/11/8.
 */
$(function () {

    //页面一加载就发送一个ajax请求 判断用户是否登录 如果没有登录,那就打回登录页
    //登录页就不需发送了
    if(window.location.href.indexOf("login.html")==-1){
        $.ajax({
            url:'/employee/checkRootLogin',
            type:'get',
            success:function(data){
                console.log('hello');
                if(data.error==400){
                    //alert("未登录");
                    window.location.href = "login.html";
                }
            }
        })
    }
    //关闭进度环
    NProgress.configure({ showSpinner: false });

//一发送ajax就开启进度条
    $(document).ajaxStart(function () {
        //console.log(11111);
        NProgress.start();
    });
//发送完后进度条结束
    $(document).ajaxStop(function () {
        //console.log(2222);
        setTimeout(function () {
            NProgress.done();
        },1000);


    });

    //导航的公共事件,每个页面都要使用
    //点击分类管理 二级菜单下拉显示
    $('.menu li>a:eq(1)').on('click', function () {
        console.log(123);
        $(this).parent().find('.submenu').slideToggle();
    });
    //给导航切换按钮添加点击事件
    $('.toggle-nav').on('click', function () {
        console.log(123456);
        $('.lt-aside').toggleClass('toggle');
        $('.lt-main').toggleClass('toggle');
    });
    //给模态框的确定按钮添加点击事件
    $('.modal .btn-confirm').on('click', function () {
        console.log(123456);
        //window.location.href = "login.html";//这样没有真正退出
        $.ajax({
            url:"/employee/employeeLogout",
            type:"get",
            success: function (data) {
                console.log(data);
                if(data.success){
                    window.location.href = "login.html";
                }
            }
        })
    });
})

