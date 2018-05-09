// 车辆信息查询条件
var carInfo_item = [
    { "name": "车辆编号", "type": "text", "inputName": "vsn" },
    { "name": "VIN", "type": "data", "inputName": "vin" },
    { "name": "城市", "type": "select", "inputName": "city" },
    {
        "name": "车辆类型",
        "type": "select",
        "inputName": "cartype",
        "option": [{ id: 1, name: "轿车" }, { id: 2, name: "客车" }, { id: 3, name: "小型客车" }]
    },
    { "name": "动力类型", "type": "select", "inputName": "powertype" },
    { "name": "车辆用途", "type": "select", "inputName": "caruse" }
];



//车辆信息
function initCar() {
    $.ajax({
        url: "http://localhost/car/dataProject/json/d.json",
        type: "get",
        success: function(res) {
            console.log(res);
            createTable("#carTable", "#toolbar_carTable", res,
                "id", "name", "brand", "status", "data", "true", "false",
                "车辆编号", "车辆类型", "终端VIN", "车辆品牌", "车辆用途",
                "false", "", "", "client");
        }
    })
}
initCar();
// 模态框，新增
$("#add_carinfo").click(function() {
    $("#addcar_model").modal();
});
// 编辑
$("#edit_carinfo").click(function() {
    var editcar = $("#carTable").bootstrapTable('getSelections');
    deletAll(editcar, "editcarInfo");
});
// 删除
$("#del_allcar").click(function() {
    var a = $("#carTable").bootstrapTable('getSelections');
    deletAll(a, "del_allcar");
});

// 新增车辆
var addcarInfo = [
    // { "name": "城市", "type": "select", "inputName": "city" },
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    {
        "name": "车辆类型",
        "type": "select",
        "inputName": "cartype",
        "must": "*",
        "option": [{ id: 1, name: "轿车" }, { id: 2, name: "客车" }, { id: 3, name: "小型客车" }]
    },
    { "name": "车牌号", "type": "text", "inputName": "carid", "must": "*" },
    { "name": "动力类型", "type": "select", "inputName": "powertype", "must": "" },

    // { "name": "车辆用途", "type": "select", "inputName": "caruse" },
    // { "name": "燃料类型", "type": "text", "inputName": "fuletype" },
    // { "name": "车辆品牌", "type": "text", "inputName": "carbrand" },
    // { "name": "品牌车型", "type": "text", "inputName": "brandtype" },
    // { "name": "VIN", "type": "data", "inputName": "vin" }
];

creatSelect(carInfo_item, "#CarInfo .carInfo_top .form-inline", "carinfo_s_btn");
creatForm(addcarInfo, "#addcar_model .modal-body .form-horizontal", "subcar_btn");