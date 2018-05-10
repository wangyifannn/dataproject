// 查询所有绑定过终端的车辆http://192.168.0.222:8080/data-management/vehicle/findVehicleByTerminalIsNotNull.json
// 查询所有未绑定过终端的车辆：http://192.168.0.222:8080/data-management/vehicle/findByTerminalIsNull.json
// 绑定查询条件
var bind_item = [
    { "name": "车辆编号", "type": "text", "inputName": "vsn" },
    { "name": "终端编号", "type": "text", "inputName": "num" }
];
creatSelect(bind_item, "#carTerminalBind .bind_top .form-inline", "bindinfo_s_btn");

// 新增绑定
var addbindInfo = [
    { "name": "车辆编号", "type": "text", "inputName": "vSn", "must": "*" },
    { "name": "VIN", "type": "text", "inputName": "vin", "must": "*" }
];

function bindOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="cancel_bind_row" class="btn btn-default btn-sm" style="margin-right:15px;">解除绑定</button>',
        '<button type="button" id="changebind_bth" class="btn btn-default btn-sm" style="margin-right:15px;">修改</button>'
    ].join('');
}
// var terdelarr = [];
window.bindOperateEvents = {
    'click #changebind_bth': function(e, value, row, index) {},
    'click #cancel_bind_row': function(e, value, row, index) {
        $(this).parent().parent().remove();
        var cancel_dat = {
            vin: row.vin,
            vSn: row.vSn
        }
        delPort(allurl + "/data-management/terminal/terminalRemoveVehicle.json", cancel_dat, "post", "cancel_bind_row",
            "解除绑定", "解除绑定失败", "解除绑定成功");
    }
};

$("#add_bind").click(function() {
    creatForm(addbindInfo, "#addcar_model .modal-body .form-horizontal", "subbind_btn");
    $("#addcar_model").modal();
    $(".subbind_btn").click(function() {
        var subcar_data = $("#addcar_model .modal-body form").serialize();
        var subcar_url = allurl + "/data-management/terminal/relatedVehicle.json"; //终端关联车辆
        subData(subcar_url, subcar_data, "post", "subcar_btn");
        $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });

    })
});
// $("#cancel_bind").click(function() {
//     var a = $("#bindTable").bootstrapTable('getSelections');
//     // deletAll(a, "cancel_bind");
//     var cancel_dat = {
//         vin: row.vin,
//         vSn: row.vSn
//     };
//     // cancel_dat.push();
//     delPort(allurl + "/data-management/terminal/terminalRemoveVehicle.json", cancel_dat, "post", "cancel_bind_row",
//         "解除绑定", "解除绑定失败", "解除绑定成功");
// });