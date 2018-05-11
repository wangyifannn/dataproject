// -数据采集-----------------------------------------
var gatherArr = [];

creatChoice(gatherArr, ".d_con");

$("#data_gather_type").change(function() {
    var select_v = $(this).children('option:selected').val();
    console.log(select_v);
    $("#gather_model").modal();
    // 点击变量选择
    $(".n_g_btn").click(function() {
        console.log("采集确认变量");
        var checkChocie = $(".modal_choice2 .pull-right input:checked");
        for (var j = 0; j < checkChocie.length; j++) {
            gatherArr.push(checkChocie[j].value);
        }
        creatChoice(gatherArr, $(".getvSn option:selected").attr("value"), ".d_con");
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
    });

});
// 数据采集：选择车辆编号
// initTerAndCar(allurl + "/data-management/vehicle/allVehicle.json", "#gather_model .getvSn");

// -数据下载-----------------------------------------
var dataArr = [
    "行驶时间", "GPS车速", "方向", "经度", "纬度",
    "海拔", "GPS里程", "车速", "档位", "终端环境温度",
    "2443941", "2444431", "234112", "882323", "913255",
    "2443441", "2444431", "234112", "882323", "913255",
    "2443441", "2444431", "234512", "882323", "913255"
];

function createCheck(arr, name) {
    var checkAll = '<input type="checkbox"  value="all" id="invert_btn"><a href="#">' + "全选" + '</a>';
    var checkStr = "";
    for (var i = 0; i < arr.length; i++) {
        checkStr += '<span class="choice-span"><input type="checkbox" name="checkbox" value="' + arr[i] + '"><a href="#">' + dataArr[i] + '</a></span>';
    }
    var boxs = '<div class="pull-left">' + checkAll + '</div><div class="pull-right">' + checkStr + '</div>'
    $(name).html(boxs);
}
createCheck(dataArr, ".modal_choice2");

Invert("#invert_btn", ".modal_choice2"); //全选、反选

// choice-span
$(".modal_choice2 .choice-span").click(function() {
    // console.log($(this).children("input[name='checkbox']"));
    console.log($(this).children("input[name='checkbox']").prop("checked"));
    if ($(this).children("input[name='checkbox']").prop("checked") == true) {
        $(this).children("input[name='checkbox']").prop("checked", false);
    } else {
        $(this).children("input[name='checkbox']").prop("checked", true);
    }
})

function creatChoice(arr, vSn_val, name) {
    var carInfo = '<label>车辆编号：</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="vSn_val">' + vSn_val + '</span>';
    var checkStr = "";
    for (var i = 0; i < arr.length; i++) {
        checkStr += '<span class="choice-span"><a href="#">' + arr[i] + '</a></span>';
    }
    var boxs = '<div class="carInfo">' + carInfo + '</div><div class="choiceInfo"><div class="pull-left pull-l-name">数据元素：</div>' +
        '<div class="pull-left pull-l-c">' + checkStr + '</div></div>'
    $(name).html(boxs);
}
var tabtitA = ["行驶时间", "海拔(M)", "GPS车速(KM/H)", "GPS里程(KM)", "方向", "经度", "纬度"];

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
// creattable(".c_data_table", tabtitArr, tabtitA);//自定义表格调用

$(".c_data.d_header").click(function() {
    $(".con_tab").slideToggle("slow");
});
$(".s_data.d_header").click(function() {
    $(".c_data_charts").slideToggle("slow");
});

// 点击开始采集
$(".start_gather_btn").click(function() {
    console.log($(".vSn_val").html());

    if ($(".vSn_val").html() == "" || $(".vSn_val").html() == undefined) {
        toastr.warning('请先选则车辆编号和采集参数', '数据采集', messageOpts);
        return;
    } else {
        console.log($(".vSn_val").html());
        console.log(gatherArr);
        initcurrent();
        //添加数据到当前列表
        var d = setInterval(function() {
            $("#currentTable").bootstrapTable('prepend', randomData());
            // $("#currentTable").bootstrapTable('destroy');
        }, 2000);
    }
});



// 获取实时新增数据

function randomData() {
    var startId = ~~(Math.random() * 100),
        rows = [];
    for (var i = 0; i < 10; i++) {
        rows.push({
            altitude: startId + i,
            altitude: 'test' + (startId + i),
            longitude: '$' + (startId + i),
            carspeed: 1,
            carmileage: "2018-20-22"
        });
    }
    return rows;
}

function initcurrent() {
    $.ajax({
        url: "http://localhost/car/dataProject/json/gather.json",
        type: "get",
        success: function(res) {
            console.log(res);
            createTable("#currentTable", "#toolbar_currentTable", res,
                "altitude", "altitude", "longitude", "carspeed", "carmileage", "true", "false",
                "海拔", "纬度", "经度", "发动机转速", "扭矩百分比",
                "false", "", "", "client")
        }
    });
}