 var app = {};
 var myChart = echarts.init(document.getElementById('linechart'), e_macarons);
 var option = null;
 option = {

     title: {
         show: false, //是否显示标题，默认显示，可以不设置
         text: null
     },
     tooltip: { //鼠标悬浮到线上，会出现具体的信息。提示组件
         trigger: 'axis',
         axisPointer: {
             type: 'cross',
             label: {
                 backgroundColor: '#84FEBF'
             }
         }
     },
     legend: {
         data: [{
             name: '最新成交价',
             textStyle: {
                 color: "#25c36c"
             }
         }, {
             name: '预购队列',
             textStyle: {
                 color: "#ee0306"
             }
         }],
     },
     toolbox: { //工具组件
         show: true,
         feature: {
             dataView: {
                 readOnly: false
             },
             restore: {}, //刷新
             saveAsImage: {} //保存为图片
         }
     },
     grid: { //网格组件
         show: true,
         backgroundColor: "#023A5F",
         borderWidth: 0,
         color: ["#44A238", "#44A238", "#44A238", "#44A238"]
     },

     dataZoom: { //区域缩放组件
         show: false,
         start: 0,
         end: 100
     },
     xAxis: [ //直角坐标系 grid 中的 x 轴
         {
             type: 'category',
             // 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
             boundaryGap: false,
             name: "时间",
             // 最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效。
             nameGap: 25, //坐标轴名称与轴线之间的距离。
             nameTextStyle: {
                 color: "gold",
                 padding: [20, 40],
                 lineHeight: 180
                     // align: 'left'
             },
             data: (function() {
                 var now = new Date();
                 var res = [];
                 var len = 20;
                 while (len--) {
                     res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                     now = new Date(now - 2000);
                 }
                 return res;
             })()
         }, {
             type: 'category',
             // splitNumber: 10, //坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，
             boundaryGap: false,
             data: (function() {
                 var res = [];
                 var len = 20;
                 while (len--) {
                     res.push(len + 1);
                 }
                 return res;
             })()
         }
     ],
     yAxis: [ //直角坐标系 grid 中的 y
         {
             type: 'value',
             scale: true,
             name: '价格',
             nameTextStyle: {
                 color: "gold",
                 padding: [20, 40],
                 lineHeight: 180 // align: 'left'
             },
             max: 30,
             min: 0,
             splitNumber: 10,
             boundaryGap: [0.2, 0.2]
         }, {
             type: 'value',
             scale: true,
             name: '预购量',
             nameTextStyle: {
                 color: "gold",
                 padding: [20, 40],
                 lineHeight: 180 // align: 'left' 
             },
             max: 1200,
             min: 0,
             boundaryGap: [0.2, 0.2]
         }
     ],
     series: [{
         name: '预购队列',
         type: 'line',
         // symbol: 'none', //这句就是去掉点的  
         // smooth: true, //这句就是让曲线变平滑的 
         xAxisIndex: 1,
         yAxisIndex: 1,
         data: (function() {
             var res = [];
             var len = 20;
             while (len--) {
                 res.push(Math.round(Math.random() * 1000));
             }
             return res;
         })()
     }, {
         name: '最新成交价',
         type: 'line',
         // symbol: 'none', //这句就是去掉点的  
         // smooth: true, //这句就是让曲线变平滑的 
         data: (function() {
             var res = [];
             var len = 0;
             while (len < 20) {
                 res.push((Math.random() * 50 + 5).toFixed(1) - 0);
                 len++;
             }
             return res;
         })()
     }]
 };

 app.count = 51;
 setInterval(function() {
     axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
     var data0 = option.series[0].data;
     var data1 = option.series[1].data;
     data0.shift();
     data0.push(Math.round(Math.random() * 1000));
     data1.shift();
     data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

     option.xAxis[0].data.shift();
     option.xAxis[0].data.push(axisData);
     option.xAxis[1].data.shift();
     option.xAxis[1].data.push(app.count++);

     myChart.setOption(option);
 }, 50);