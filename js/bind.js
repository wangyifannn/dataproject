function initBind() {
    $.ajax({
        url: "http://localhost/car/dataProject/json/d.json",
        type: "get",
        success: function(res) {
            console.log(res);
            createTable("#bindTable", "#toolbar_bindTable", res,
                "id", "name", "brand", "status", "data", "true", "false",
                "终端编号", "终端条形码", "车辆编号", "VIN", "在线状态",
                "true", "bindOperateEvents", "bindOperateFormatter", "client");
        }
    })
}
initBind();

function bindOperateFormatter(value, row, index) {
    return [
        '<button type="button" id="delbind_btn" class="btn btn-default btn-sm" style="margin-right:15px;">删除</button>',
        '<button type="button" id="changebind_bth" class="btn btn-default btn-sm" style="margin-right:15px;">修改</button>'
    ].join('');
}
var terdelarr = [];
window.bindOperateEvents = {
    'click #changebind_bth': function(e, value, row, index) {

    },
    'click #delbind_btn': function(e, value, row, index) {
        terdelarr.length = 0;
        terdelarr.push(row.uid);
        console.log($(this).parent().parent());
        $(this).parent().parent().remove();
        // delPort("http://192.168.0.222:8080/car-management/tempcar/delete.action", row.id, "get", "cancelter",
        // "解除绑定", "解除绑定失败", "解除绑定成功");
    }
};

$("#add_bind").click(function() {
    $("#car_ter_model").modal();
})
$("#cancel_bind").click(function() {
    var a = $("#bindTable").bootstrapTable('getSelections');
    deletAll(a, "cancel_ter");
});