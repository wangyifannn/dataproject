function createTable(boxname, toolbarid, res,
    row1, row2, row3, row4, row5, ifpage, ifrefresh,
    row1name, row2name, row3name, row4name, row5name,
    ifoperate, OperateEvents, OperateFormatter, pagetype, tit) {
    $(boxname).css({
        "position": "relative"
    });
    $(boxname).bootstrapTable('destroy');

    $(boxname).bootstrapTable({
        data: res,
        toggle: "table",
        toolbar: toolbarid,
        pagination: ifpage, //是否显示分页（*）
        sortable: false, //是否启用排序
        sortOrder: "asc", //排序方式
        sidePagination: pagetype, //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 20, //每页的记录行数（*）
        pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
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