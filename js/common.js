lay('.today-date').each(function() {
    laydate.render({
        elem: this,
        trigger: 'click',
        format: 'yyyy-MM-dd',
        value: null,
        theme: '#041473'
    });
});
var allurl = window.allurl = "http://192.168.0.222:8080";
// 登录判断
var islogin = localStorage.getItem("successUser");
islogin = JSON.parse(islogin);
console.log(islogin);
if (islogin != null) {
    $(".user .username").html(islogin.username + '<i class="glyphicon glyphicon-chevron-down"></i>');
} else {
    console.log("没有登录");
}
// -------------------------------------------------
var bar = $(".bar");
var menuli = $("#myTab li");
for (var i = 0; i < menuli.length; i++) {
    menuli[i].index = i;
    menuli.click(function() {
        $(this).addClass("current").siblings().removeClass("current");
        bar.animate({ top: this.index * 47 }, 100);
    })
}
// toggle - sidebar
$("#toggle-sidebar").click(function() {
    $("#sidebar").toggleClass("toggled");
    $(".page-content").toggleClass("toggled");
});

/**
 * 获取hash参数
 */
function getHashParameter(key) {
    var params = getHashParameters();
    return params[key];
}

function getHashParameters() {
    var arr = (location.hash || "").replace(/^\#/, '').split("&");
    var params = {};
    for (var i = 0; i < arr.length; i++) {
        var data = arr[i].split("=");
        if (data.length == 2) {
            params[data[0]] = data[1];
        }
    }
    return params;
}
// 表单重置
function myformReset() {
    $(':input', 'form')
        .not(':button,:radio,:submit') // 去除不需要重置的input类型
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
};
// 设置消息提示框的配置xinxi
toastr.options = messageOpts;
//设置显示配置
var messageOpts = {
    "closeButton": true, //是否显示关闭按钮
    "debug": false, //是否使用debug模式
    "positionClass": "toast-top-center", //弹出窗的位置
    "onclick": null,
    "showDuration": "300", //显示的动画时间
    "hideDuration": "1000", //消失的动画时间
    "timeOut": "1500", //展现时间
    "extendedTimeOut": "80000", //加长展示时间
    "showEasing": "swing", //显示时的动画缓冲方式
    "hideEasing": "linear", //消失时的动画缓冲方式
    "showMethod": "fadeIn", //显示时的动画方式
    "hideMethod": "fadeOut" //消失时的动画方式
};

// checkbox 反选
function Invert(btn, name) {
    $(btn).click(function() {
        $(name + ' input[name="checkbox"]').prop("checked", this.checked);
    });
    var $subBox = $(name + " input[name='checkbox']");
    $subBox.click(function() {
        $(btn).attr("checked", $subBox.length == $(name + " input[name='checkbox']:checked").length ? true : false);
    });
}

// 删除所有接口
function deletAll(a, name) {
    // var a = $("#carLogTable").bootstrapTable('getSelections');
    var delArr = [];
    var delString = "";
    var delata = {};
    if (a.length >= 1) {
        for (var i = 0; i < a.length; i++) {
            delArr.push(a[i].id)
        }
        delString = delArr.join(",");
        delata = {
            "ids": delString
        };
        if (name == "editcarInfo") { //编辑更新车辆信息
            // 编辑车辆信息
            $("#addcar_model").modal();
            $("#addcar_model #myModalLabel").html("编辑车辆信息");
            creatForm(addcarInfo, "#addcar_model .modal-body .form-horizontal", "subcar_btn");
        } else if (name == "del_allcar") { //删除车辆
            $("#ter_del_model").modal();
            $(".modal_del").click(function() { //点击确认删除 ：是
                delPort(allurl + "/data-management/vehicle/delete.json", delata, "post",
                    name, "删除车辆", "删除车辆失败", "删除车辆成功");
                $(this).attr({ "data-dismiss": "modal", "aria-label": "Close" });
            })
        } else if (name == "editTer") { //编辑终端，更新信息
            // 编辑车辆信息
            $("#addcar_model").modal();
            $("#addcar_model #myModalLabel").html("编辑车辆信息");
            creatForm(addcarInfo, "#addcar_model .modal-body .form-horizontal", "subcar_btn");
        } else if (name == "delTer") { //删除终端
            $("#ter_del_model").modal();
            // 确定删除
            $(".modal_del").click(function() {
                delPort(allurl + "/data-management/terminal/delete.json", delata, "get", name,
                    "删除终端", "删除终端失败", "删除终端成功");
            })
        } else if (name == "cancel_bind") { //解除绑定
            $("#ter_del_model").modal();
            // 确定删除
            $(".modal_del").click(function() {
                delPort(allurl + "/data-management/terminal/terminalRemoveVehicle.json", delata, "post", name,
                    "解除绑定", "解除绑定失败", "解除绑定成功");
            })

        } else {
            toastr.warning('最少选中一行', '提示', messageOpts);
        }
    }
}
// 删除接口
function delPort(url, dat, type, name, tit, filToa, sucToa) {
    $.ajax({
        url: url,
        type: type,
        data: dat,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success(sucToa, tit, messageOpts);
                if (name == "cancel_ter") {
                    initTer();
                } else if (name == "del_allcar") {
                    initCar();
                } else if (name == "cancel_bind" || name == "cancel_bind_row") { //解除绑定
                    initTerAndCar(allurl + "/data-management/vehicle/findVehicleByTerminalIsNotNull.json", "getbind");
                } else if (name == "cancel_bind") { //删除终端
                    initTerAndCar(allurl + "/data-management/customer/findTerminalAndVehicleByCustomer.json", "getUserTer");
                } else if (name == "sumCarList") {
                    loadsumCarList("");
                }
            } else {
                toastr.warning(filToa, tit, messageOpts);
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', tit, messageOpts);
        }
    })
}

