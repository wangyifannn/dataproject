function createTable(boxname, toolbarid, res,
    row1, row2, row3, row4, row5, ifpage, ifrefresh,
    row1name, row2name, row3name, row4name, row5name,
    ifoperate, OperateEvents, OperateFormatter, pagetype, tit) {
    $(boxname).css({
        "position": "relative"
    });
    $(boxname).bootstrapTable('destroy');
    var t = $(boxname).bootstrapTable({
        data: res,
        toggle: "table",
        toolbar: toolbarid,
        sortable: false, //是否启用排序
        sortOrder: "asc", //排序方式
        search: false, //是否搜索查询
        showColumns: true, //是否显示所有的列
        showRefresh: false, //是否显示刷新按钮
        minimumCountColumns: 2, //最少允许的列数
        undefinedText: "空", //当数据为 undefined 时显示的字符
        clickToSelect: true, //是否启用点击选中行
        searchOnEnterKey: false, //设置为 true时，按回车触发搜索方法
        strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
        data_local: "zh-US", //表格汉化  
        showToggle: false, //是否显示切换视图（table/card）按钮
        undefinedText: "--", //当数据为 undefined 时显示的字符
        searchAlign: "right",
        uniqueId: "index",
        onlyInfoPagination: true,
        // sidePagination: pagetype, //分页方式：client客户端分页，server服务端分页（*）
        // pagination: ifpage, //是否显示分页（*）
        pagination: false, //是否显示分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        // pageSize: 2, //每页的记录行数（*）
        // pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
        sidePagination: "client", //分页方式：client客户端分页，server服务端分页（*）
        // queryParams: function(params) { //自定义参数，这里的参数是传给后台的，我这是是分页用的
        //     return { //这里的params是table提供的  
        //         cp: params.offset, //从数据库第几条记录开始  
        //         ps: params.limit //找多少条  
        //     };
        // },
        columns: [{
                field: "checkbox",
                title: "全选",
                checkbox: true,
                align: 'center',
                sortable: true
            },
            {
                field: status,
                title: "序号",
                align: 'center',
                sortable: true,
                width: '5%',
                formatter: function(value, row, index) {
                    return index + 1;
                }
            },
            {
                field: row1,
                title: row1name,
                align: 'center',
                sortable: true
            },
            {
                field: row2,
                title: row2name,
                align: 'center',
                sortable: true,
                formatter: function(value, row, index) {
                    // console.log(value);
                    if (value.indexOf("http") == -1) {
                        return value;
                    } else {
                        return '<a href="' + value + '" download="文件名" title="点击下载文件">' + value + '</a>';
                    }
                }
            },
            {
                field: row3,
                title: row3name,
                align: 'center',
                sortable: true
            },
            {
                field: row4,
                title: row4name,
                align: 'center',
                sortable: true
            },
            {
                field: row5,
                title: row5name,
                align: 'center',
                sortable: true
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: OperateEvents,
                formatter: OperateFormatter
            }
        ]
    });
    t.on('load-success.bs.table', function(data) { //table加载成功后的监听函数  
        console.log("load success");
        $(".pull-right").css("display", "block");
    });
    // 隐藏表格中的某一列
    if (ifoperate == "false") {
        $(boxname).bootstrapTable('hideColumn', 'operate');
    } else {}
}
// var colArr = [];

// function createTable(boxname, toolbarid, res,
//     row1, row2, row3, row4, row5, ifpage, ifrefresh,
//     row1name, row2name, row3name, row4name, row5name,
//     ifoperate, OperateEvents, OperateFormatter, pagetype, tit) {
//     $(boxname).css({
//         "position": "relative"
//     });
//     $(boxname).bootstrapTable('destroy');
//     var t = $(boxname).bootstrapTable({
//         url: res,
//         method: 'get',
//         dataType: "json",
//         // data: res,
//         toggle: "table",
//         toolbar: toolbarid,
//         sortable: false, //是否启用排序
//         sortOrder: "asc", //排序方式

//         search: false, //是否搜索查询
//         showColumns: true, //是否显示所有的列
//         showRefresh: false, //是否显示刷新按钮
//         minimumCountColumns: 2, //最少允许的列数
//         undefinedText: "空", //当数据为 undefined 时显示的字符
//         clickToSelect: true, //是否启用点击选中行
//         searchOnEnterKey: false, //设置为 true时，按回车触发搜索方法
//         strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
//         data_local: "zh-US", //表格汉化  
//         showToggle: false, //是否显示切换视图（table/card）按钮
//         undefinedText: "--", //当数据为 undefined 时显示的字符
//         searchAlign: "right",
//         uniqueId: "index",
//         onlyInfoPagination: true,
//         // sidePagination: pagetype, //分页方式：client客户端分页，server服务端分页（*）
//         // pagination: ifpage, //是否显示分页（*）
//         pagination: true, //是否显示分页（*）
//         pageNumber: 1, //初始化加载第一页，默认第一页
//         pageSize: 2, //每页的记录行数（*）
//         pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
//         sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
//         queryParams: function(params) { //自定义参数，这里的参数是传给后台的，我这是是分页用的
//             return { //这里的params是table提供的  
//                 page: params.offset + 1, //从数据库第几条记录开始  
//                 size: params.limit //找多少条  
//             };
//         },
//         onLoadSuccess: function(item) { //加载成功时执行  
//             console.log("加载成功");
//             console.log(item);
//             // $.each(arr, function(i, item) {
//             //     colArr.push({ "field": item.colname, "title": item.colalias, "width": 100, "sortable": true });
//             // });
//             var pageData = item.pageData;
//             // $.each(pageData, function(i, item) {
//             var item = pageData[0];
//             console.log(item);
//             //     colArr.push({
//             //         "field": item.vSn,
//             //         "title": item.carType,
//             //         "width": 100,
//             //         "sortable": true
//             //     });
//             for (var k in item) {
//                 console.log(k, item[k]);
//                 colArr.push({
//                     "field": k,
//                     "title": "列名",
//                     "width": 100,
//                     "sortable": true
//                 });
//             }
//             // })

