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
                    initTerAndCar(allurl + "/data-management/vehicle/findVehicleByTerminalIsNotNull.json", "getUserCar");
                } else if (name == "cancel_bind" || name == "cancel_bind_row") { //解除绑定
                    initTerAndCar(allurl + "/data-management/vehicle/findVehicleByTerminalIsNotNull.json", "getbind");
                } else if (name == "delTer") { //删除终端
                    initTerAndCar(allurl + "/data-management/customer/findTerminalByCustomer.json", "getUserTer");
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
                    initTerAndCar(allurl + "/data-management/terminal/query.json", "getUserTer", { page: 1, size: 10 });
                } else if (name == "subcar_btn" || name == "editcar_btn") {
                    initTerAndCar(allurl + "/data-management/vehicle/pageQuery.json", "getUserCar", { page: 1, size: 10 });
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
            var ifdata = "today-date";
            optstyle = '<input type="text" class="' + ifdata + '" lay-key="1"> '
        } else if (filArr[i].type == "select") {
            var ifdata = "";
            var options = "";
            for (var j = 0; j < filArr[i].option.length; j++) {
                options += '<option value="' + filArr[i].option[j].name + '" name="' + filArr[i].option[j].name + '">' + filArr[i].option[j].name + '</option>';
            }
            optstyle = '<select class="">' + options + '</select>'
        } else if (filArr[i].type == "text") {
            var ifdata = "";
            optstyle = '<input type="text" name="' + filArr[i].inputName + '" class="form-control ' + ifdata + '" > '
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
            optstyle = '<select class="form-control col-sm-7 ' + filArr[i].inputName + '">' + options + '</select> <label class="col-sm-5 tip_style ">' + filArr[i].must + '</label>'
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
function initTerAndCar(url, portname, dat) {
    $.ajax({
        url: url, //查询当前用户绑定的终端
        type: "get",
        data: dat,
        contentType: 'application/json;charset=UTF-8', //contentType很重要 
        crossDomain: true, //cors解决post跨域问题，后台要进行相关配置
        success: function(res) {
            console.log(res);
            if (res.ret == false) {
                $(".pagination-detail .pagination-info").html("");
            }
            if (portname == "getUserTer" || portname == "searchTer") { //获取用户终端
                createTable("#terTable", "#toolbar_terTable", res.pageData,
                    "num", "barcode", "vin", "addtime", "remark", true, "false",
                    "终端编号", "终端条形码", "VIN", "创建时间", "备注",
                    "false", "", "", "client");
                $(".pagination-detail .pagination-info").html("共" + res.totalCount + "条数据");
                // 自定义分页
                console.log(dat);
                var drivermaxPage = Math.ceil(res.totalCount / dat.size);
                if (drivermaxPage >= 9) {
                    dclickPagings(drivermaxPage, ".TerInfo_table");
                } else {
                    dclickPaging(drivermaxPage, dat.page - 1, ".TerInfo_table");
                }
            } else if (portname == "getUserCar" || portname == "searchCar") { //获取用户车辆
                createTable("#carTable", "#toolbar_carTable", res.pageData,
                    "vSn", "carType", "vCarSn", "remark", "addtime", "true", "false",
                    "车辆编号", "车辆类型", "车牌号", "备注", "添加日期",
                    "false", "", "", "client");
                $(".pagination-detail .pagination-info").html("共" + res.totalCount + "条数据");
                // 自定义分页
                console.log(dat);
                var drivermaxPage = Math.ceil(res.totalCount / dat.size);
                if (drivermaxPage >= 9) {
                    dclickPagings(drivermaxPage, ".carInfo_table");
                } else {
                    dclickPaging(drivermaxPage, dat.page - 1, ".carInfo_table");
                }
            } else if (portname == "getAllTer") { //获取所有终端列表
                createTable("#modalTable", "#toolbar_modalTable", res.pageData,
                    "num", "barcode", "vin", "addtime", "remark", "true", "false",
                    "终端编号", "终端条形码", "VIN", "创建时间", "备注",
                    "false", "", "", "client");
                $(".pagination-detail .pagination-info").html("共" + res.totalCount + "条数据");
            } else if (portname == "getbind" || portname == "searchBind") { //绑定的车辆和终端列表
                createTable("#bindTable", "#toolbar_bindTable", res.rows,
                    "num", "vSn", "barcode", "vin", "vCarSn", "true", "false",
                    "终端编号", "车辆编号", "终端条形码", "VIN", "车牌号",
                    "true", "bindOperateEvents", "bindOperateFormatter", "client");
                if (res.totalCount != "") {
                    $(".pagination-detail .pagination-info").html("共" + res.total + "条数据");
                }
                // bind_con
                var drivermaxPage = Math.ceil(res.totalCount / dat.size);
                if (drivermaxPage >= 9) {
                    dclickPagings(drivermaxPage, ".bind_con");
                } else {
                    dclickPaging(drivermaxPage, dat.page - 1, ".bind_con");
                }
            } else if (portname == "getFile") { //文件下载列表
                createTable("#fileTable", "#toolbar_fileTable", res,
                    "name", "url", "uploadTime", "size", "remark", "true", "false",
                    "文件名", "下载链接", "创建时间", "大小", "说明",
                    "false", "", "", "server");
            } else if (portname == "#gather_model .getvSn") { //采集数据：可供选择的车辆编号
                var options = "";
                for (var j = 0; j < res.length; j++) {
                    options += '<option value="' + res[j].vSn + '">' + res[j].vSn + '</option>';
                }
                $(portname).html(options);
            } else if (portname == "#addcar_model .vSn") { //绑定终端：可供选择的车辆编号
                var options = "";
                for (var j = 0; j < res.length; j++) {
                    options += '<option value="' + res[j].vSn + '">' + res[j].vSn + '</option>';
                }
                console.log(options);

                $(portname).html(options);
            } else if (portname == "#addcar_model .vin") { //绑定终端：可供选择终端
                var options = "";
                console.log("绑定终端：可供选择终端" + res);
                console.log(res);
                for (var j = 0; j < res.length; j++) {
                    options += '<option value="' + res[j].vin + '">' + res[j].vin + '</option>';
                }
                console.log(options);

                $(portname).html(options);
            }
        },
        error: function(params) {
            toastr.error('程序内部错误', "错误", messageOpts);
        }
    })
}
// 分页——————————————————————————————————————————————————————————————————————————————————————————————
function dclickPagings(drivermaxPage, pagename) {
    var lis = "";
    for (var p = 1; p < 7 + 1; p++) {
        lis += "<li>" + p + "</li>";
    }
    $(".driverpage ul").html(lis);
    if (driverpageNum >= 1 && driverpageNum <= 3) {
        $(pagename + " .driverpage li").eq(0).html("1");
        $(pagename + " .driverpage li").eq(1).html("2");
        $(pagename + " .driverpage li").eq(2).html("3");
        $(pagename + " .driverpage li").eq(3).html("4");
        $(pagename + " .driverpage li").eq(4).html("…");
        $(pagename + " .driverpage li").eq(5).html(drivermaxPage - 1);
        $(pagename + " .driverpage li").eq(6).html(drivermaxPage);
        $(pagename + " .driverpage li").eq(driverpageNum - 1).addClass("cur").siblings().removeClass("cur");
    } else if (driverpageNum <= drivermaxPage && driverpageNum >= drivermaxPage - 2) {
        $(pagename + " .driverpage li").eq(0).html("1");
        $(pagename + " .driverpage li").eq(1).html("2");
        $(pagename + " .driverpage li").eq(2).html("…");
        $(pagename + " .driverpage li").eq(3).html(drivermaxPage - 3);
        $(pagename + " .driverpage li").eq(4).html(drivermaxPage - 2);
        $(pagename + " .driverpage li").eq(5).html(drivermaxPage - 1);
        $(pagename + " .driverpage li").eq(6).html(drivermaxPage);
        $(pagename + " .driverpage li").eq(driverpageNum - drivermaxPage - 1).addClass("cur").siblings().removeClass("cur");
    } else {
        $(pagename + " .driverpage li").eq(0).html("1");
        $(pagename + " .driverpage li").eq(1).html("…");
        $(pagename + " .driverpage li").eq(2).html(driverpageNum - 1);
        $(pagename + " .driverpage li").eq(3).html(driverpageNum);
        $(pagename + " .driverpage li").eq(4).html(driverpageNum + 1);
        $(pagename + " .driverpage li").eq(5).html("…");
        $(pagename + " .driverpage li").eq(6).html(drivermaxPage);
        $(pagename + " .driverpage li").eq(3).addClass("cur").siblings().removeClass("cur");
    }
    $(pagename + " .driverpage li").click(function(event) {
        if ($(this).html() == "…") {
            return;
        }
        //改变信号量
        driverpageNum = parseInt($(this).html());
        if (pagename == ".carInfo_table") {
            initTerAndCar(allurl + "/data-management/vehicle/pageQuery.json", "getUserCar", { page: driverpageNum, size: 10 });
        } else if (pagename == ".TerInfo_table") {
            initTerAndCar(allurl + "/data-management/terminal/query.json", "getUserTer", { page: driverpageNum, size: 10 });
        } else if (pagename == ".bind_con") {
            initTerAndCar(allurl + "/data-management/terminal/vehicleAndTerminal.json", "getbind", { page: driverpageNum, size: 10 });
        }
        dclickPagings(drivermaxPage, pagename);
        //更新URL的hash
        window.location.hash = driverpageNum;

    });
}


function dclickPaging(drivermaxPage, i, pagename) {
    $(pagename + " .driverpage ul").html("");
    var lis = "";
    for (var p = 1; p < drivermaxPage + 1; p++) {
        lis += "<li>" + p + "</li>";
    }
    $(pagename + " .driverpage ul").html(lis);
    $(pagename + " .driverpage li").eq(i).addClass("cur").siblings().removeClass("cur");
    // 点击时间
    $(pagename + " .driverpage li").click(function(event) {
        //改变信号量
        driverpageNum = parseInt($(this).html());
        //调用ajax，切换分页按钮样式
        // loadDriverList(driverpageNum, 10);
        if (pagename == ".carInfo_table") {
            initTerAndCar(allurl + "/data-management/vehicle/pageQuery.json", "getUserCar", { page: driverpageNum, size: 10 });
        } else if (pagename == ".TerInfo_table") {
            initTerAndCar(allurl + "/data-management/terminal/query.json", "getUserTer", { page: driverpageNum, size: 10 });
        } else if (pagename == ".bind_con") {
            initTerAndCar(allurl + "/data-management/terminal/vehicleAndTerminal.json", "getbind", { page: driverpageNum, size: 10 });
        }
        dclickPaging(drivermaxPage, driverpageNum - 1, pagename);
        //更新URL的hash
        window.location.hash = driverpageNum;
    });
}
// function initTerAndCar(url, portname) {
//     // $.ajax({
//     //     url: url, //查询当前用户绑定的终端
//     //     type: "get",
//     //     contentType: 'application/json;charset=UTF-8', //contentType很重要 
//     //     crossDomain: true, //cors解决post跨域问题，后台要进行相关配置
//     //     success: function(res) {
//     //         console.log(res);
//     if (portname == "getUserTer") { //获取用户终端
//         createTable("#terTable", "#toolbar_terTable", url,
//             "num", "barcode", "vin", "addtime", "remark", true, "false",
//             "终端编号", "终端条形码", "VIN", "创建时间", "备注",
//             "false", "", "", "client");

//     } else if (portname == "getUserCar") { //获取用户车辆
//         createTable("#carTable", "#toolbar_carTable", url,
//             "vSn", "carType", "vCarSn", "remark", "addtime", "true", "false",
//             "车辆编号", "车辆类型", "车牌号", "备注", "添加日期",
//             "false", "", "", "client");
//     } else if (portname == "getAllTer") { //获取所有终端列表
//         createTable("#modalTable", "#toolbar_modalTable", url,
//             "num", "barcode", "vin", "addtime", "remark", "true", "false",
//             "终端编号", "终端条形码", "VIN", "创建时间", "备注",
//             "false", "", "", "client");
//     } else if (portname == "getbind") { //绑定的车辆和终端列表
//         createTable("#bindTable", "#toolbar_bindTable", url,
//             "id", "name", "brand", "status", "data", "true", "false",
//             "终端编号", "终端条形码", "车辆编号", "VIN", "在线状态",
//             "true", "bindOperateEvents", "bindOperateFormatter", "client");
//     } else if (portname == "getFile") { //文件下载列表
//         createTable("#fileTable", "#toolbar_fileTable", url,
//             "name", "url", "uploadTime", "size", "remark", "true", "false",
//             "文件名", "下载链接", "创建时间", "大小", "说明",
//             "false", "", "", "server");
//     } else if (portname == "#gather_model .getvSn") {
//         var options = "";
//         for (var j = 0; j < res.length; j++) {
//             options += '<option value="' + res[j].vSn + '">' + res[j].vSn + '</option>';
//         }
//         $(portname).html(options);
//     }
//     //     },
//     //     error: function(params) {
//     //         toastr.error('程序内部错误', "错误", messageOpts);
//     //     }
//     // })
// }