/**
 * Created by blueprint on 2017/11/8.
 */
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