// 通用数据提交接口
function subData(url, data, type, name) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        "dataType": "jsonp", //数据类型为jsonp  
        "jsonp": "jsonpCallback", //服务端用于接收callback调用的function名的参数
        success: function(res) {
            console.log(res);
            if (res.ret == true) {
                toastr.success(res.msg, "提示", messageOpts);
                console.log(name);
                if (name == "subTer_btn" || name == "editTer_btn") {
                    initTerAndCar(allurl + "/data-management/customer/findTerminalByCustomer.json", "getUserTer");
                } else if (name == "subcar_btn" || name == "editcar_btn") {
                    initTerAndCar(allurl + "/data-management/customer/findTerminalAndVehicleByCustomer.json", "getUserCar");
                } else if (name == "tempcarlist") {
                    loadCarList(JSON.stringify({
                        "vSn": null
                    }));
                } else if (name == "sumCarList") {
                    loadsumCarList("");
                }

            } else {
                toastr.warning(res.msg, "提示", messageOpts);
                return;
            }
        },
        "error": function(res) {
            toastr.error('程序内部错误', tit, messageOpts);
        }
    })
}
// 表单查询选项封装  inline型
function creatSelect(filArr, name, btnname) {
    var ss = "";
    var optstyle = ""
    for (var i = 0; i < filArr.length; i++) {
        if (filArr[i].type == "data") {
            var ifdata = "much-date";
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control ' + ifdata + '" value="" typeholder="' + filArr[i].type + '"> '
        } else if (filArr[i].type == "select") {
            var ifdata = "";
            optstyle = '<select><option value="1" name="' + filArr[i].inputName + '">' + filArr[i].inputName + '</option><option value="2" name="' + filArr[i].inputName + '">选项2</option></select> '
        } else if (filArr[i].type == "text") {
            var ifdata = "";
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control ' + ifdata + '" value="" typeholder="' + filArr[i].type + '"> '
        }
        ss += '<div class="form-group">' +
            '<label for="exampleInputName2">' + filArr[i].name + '：</label>' +
            '<span>' + optstyle + '</span>' +
            '</div>'
    }
    ss += '<button type="button" style="margin-left:20px;" class="btn btn-default my_btn ' + btnname + '">查询</button>';
    $(name).html(ss);
};
// 表单查询选项封装  even_style型
function creatForm(filArr, name, btnname) {
    var ss = "";
    var optstyle = ""
    for (var i = 0; i < filArr.length; i++) {
        if (filArr[i].type == "data") {
            var ifdata = "much-date";
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control col-sm-7 ' + ifdata + '" value="" typeholder="' + filArr[i].type + '"> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        } else if (filArr[i].type == "select") {
            var ifdata = "";
            var options = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                options += '<option value="' + filArr[i].option[j].name + '" name="' + filArr[i].option[j].name + '">' + filArr[i].option[j].name + '</option>';
            }
            optstyle = '<select class="form-control col-sm-7">' + options + '</select> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        } else if (filArr[i].type == "text") {
            var ifdata = "";
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control col-sm-7 ' + ifdata + '" value="" typeholder="' + filArr[i].type + '"> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
        }
        ss += '<div class="form-group">' +
            '<label class="col-sm-4 control-label">' + filArr[i].name + '：</label>' +
            '<div class="col-sm-6">' + optstyle + '</div>' +
            '</div>'
    }
    ss += '<div class="form-group">' +
        '<div class="col-sm-offset-1 col-sm-6">' +
        '<button type="button" data-dismiss="" aria-label="" class="btn btn-default btn-primary ' + btnname + '">保存</button>' +
        '<button type="button" class="btn btn-default btn-primary" data-dismiss="modal">取消</button>' +
        '</div>' +
        '</div>';
    $(name).html(ss);
};
// form表单数据回显函数
function showTer(boxname, obj) {
    for (var k in obj) {
        $(boxname + ' input[name="' + k + '"]').val(obj[k]);
        $(boxname + ' option[name="' + obj[k] + '"]').attr("selected", "selected");
    }
}
// 面包屑导航/路径导航
function changBread(bread1, bread2) {
    breadHtml = "<ol class='breadcrumb'> <li><span>当前位置:&nbsp;&nbsp;&nbsp;车辆数据云系统&nbsp;&nbsp;&nbsp;</span>" + bread1 + " </li><li>" +
        bread2 + "</li> </ol>";
    $("#page_left_title").html(breadHtml);
}
changBread("车辆与终端", "车辆信息");

