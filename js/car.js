// 车辆信息查询条件
var carInfo_item = [
    { "name": "车辆编号", "type": "text", "inputName": "vsn" },
    { "name": "VIN", "type": "text", "inputName": "vin" },
    { "name": "城市", "type": "select", "inputName": "city" },
    {
        "name": "车辆类型",
        "type": "select",
        "inputName": "carType",
        "option": [{ id: 1, name: "轿车" }, { id: 2, name: "客车" }, { id: 3, name: "小型客车" }]
    },
    { "name": "动力类型", "type": "select", "inputName": "powertype" },
    { "name": "车辆用途", "type": "select", "inputName": "caruse" }
];
// 新增车辆
var addcarInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    {
        "name": "车辆类型",
        "type": "select",
        "inputName": "carType",
        "must": "*",
        "option": [{ ename: "car", name: "轿车" }, { ename: "heavybus", name: "中重型客车" }, { ename: "LightTrucks", name: "轻型卡车" },
            { ename: "lightbus", name: "小型客车" }, { ename: "HeavyTrucks", name: "中重型货车" }
        ]
    },
    { "name": "车牌号", "type": "text", "inputName": "vCarSn", "must": "*" },
    { "name": "备注", "type": "text", "inputName": "remark", "must": "" }
];


// 模态框，新增
$("#add_carinfo").click(function() {
    $("#addcar_model #myModalLabel").html("新增车辆");
    $("#addcar_model").modal();
    creatForm(addcarInfo, "#addcar_model .modal-body .form-horizontal", "subcar_btn");
    console.log($(".subcar_btn"));
    $(".subcar_btn").click(function() {
        var subcar_data = $("#addcar_model .modal-body form").serialize();
        var opt = "&carType=" + $("#addcar_model option:selected").attr("name");
        subcar_data += opt;
        var subcar_url = allurl + "/data-management/vehicle/add.json";
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        subData(subcar_url, subcar_data, "post", "subcar_btn");

    })
});
// 编辑
$("#edit_carinfo").click(function() {
    var editcar = $("#carTable").bootstrapTable('getSelections');
    if (editcar.length == 1) {
        $("#addcar_model").modal();
        $("#addcar_model #myModalLabel").html("编辑车辆信息");
        creatForm(addcarInfo, "#addcar_model .modal-body form", "editCar_btn");
        showTer("#addcar_model .modal-body", editcar[0]); // 编辑时数据回显

        $(".editCar_btn").click(function() {
            var sub_data = $("#addcar_model .modal-body form").serialize();
            var id = "&id=" + editcar[0].id;
            sub_data += id;
            var sub_url = allurl + "/data-management/vehicle/update.json";
            subData(sub_url, sub_data, "post", "editcar_btn");
            $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        })

    } else if (editcar.length < 1) {
        toastr.warning('请先选择要编辑的数据', '提示', messageOpts);
    } else {
        toastr.warning('只能选中一行', '提示', messageOpts);
    }
});
// 删除
$("#del_allcar").click(function() {
    var a = $("#carTable").bootstrapTable('getSelections');
    deletAll(a, "del_allcar");
});


creatSelect(carInfo_item, "#CarInfo .carInfo_top .form-inline", "carinfo_s_btn");