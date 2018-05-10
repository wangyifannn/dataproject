// -数据采集-----------------------------------------
$("#data_gather_type").change(function() {
    var select_v = $(this).children('option:selected').val();
    console.log(select_v);
    $("#gather_model").modal();
});
// -数据下载-----------------------------------------
var dataArr = [{
    "value": "1",
    "name": "22"
}, {
    "value": "2",
    "name": "22"
}, {
    "value": "",
    "name": "22"
}, {
    "value": "",
    "name": "22"
}, {
    "value": "",
    "name": "22"
}, {
    "value": "",
    "name": "22"
}, {
    "value": "",
    "name": "22"
}, {
    "value": "",
    "name": "22"
}, {
    "value": "",
    "name": "22"
}, {
    "value": "",
    "name": "22"
}]
var dataArr = [
    "2212121", "2121221", "212112", "332323", "213255",
    "2444441", "2444431", "234152", "882323", "913255",
    "2443941", "2444431", "234112", "882323", "913255",
    "2443441", "2444431", "234112", "882323", "913255",
    "2443441", "2444431", "234512", "882323", "913255"
];

function createCheck(arr, name) {
    var checkAll = '<input type="checkbox"  value="all" id="invert_btn"><a href="#">' + "全选" + '</a>';
    var checkStr = "";
    for (var i = 0; i < arr.length; i++) {
        checkStr += '<span class="choice-span"><input type="checkbox" name="checkbox" value="' + i + '"><a href="#">' + dataArr[i] + '</a></span>';
    }
    var boxs = '<div class="pull-left">' + checkAll + '</div><div class="pull-right">' + checkStr + '</div>'
    $(name).html(boxs);
}
createCheck(dataArr, ".modal_choice2");

Invert("#invert_btn", ".modal_choice2");

var choiceArr = ["数据元素", "数据元素", "数据元素"];

function creatChoice(arr, name) {
    var carInfo = '<label>车辆编号：</label><span class="vSn_val"></span>';
    var checkStr = "";
    for (var i = 0; i < 20; i++) {
        checkStr += '<span class="choice-span"><input type="checkbox" name="checkbox" value="' + i + '"><a href="#">' + "数据元素" + '</a></span>';
    }
    var boxs = '<div class="carInfo">' + carInfo + '</div><div class="choiceInfo"><div class="pull-left pull-l-name">数据元素：</div>' +
        '<div class="pull-left pull-l-c">' + checkStr + '</div></div>'
    $(name).html(boxs);
}
creatChoice("choiceArr", ".d_con");
var tabtitA = ["行驶时间", "海拔(M)", "GPS车速(KM/H)", "GPS里程(KM)", "方向", "经度", "纬度"];
var tabtitArr = [{
        "runtime": "ss",
        "altitude": 222,
        "carspeed": 2212,
        "carmileage": 4354,
        "dir": 111.00,
        "longitude": 1234,
        "latitude": 9876
    },
    {
        "runtime": "ss",
        "altitude": 21,
        "carspeed": 2212,
        "carmileage": 4354,
        "dir": 111.00,
        "longitude": 1234,
        "latitude": 9876
    },
    {
        "runtime": "ss",
        "altitude": 200,
        "carspeed": 2212,
        "carmileage": 4354,
        "dir": 111.00,
        "longitude": 1234,
        "latitude": 9876
    },
    {
        "runtime": "ss",
        "altitude": 10,
        "carspeed": 2212,
        "carmileage": 4354,
        "dir": 111.00,
        "longitude": 1234,
        "latitude": 9876
    },
    {
        "runtime": "ss",
        "altitude": 40,
        "carspeed": 2212,
        "carmileage": 4354,
        "dir": 111.00,
        "longitude": 1234,
        "latitude": 9876
    }
];

function creattable(name, arr, titarr) {
    var tabCon = "";
    var titlist = "<span>序号</span>";
    var row_list = "";
    for (var t = 0; t < titarr.length; t++) {
        titlist += '<span>' + titarr[t] + '</span>';
    }
    var index = "";
    for (var i = 0; i < arr.length; i++) {
        index = i + 1;
        row_list = "<span>" + index + "</span>";
        var obj = arr[i];
        for (var k in obj) {
            row_list += '<span>' + obj[k] + '</span>';
        }
        tabCon += '<div class="tab_row">' + row_list + '</div>';
    }
    var tableBox = '<div class="tab_tit">' + titlist + '</div><div class="tab_con">' + tabCon + '</div>';
    $(name).html(tableBox);
}
// creattable(".c_data_table", tabtitArr, tabtitA);

$(".c_data.d_header").click(function() {
    $(".con_tab").slideToggle("slow");
})
$(".s_data.d_header").click(function() {
    $(".c_data_charts").slideToggle("slow");
})

// 数据显示--图表

$("#myTab .fileli").click(function() {
    initFile();
});

function initFile() {
    $.ajax({
        url: "http://localhost/car/dataProject/json/d.json",
        type: "get",
        success: function(res) {
            console.log(res);
            createTable("#fileTable", "#toolbar_fileTable", res,
                "id", "name", "brand", "status", "data", "true", "false",
                "车辆编号", "终端编号", "文件名", "文件生成日期", "下载",
                "false", "", "", "client", "文件列表");
        }
    })
}

initcurrent();

//添加数据到当前列表
var deldata = [];
// var d = setInterval(function() {
//     initcurrent();
//     // $("#currentTable").bootstrapTable('prepend', randomData());
// }, 2000);

// 判断
// 获取实时新增数据
// function randomData() {
//     var startId = ~~(Math.random() * 100),
//         rows = [];
//     for (var i = 0; i < 10; i++) {
//         rows.push({
//             id: startId + i,
//             name: 'test' + (startId + i),
//             brand: '$' + (startId + i),
//             status: 1,
//             data: "2018-20-22"
//         });
//     }
//     return rows;
// }

function initcurrent() {
    $.ajax({
        url: "http://localhost/car/dataProject/json/d.json",
        type: "get",
        success: function(res) {
            console.log(res);
            createTable("#currentTable", "#toolbar_currentTable", res,
                "id", "name", "brand", "status", "data", "true", "false",
                "车辆编号", "大气压力", "车速", "发动机转速", "扭矩百分比",
                "false", "", "", "client")
        }
    });
    // var res = randomData();
    // createTable("#fileTable", "#toolbar_fileTable", res,
    //     "id", "name", "brand", "status", "data", "true", "false",
    //     "车辆编号", "终端编号", "文件名", "文件生成日期", "下载",
    //     "false", "", "", "client", "文件列表");
}