//查询用户绑定终端或车辆信息，及所有终端信息等
function initTerAndCar(url, portname) {
    $.ajax({
        url: url, //查询当前用户绑定的终端
        type: "get",
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true, //cors解决post跨域问题，后台要进行相关配置
        success: function(res) {
            console.log(res);
            if (portname == "getUserTer") { //获取用户终端
                createTable("#terTable", "#toolbar_terTable", res,
                    "num", "barcode", "vin", "addtime", "remark", true, "false",
                    "终端编号", "终端条形码", "VIN", "创建时间", "备注",
                    "false", "", "", "client");

            } else if (portname == "getUserCar") { //获取用户车辆
                createTable("#carTable", "#toolbar_carTable", res,
                    "vSn", "carType", "vCarSn", "remark", "addtime", "true", "false",
                    "车辆编号", "车辆类型", "车牌号", "备注", "添加日期",
                    "false", "", "", "client");
            } else if (portname == "getAllTer") { //获取所有终端列表
                createTable("#modalTable", "#toolbar_modalTable", res,
                    "num", "barcode", "vin", "addtime", "remark", "true", "false",
                    "终端编号", "终端条形码", "VIN", "创建时间", "备注",
                    "false", "", "", "client");
            } else if (portname == "getbind") {
                createTable("#bindTable", "#toolbar_bindTable", res,
                    "id", "name", "brand", "status", "data", "true", "false",
                    "终端编号", "终端条形码", "车辆编号", "VIN", "在线状态",
                    "true", "bindOperateEvents", "bindOperateFormatter", "client");
            }
        },
        error: function(params) {
            toastr.error('程序内部错误', "错误", messageOpts);
        }
    })
}