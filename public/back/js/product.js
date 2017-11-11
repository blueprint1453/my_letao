/**
 * Created by blueprint on 2017/11/10.
 */
$(function () {
  if(window.location.href.indexOf("product.html")!=-1){
    $('.menu li>a:eq(2)').addClass('now');
  }
  
  var currentPage = 1;
  var pageSize = 5;
  loadData();
  function loadData(){
    $.ajax({
      url:"/product/queryProductDetailList",
      type:"get",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success: function (data) {
        console.log(data);
        $('tbody').html( template('pro-temp',data) );
        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(data.total/pageSize),
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            loadData();
          }

        })
      }
    })
  }


})