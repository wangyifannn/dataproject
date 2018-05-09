/*
 * @Author: Larry
 * @Date:   2016-12-15 17:20:54
 * @Last Modified by:   qinsh
 * @Last Modified time: 2016-12-24 21:59:02
 * +----------------------------------------------------------------------
 * | LarryBlogCMS [ LarryCMS缃戠珯鍐呭绠＄悊绯荤粺 ]
 * | Copyright (c) 2016-2017 http://www.larrycms.com All rights reserved.
 * | Licensed ( http://www.larrycms.com/licenses/ )
 * | Author: qinshouwei <313492783@qq.com>
 * +----------------------------------------------------------------------
 */
layui.define(['element'], function(exports) {
    var element = layui.element(),
        $ = layui.jquery,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        module_name = 'navtab',
        globalTabIdIndex = 0,
        LarryTab = function() {
            this.config = {
                elem: undefined,
                closed: true
            };
        };
    var ELEM = {};
    /**
     * [鍙傛暟璁剧疆 options]
     */
    LarryTab.prototype.set = function(options) {
        var _this = this;
        $.extend(true, _this.config, options);
        return _this;
    };
    /**
     * [init 瀵硅薄鍒濆鍖朷
     * @return {[type]} [杩斿洖瀵硅薄鍒濆鍖栫粨鏋淽
     */
    LarryTab.prototype.init = function() {
        var _this = this;
        var _config = _this.config;
        if (typeof(_config.elem) !== 'string' && typeof(_config.elem) !== 'object') {
            layer.alert('Tab閫夐」鍗￠敊璇彁绀�: elem鍙傛暟鏈畾涔夋垨璁剧疆鍑洪敊锛屽叿浣撹缃牸寮忚鍙傝€冩枃妗PI.');
        }
        var $container;
        if (typeof(_config.elem) === 'string') {
            $container = $('' + _config.elem + '');
            //console.log($container);
        }
        if (typeof(_config.elem) === 'object') {
            $container = _config.elem;
        }
        if ($container.length === 0) {
            layer.alert('Tab閫夐」鍗￠敊璇彁绀�:鎵句笉鍒癳lem鍙傛暟閰嶇疆鐨勫鍣紝璇锋鏌�.');
        }
        var filter = $container.attr('lay-filter');
        if (filter === undefined || filter === '') {
            layer.alert('Tab閫夐」鍗￠敊璇彁绀�:璇蜂负elem瀹瑰櫒璁剧疆涓€涓猯ay-filter杩囨护鍣�');
        }
        _config.elem = $container;
        ELEM.titleBox = $container.children('ul.layui-tab-title');
        ELEM.contentBox = $container.children('div.layui-tab-content');
        ELEM.tabFilter = filter;
        return _this;
    };
    /**
     * [exists 鍦╨ayui-tab涓鏌ュ搴攍ayui-tab-title鏄惁瀛樺湪锛屽鏋滃瓨鍦ㄥ垯杩斿洖绱㈠紩鍊硷紝涓嶅瓨鍦ㄨ繑鍥�-1]
     * @param  {[type]} title [description]
     * @return {[type]}       [description]
     */
    LarryTab.prototype.exists = function(title) {
        var _this = ELEM.titleBox === undefined ? this.init() : this,
            tabIndex = -1;
        ELEM.titleBox.find('li').each(function(i, e) {
            var $em = $(this).children('em');
            if ($em.text() === title) {
                tabIndex = i;
            };
        });
        return tabIndex;
    };
    /**
     * [tabAdd 澧炲姞閫夐」鍗★紝濡傛灉宸插瓨鍦ㄥ垯澧炲姞this鏍峰紡]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    LarryTab.prototype.tabAdd = function(data) {
        var _this = this;
        var tabIndex = _this.exists(data.title);
        // 鑻ヤ笉瀛樺湪
        if (tabIndex === -1) {
            globalTabIdIndex++;
            var content = '<iframe src="' + data.href + '" data-id="' + globalTabIdIndex + '" class="larry-iframe"></iframe>';
            var title = '';
            // 鑻con鏈夊畾涔�
            if (data.icon !== undefined) {
                if (data.icon.indexOf('icon-') !== -1) {
                    title += '<i class="iconfont ' + data.icon + '"></i>';
                } else {
                    title += '<i class="layui-icon ">' + data.icon + '</i>';
                }
            }
            title += '<em>' + data.title + '</em>';
            if (_this.config.closed) {
                title += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + globalTabIdIndex + '">&#x1006;</i>';
            }
            //娣诲姞tab
            element.tabAdd(ELEM.tabFilter, {
                title: title,
                content: content
            });
            //iframe 鑷€傚簲
            ELEM.contentBox.find('iframe[data-id=' + globalTabIdIndex + ']').each(function() {
                $(this).height(ELEM.contentBox.height());
            });
            if (_this.config.closed) {
                //鐩戝惉鍏抽棴浜嬩欢
                ELEM.titleBox.find('li').children('i.layui-tab-close[data-id=' + globalTabIdIndex + ']').on('click', function() {
                    element.tabDelete(ELEM.tabFilter, $(this).parent('li').index()).init();
                });
            };
            //鍒囨崲鍒板綋鍓嶆墦寮€鐨勯€夐」鍗�
            element.tabChange(ELEM.tabFilter, ELEM.titleBox.find('li').length - 1);
        } else {
            element.tabChange(ELEM.tabFilter, tabIndex);
        }
    };
    var navtab = new LarryTab();
    exports(module_name, function(options) {
        return navtab.set(options);
    });

});