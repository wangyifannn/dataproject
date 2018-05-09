// 车辆信息查询条件
var terInfo_item = [
    { "name": "终端编号", "type": "text", "inputName": "vsn" },
    { "name": "终端条形码", "type": "text", "inputName": "vin" },
    { "name": "VIN", "type": "text", "inputName": "city" },
    { "name": "城市", "type": "select", "inputName": "city" },
    {
        "name": "车辆类型",
        "type": "select",
        "inputName": "cartype",
        "option": [{ id: 1, name: "轿车" }, { id: 2, name: "客车" }, { id: 3, name: "小型客车" }]
    },
    { "name": "车辆用途", "type": "select", "inputName": "caruse" }
];


creatSelect(terInfo_item, "#TerInfo .TerInfo_top .form-inline", "terinfo_s_btn");

//车辆信息
function initTer() {
    $.ajax({
        url: "http://localhost/car/dataProject/json/d.json",
        type: "get",
        success: function(res) {
            console.log(res);
            createTable("#terTable", "#toolbar_terTable", res,
                "id", "name", "brand", "status", "data", "true", "false",
                "终端编号", "终端条形码", "车辆编号", "CPU编号", "VIN",
                "false", "", "", "client");
        }
    })
}
initTer();
// 模态框，新增
$("#addTer").click(function() {
    $("#addcar_model").modal();
});
// 修改
$("#edit_ter").click(function() {
    var editTer = $("#terTable").bootstrapTable('getSelections');
    deletAll(editTer, "editTer");
});
// 删除
$("#del_ter").click(function() {
    var d = $("#terTable").bootstrapTable('getSelections');
    deletAll(d, "delTer");
});