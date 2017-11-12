/**
 * Created by blueprint on 2017/11/10.
 */
$(function () {

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

  //1.点击添加分类按钮
   $('.btn-add').on('click', function () {
      $("#add-Modal").modal('show');
   })
  //2.点击下拉框 渲染二级分类
  $(".btn-list").on('click', function () {

    $.ajax({
      url:"/category/querySecondCategoryPaging",
      type:"get",
       data:{
         page:1,
         pageSize:100
       },
       success:function(data){
        console.log(data);
        $('.dropdown-menu').html( template("list-temp",data) );

         //将二级分类名称赋给按钮 保存二级分类id
         $('.dropdown-menu').on('click','a', function () {
           $(".select-text").text($(this).text());
           $('#brandId').val($(this).data('id'));
           $("#form").data('bootstrapValidator').updateStatus('brandId','VALID');
         })
       }
    })
  })
  //3.文件上传
  $("#brandLogo").fileupload({
      dataType:"json",
      done: function (e,data) {
        //console.log(data);
        //没上传一个 都会有一个data对象返回 data.result.picAddr
        //超过三张 不玩了
        if($(".img-list img").length>=3)return false;
        $(".img-list").append('<img data-name="'+data.result.picName+'" data-src="'+data.result.picAddr+'" src="'+data.result.picAddr+'" alt="">');

        if($(".img-list img").length===3){
           $("#form").data('bootstrapValidator').updateStatus('productLogo','VALID');
        }else{
           $("#form").data('bootstrapValidator').updateStatus('productLogo','INVALID');
        }
        //如果不满意想删除一张
        $(".img-list").on('dblclick','img', function () {
          $(this).remove();
          if($(".img-list img").length===3){
            $("#form").data('bootstrapValidator').updateStatus('picNum','VALID');
          }else{
            $("#form").data('bootstrapValidator').updateStatus('picNum','INVALID');
          }
        });

      }
  });
  //4.写表单校验
  $("#form").bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请输入二级分类名称'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入非零的数字"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品价格'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入正确的尺码,入35-50"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'请输入商品原价'
          }
        }
      },
      productLogo:{
        validators:{
          notEmpty:{
            message:'请上传三张图片'
          }
        }
      },
    }

  })
  //5.表单校验成功事件
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault();
    console.log(777);
    //将数据拼接起来成一个字符串
    var formData = $("#form").serialize();
    //图片地址拼接格式
    //picName1=1.png&picAddr1=product/1.png
    //picName2=2.png&picAddr2=product/2.png
    //picName3=3.png&picAddr3=product/3.png
    console.log(formData);
    var $img = $(".img-list img");
    console.log($img.attr('src'));
    formData += 'picName1='+$img[0].dataset.name+'&picAddr1='+$img[0].dataset.src;
    formData += 'picName2='+$img[1].dataset.name+'&picAddr2='+$img[1].dataset.src;
    formData += 'picName3='+$img[2].dataset.name+'&picAddr3='+$img[2].dataset.src;
    console.log(formData);


    $.ajax({
      url:"/product/addProduct",
      type:"post",
      data:formData,
      success: function (backData) {
        console.log(backData);
        if(backData.success){
          //隐藏模态框
          $("#add-Modal").modal('hide');
          currentPage = 1;
          loadData();
          //清空表单 重置样式
          $("#form")[0].reset();
          $("#form").data('bootstrapValidator').resetForm();
          $(".select-text").text('请输入二级分类');
          $('#brandId').val('');
          $(".img-list img").remove();
          $("#productLogo").val('');
        }
      }
    })
  })
})