//             console.log(colArr);
//         },
//         columns: colArr
//             // columns: [{
//             //         field: "checkbox",
//             //         title: "全选",
//             //         checkbox: true,
//             //         align: 'center',
//             //         sortable: true
//             //     },
//             //     {
//             //         field: status,
//             //         title: "序号",
//             //         align: 'center',
//             //         sortable: true,
//             //         width: '5%',
//             //         formatter: function(value, row, index) {
//             //             return index + 1;
//             //         }
//             //     },
//             //     {
//             //         field: row1,
//             //         title: row1name,
//             //         align: 'center',
//             //         sortable: true
//             //     },
//             //     {
//             //         field: row2,
//             //         title: row2name,
//             //         align: 'center',
//             //         sortable: true,
//             //         formatter: function(value, row, index) {
//             //             // console.log(value);
//             //             if (value.indexOf("http") == -1) {
//             //                 return value;
//             //             } else {
//             //                 return '<a href="' + value + '" download="文件名" title="点击下载文件">' + value + '</a>';
//             //             }
//             //         }
//             //     },
//             //     {
//             //         field: row3,
//             //         title: row3name,
//             //         align: 'center',
//             //         sortable: true
//             //     },
//             //     {
//             //         field: row4,
//             //         title: row4name,
//             //         align: 'center',
//             //         sortable: true
//             //     },
//             //     {
//             //         field: row5,
//             //         title: row5name,
//             //         align: 'center',
//             //         sortable: true
//             //     },
//             //     {
//             //         field: 'operate',
//             //         title: '操作',
//             //         align: 'center',
//             //         events: OperateEvents,
//             //         formatter: OperateFormatter
//             //     }
//             // ]
//     });
//     t.on('load-success.bs.table', function(data) { //table加载成功后的监听函数  
//         console.log("load success");
//         $(".pull-right").css("display", "block");
//         // $(boxname).bootstrapTable({ "columns": colArr })

//     });
//     // 隐藏表格中的某一列
//     if (ifoperate == "false") {
//         $(boxname).bootstrapTable('hideColumn', 'operate');
//     } else {}
// }
// 绑定列表
function createBindTable(boxname, toolbarid, res,
    row1, row2, row3, row4, row5, ifpage, ifrefresh,
    row1name, row2name, row3name, row4name, row5name,
    ifoperate, OperateEvents, OperateFormatter, pagetype, tit) {
    $(boxname).css({
        "position": "relative"
    });
    $(boxname).bootstrapTable({
        data: res,
        toggle: "table",
        toolbar: toolbarid,
        pagination: false, //是否显示分页（*）
        sortable: false, //是否启用排序
        sortOrder: "asc", //排序方式
        sidePagination: pagetype, //分页方式：client客户端分页，server服务端分页（*）
        // pageNumber: 1, //初始化加载第一页，默认第一页
        // pageSize: 10, //每页的记录行数（*）
        // pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
        search: false, //是否搜索查询
        showColumns: true, //是否显示所有的列
        showRefresh: false, //是否显示刷新按钮
        minimumCountColumns: 2, //最少允许的列数
        clickToSelect: true, //是否启用点击选中行
        searchOnEnterKey: false, //设置为 true时，按回车触发搜索方法
        strictSearch: false, //设置为 true启用全匹配搜索， 否则为模糊搜索
        showToggle: false, //是否显示切换视图（table/card）按钮
        searchAlign: "right",
        uniqueId: "index",
        onlyInfoPagination: true,
        onLoadSuccess: function(res) { //加载成功时执行  
            console.log("加载成功");
            console.log(res);
        },
        columns: [{
                field: "checkbox",
                title: "全选",
                checkbox: true,
                align: 'center',
                sortable: true
            },
            {
                field: status,
                title: "序号",
                align: 'center',
                sortable: true,
                width: '5%',
                formatter: function(value, row, index) {
                    return index + 1;
                }
            },
            {
                field: row2,
                title: row2name,
                align: 'center',
                sortable: true
            },
            {
                field: row3,
                title: row3name,
                align: 'center',
                sortable: true
            },
            {
                field: row4,
                title: row4name,
                align: 'center',
                sortable: true
            },
            {
                field: row5,
                title: row5name,
                align: 'center',
                sortable: true
            },
            {
                field: 'operate',
                title: '操作',
                align: 'center',
                events: OperateEvents,
                formatter: OperateFormatter
            }
        ]
    });
    // 隐藏表格中的某一列
    // console.log(ifoperate);
    if (ifoperate == "false") {
        // console.log(false);
        // $(boxname).bootstrapTable('hideColumn', 'checkbox');
        $(boxname).bootstrapTable('hideColumn', 'operate');
    } else {
        // console.log("ifoperate==" + ifoperate);
        // console.log(OperateEvents);
    }
}