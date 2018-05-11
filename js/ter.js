// 查询条件
var terInfo_item = [
    { "name": "终端编号", "type": "text", "inputName": "num" },
    { "name": "终端条形码", "type": "text", "inputName": "barcode" },
    { "name": "VIN", "type": "text", "inputName": "vin" }
];
// 新增终端
var addTerInfo = [
    { "name": "终端编号", "type": "text", "inputName": "num", "must": "*" },
    { "name": "终端条形码", "type": "text", "inputName": "barcode", "must": "*" },
    { "name": "VIN", "type": "text", "inputName": "vin", "must": "*" },
    { "name": "备注", "type": "text", "inputName": "remark", "must": "" },
];

creatSelect(terInfo_item, "#TerInfo .TerInfo_top .form-inline", "terinfo_s_btn");

// 初始化显示当前用户绑定的终端
// 所有终端
$("#all_ter").click(function() {
    $("#table_model").modal();
    initTerAndCar(allurl + "/data-management/terminal/allTerminal.json", "getAllTer");
});
// 模态框，新增
$("#addTer").click(function() {
    $("#addcar_model").modal();
    $("#addcar_model #myModalLabel").html("新增终端信息");
    creatForm(addTerInfo, "#addcar_model .modal-body .form-horizontal", "subTer_btn");
    console.log($(".subTer_btn"));
    $(".subTer_btn").click(function() {
        var subter_data = $("#addcar_model .modal-body form").serialize();
        var subter_url = allurl + "/data-management/terminal/add.json";
        subData(subter_url, subter_data, "post", "subTer_btn")
    })

});
// 修改
$("#edit_ter").click(function() {
    var editTer = $("#terTable").bootstrapTable('getSelections');
    creatForm(addTerInfo, "#addcar_model .modal-body .form-horizontal", "editTer_btn");
    if (editTer.length == 1) {
        $("#addcar_model").modal();
        $("#addcar_model #myModalLabel").html("编辑终端信息");
        creatForm(addTerInfo, "#addcar_model .modal-body .form-horizontal", "editTer_btn");
        // 编辑时数据回显
        showTer("#addcar_model .modal-body", editTer[0]);

        $(".editTer_btn").click(function() {
            var subter_data = $("#addcar_model .modal-body form").serialize();
            var id = "&id=" + editTer[0].id;
            subter_data += id;
            var subter_url = allurl + "/data-management/terminal/update.json";
            subData(subter_url, subter_data, "post", "editTer_btn");
            $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
        })

    } else if (editTer.length < 1) {
        toastr.warning('请先选择要编辑的数据', '提示', messageOpts);
    } else {
        toastr.warning('只能选中一行', '提示', messageOpts);

    }

});
// 删除
$("#del_ter").click(function() {
    var d = $("#terTable").bootstrapTable('getSelections');
    deletAll(d, "delTer");
});
// 终端查询
$(".terinfo_s_btn").click(function() {
    var subcar_data = $("#TerInfo .TerInfo_top .form-inline").serialize();
    var subcar_url = allurl + "/data-management/terminal/query.json";
    initTerAndCar(subcar_url, "searchTer", subcar_data);
})