/**
 * @author MaZiXiao
 * @date 2022-07-29 17:10
 */

/*@param count 渲染item*/
function randerCount(count) {
    let countStr = ''
    count.forEach(item => {
        countStr += `
                    <div class="item">
                            <h4>${item.value}</h4>
                            <span>
                                <i class="icon-dot" style="color: ${item.icon_color};"></i>
                                ${item.name}
                            </span>
                    </div>
                    `
    })
    return countStr
}

/*配置loading节点*/
(function () {
    $(document).ready(function () {
        /*  默认隐藏所有盒子*/
        $('.inner').hide()
        const loadingDom = $('<div class="loading-box"><span class="loading iconfont icon-icon_loading"></span></div>')
        $('.panel').prepend(loadingDom)

    })
})();
/*  渲染overviewData*/
(function () {
    $(document).ready(function () {
        function readerOverview() {
            let overviewStr = '';
            $('.overview .loading-box').show()
            axios.get('https://mock.apifox.cn/m1/1321976-0-default/overview').then(res => {
                res.data.data.forEach(item => {
                    overviewStr += (`
             <li>
                  <h4>${item.value}万</h4>
                  <span>
                       <i class="icon-dot" style="color: ${item.icon_color}"></i>
                       ${item.name}
                  </span>
             </li>
            `)
                })
                if (overviewStr) {
                    $('.overview .loading-box').fadeOut()
                    $('.overview ul').html(overviewStr)
                    $('.overview .inner').fadeIn()
                }
            })
        }

        readerOverview()
    })
})();
/*渲染monitor模块*/
(function () {
    $(document).ready(function () {
        /*渲染monitor模块*/
        let monitorHeader = ''
        let monitorContent = ''

        function randerMonitor(type) {
            monitorHeader = '';
            monitorContent = '';
            $('.monitor .loading-box').show()
            axios.get(`https://mock.apifox.cn/m1/1321976-0-default/monitor?type=${type}`).then(res => {
                res.data.head.forEach(title => {
                    monitorHeader += `<span class="col">${title}</span>`
                })

                $('.monitorHeader').html(monitorHeader)
                if (type === 'trade') {
                    res.data.data.forEach(item => {
                        monitorContent += `
                    <div class="row">
                        <span class="col">${item.time}</span>
                        <span class="col">${item.address}</span>
                        <span class="col">${Number(item.amount).toFixed(2)}</span>
                        <span class="icon-dot"></span>
                    </div>
                    `
                    })
                }
                if (type === 'register') {
                    res.data.data.forEach(item => {
                        monitorContent += `
                    <div class="row">
                        <span class="col">${item.time}</span>
                        <span class="col">${item.address}</span>
                        <span class="col">${item.sex}</span>
                        <span class="icon-dot"></span>
                    </div>
                    `
                    })
                }
                if (monitorContent) {
                    $('.monitor .loading-box').fadeOut()
                    $('.marquee').html(monitorContent)
                    $('.monitor .inner').fadeIn()
                }
            })

        }

        randerMonitor('trade')
        $('.monitor li').click(function () {
            if ($(this).attr('class') === 'active') return
            randerMonitor($(this).attr('tab'))
        })
    })
})();
/*渲染porit销售区域模块*/
(function () {
    $(document).ready(function () {
        /*渲染porit销售区域模块*/
        function randerPonit() {
            $('.point .loading-box').show()
            const myChart = echarts.init(document.querySelector('.pie'))
            let countStr = ''
            axios.get('https://mock.apifox.cn/m1/1321976-0-default/pie').then(res => {
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        textStyle: {
                            color: '#fff',
                        },
                        borderColor: 'rgba(0,0,0,0.5)'
                    },
                    color: ["#006cff", "#60cda0", "#ed8884", "#ff9f7f", "#0096ff", "#9fe6b8", "#32c5e9", "#1d9dff"],
                    series: [
                        {
                            name: '销售统计',
                            type: 'pie',
                            radius: [10, 70],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 0
                            },
                            label: {
                                fontSize: 10
                            },
                            labelLine: {
                                length: 6,
                                length2: 8
                            },
                            data: res.data.data
                        }
                    ]
                };
                countStr = randerCount(res.data.count)
                if (res.data.data && countStr) {
                    $('.point .loading-box').fadeOut()
                    myChart.setOption(option)
                    $('.point .data').html(countStr)
                    $('.point .inner').fadeIn()
                }
                window.addEventListener('resize', function () {
                    myChart.resize()
                })
            })
        }

        randerPonit()
    })
})();
/*渲染users用户总量模块*/
(function () {
    $(document).ready(function () {
        function randerUsers() {
            $('.users .loading-box').show()
            const myChart = echarts.init(document.querySelector('.bar'))
            let countStr = ''
            axios.get('https://mock.apifox.cn/m1/1321976-0-default/users').then(res => {
                const newyAxis = []
                res.data.yAxis.forEach(item => {
                    if (item !== 1200) {
                        newyAxis.push(item)
                    } else {
                        newyAxis.push({
                            name: '',
                            value: 1200,
                            itemStyle: {
                                color: '#254065'
                            },
                            emphasis: {
                                itemStyle: {
                                    color: '#254065'
                                }
                            },
                            tooltip: {
                                extraCssText: 'opacity:0'
                            }
                        })
                    }

                })
                const option = {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: "#00fffb"},
                            {offset: 1, color: "#0061ce"}
                        ]
                    ),
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow'
                        },
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        textStyle: {
                            color: '#fff',
                        },
                        borderColor: 'rgba(0,0,0,0.5)'
                    },
                    grid: {
                        top: '3%',
                        right: '3%',
                        bottom: '3%',
                        left: '0%',
                        containLabel: true,
                        show: true,
                        borderColor: "rgba(0,240,255,0.3)"
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: res.data.xAxis || [],
                            axisTick: {
                                alignWithLabel: false,
                                show: false
                            },
                            axisLabel: {
                                color: '#4c9bfd',
                                fontSize: 11
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(0,240,255,0.3)'
                                }
                            }
                        }
                    ],

                    yAxis: [
                        {
                            type: 'value',
                            axisTick: {
                                alignWithLabel: false,
                                show: false
                            },

                            axisLabel: {
                                color: '#4c9bfd'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: 'rgba(0,240,255,0.3)'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(0,240,255,0.3)'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '用户总量',
                            type: 'bar',
                            barWidth: '60%',
                            data: newyAxis || [],

                        }
                    ]
                };
                countStr = randerCount(res.data.count)

                if (countStr) {
                    $('.users .loading-box').fadeOut()
                    myChart.setOption(option)
                    $('.users .data').html(countStr)
                    $('.users .inner').fadeIn()
                }
                window.addEventListener('resize', function () {
                    myChart.resize()
                })
            })
        }

        randerUsers()
    })
})();
/*渲染order订单模块*/
(function () {
    $(document).ready(function () {

        function renderOrders(time) {
            let orderHTMLStr = ''
            $('.order .loading-box').show()
            axios.get(`http://127.0.0.1:4523/m1/1321976-0-default/order?time=${time}`).then(res => {
                res.data.data.forEach(item => {
                    orderHTMLStr += `
                    <div class="order_item">
                        <h4>${item.value}</h4><span><i class="icon-dot"></i>${item.name}</span>
                    </div>
                   `
                })
                if (orderHTMLStr) {
                    $('.order .loading-box').fadeOut()
                    $('.order_center').html(orderHTMLStr)
                    $('.order .inner').fadeIn()
                }
            })
        }

        $('.order_top span').click(function () {
            $(this).addClass('active').siblings('span').removeClass('active')
            let time = Number($(this).attr('time'))
            renderOrders(time)
        })
        renderOrders(365)
    })
})();
/*渲染sales销售额统计模块*/
(function () {
    $(document).ready(function () {
        let chartData = {}
        axios.get('https://mock.apifox.cn/m1/1321976-0-default/sales').then(res => {
            chartData = res.data.data
        })
        const myChart = echarts.init(document.querySelector('.salesChart'))

        function renderSales(type) {
            $('.sales .loading-box').show()
            const option = {
                color: ['#00f2f2', '#ed3f35'],
                title: {
                    text: '单位：万',
                    textStyle: {
                        color: '#4c9bfd',
                        fontSize: '13'
                    },
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['预期销售额', '实际销售额'],
                    textStyle: {
                        color: '#4c9bfd'
                    },
                    right: '10%'
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    show: 'true',
                    borderColor: '#012f4a',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: chartData[type]?.info || ["2099年", "2199年", "2299年", "2399年", "2499年", "2599年", "2699年", "2799年", "2899年", "2999年", "3099年", "3199年"],
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#4c9bfd'
                    },
                    axisLine: {
                        show: false
                    },
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#4c9bfd'
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#012f4a'
                        }
                    }
                },
                series: [
                    {
                        name: '预期销售额',
                        type: 'line',
                        stack: 'Total',
                        data: chartData[type]?.detail[0] || [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                        smooth: 'true'
                    },
                    {
                        name: '实际销售额',
                        type: 'line',
                        stack: 'Total',
                        data: chartData[type]?.detail[1] || [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                        smooth: true
                    }
                ]
            };

            if (chartData) {
                $('.sales .loading-box').hide()
                $('.salesChart').fadeIn()
                myChart.setOption(option)
            }

            window.addEventListener('resize', function () {
                myChart.resize()
            })
        }

        let index = -1;
        let captionSpan = $('.caption span')
        captionSpan.click(function () {
            index = $(this).index() - 1
            toggleSpan()
            renderSales($(this).attr('type'))
        })
        let types = ['year', 'quarter', 'month', 'week']
        setInterval(() => {
            index++
            if (index >= 4) {
                index = 0
            }
            if (chartData) {
                toggleSpan()
                renderSales(types[index])
            }
        }, 1000);

        function toggleSpan() {
            captionSpan.eq(index).addClass('active').siblings('span').removeClass('active')
        }

        renderSales('year')
    })
})()
