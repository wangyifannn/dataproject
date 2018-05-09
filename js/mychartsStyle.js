var e_macarons = {
    // 默认色板
    color: ['#3E993B', '#EE0306'], //动态折线的线条颜色
    backgroundColor: "#023a5f", //整体画布的背景色
    // 图表标题
    title: {
        show: false,
        itemGap: 8,
        padding: [290, 0],
        textStyle: {
            fontWeight: 'normal',
            color: 'red' // 主标题文字颜色
        }
    },

    // 图例
    legend: {
        itemGap: 8
    },

    // 值域
    dataRange: {
        itemWidth: 15,
        // color: ['#FF3BA4', '#b6a2de']
    },
    // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
    toolbox: {
        color: ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
        effectiveColor: '#ff4500',
        itemGap: 8
    },
    // 提示框
    tooltip: {
        backgroundColor: 'rgba(50,50,50,0.4)', // 提示背景颜色，默认为透明度为0.7的黑色
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: { // 直线指示器样式设置
                color: '#224fca'
            },
            crossStyle: {
                color: '#1c768d'
            },
            shadowStyle: { // 阴影指示器样式设置
                color: 'rgba(200,200,200,0.2)'
            }
        }
    },
    // 区域缩放控制器
    dataZoom: {
        dataBackgroundColor: '#efefff', // 数据背景颜色
        fillerColor: 'rgba(182,162,222,0.2)', // 填充颜色
        handleColor: '#008acd' // 手柄颜色
    },
    // 网格
    grid: {
        borderColor: 'gold'
    },
    // 类目轴
    categoryAxis: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#224fca'
                    // color: 'red'
            }
        },
        splitLine: { // 分隔线
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                // color: ['red']
                color: ["#1c768d", "#1c768d"]
            }
        },
        axisLabel: {
            // interval: 2,//坐标轴刻度标签的显示间隔，在类目轴中有效。
            margin: 15, //刻度标签与轴线之间的距离,默认8
            show: true,
            textStyle: {
                color: 'white' //x轴标签字体颜色
            }
        },
        axisTick: { //坐标轴刻度线长度和颜色
            length: 8,
            lineStyle: { // 属性lineStyle控制线条样式
                width: 2,
                color: '#224fca'
                    // color: 'red'
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#224fca'
            }
        },
        axisLabel: {
            margin: 15, //刻度标签与轴线之间的距离,默认8
            show: true,
            textStyle: {
                color: 'white' //y轴标签字体颜色
            }
        },
        splitArea: {
            // show: true
            // areaStyle: {
            //     color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            // }
            // areaStyle: {
            //     color: ['rgba(2,58,95,1)', 'rgba(2,58,95,1)']
            // }
        },
        splitLine: { // 分隔线
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#1c768d']
                    // color: ['green']
            }
        },
        axisTick: {
            show: true,
            length: 8,
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#224fca',
                width: 2
                    // color: 'red'
            }
        }
    },
    polar: {
        axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
                color: '#ddd'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.2)', 'rgba(200,200,200,0.2)']
            }
        },
        splitLine: {
            lineStyle: {
                color: '#ddd'
            }
        }
    },
    timeline: {
        lineStyle: {
            color: '#008acd'
        },
        controlStyle: {
            normal: { color: '#008acd' },
            emphasis: { color: '#008acd' }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
    },
    // 柱形图默认参数
    bar: {
        itemStyle: {
            normal: {
                borderRadius: 5
            },
            emphasis: {
                borderRadius: 5
            }
        }
    },
    // 折线图默认参数
    line: {
        smooth: true,
        symbol: 'emptyCircle', // 拐点图形类型
        symbolSize: 1 // 拐点图形大小
    },
    chord: {
        padding: 4,
        itemStyle: {
            normal: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            },
            emphasis: {
                lineStyle: {
                    width: 1,
                    color: 'rgba(128, 128, 128, 0.5)'
                },
                chordStyle: {
                    lineStyle: {
                        width: 1,
                        color: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }
        }
    },
    gauge: {
        startAngle: 225,
        endAngle: -45,
        axisLine: { // 坐标轴线
            show: true, // 默认显示，属性show控制显示与否
            lineStyle: { // 属性lineStyle控制线条样式
                color: [
                    [0.2, '#2ec7c9'],
                    [0.8, '#5ab1ef'],
                    [1, '#d87a80']
                ],
                width: 10
            }
        },
        axisTick: { // 坐标轴小标记
            splitNumber: 10, // 每份split细分多少段
            length: 15, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
                color: 'red'
            }
        },
        axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto'
            }
        },
        splitLine: { // 分隔线
            length: 22, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
            }
        },
        pointer: {
            width: 5,
            color: 'auto'
        },
        title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: '#333'
            }
        },
        detail: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'auto'
            }
        }
    },

    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
}