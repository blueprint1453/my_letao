/**
 * Created by blueprint on 2017/11/8.
 */
$(function () {
    // 基于准备好的dom，初始化echarts实例
    var leftChart = echarts.init(document.querySelector('.left-echart'));
    // 指定图表的配置项和数据
    var option_1 = {
        title: {
            text: '2017年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [1500, 1688, 1988, 2100, 1700, 1800]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    leftChart.setOption(option_1);
//-----------------------第二个图表--------------------------------------------
    // 基于准备好的dom，初始化echarts实例
    var rightChart = echarts.init(document.querySelector('.right-echart'));
    // 指定图表的配置项和数据
    var option_2 = {
        title : {
            text: '热门品牌销售',
            subtext: '2017年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','安踏','李宁',"361"]
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'耐克'},
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'安踏'},
                    {value:1548, name:'李宁'},
                    {value:1048, name:'361'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.6)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    rightChart.setOption(option_2);


})