// 删除
$("#del_file").click(function() {
    var d = $("#fileTable").bootstrapTable('getSelections');
    deletAll(d, "delfile");
});