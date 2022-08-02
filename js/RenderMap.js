/**
 * @author MaZiXiao
 * @date 2022-08-01 15:45
 */
(function () {
    $(document).ready(function () {
        const myChart = echarts.init(document.querySelector('.geo'))
        var geoCoordMap = {
            台湾: [121.509062, 25.044332],
            河北: [114.502461, 38.045474],
            山西: [112.549248, 37.857014],
            内蒙古: [111.670801, 40.818311],
            辽宁: [123.429096, 41.796767],
            吉林: [125.3245, 43.886841],
            黑龙江: [126.642464, 45.756967],
            江苏: [118.767413, 32.041544],
            浙江: [120.153576, 30.287459],
            安徽: [117.283042, 31.86119],
            福建: [119.306239, 26.075302],
            江西: [115.892151, 28.676493],
            山东: [117.000923, 36.675807],
            河南: [113.665412, 34.757975],
            湖北: [114.298572, 30.584355],
            湖南: [112.982279, 28.19409],
            广东: [113.280637, 23.125178],
            广西: [108.320004, 22.82402],
            海南: [110.33119, 20.031971],
            四川: [104.065735, 30.659462],
            贵州: [106.713478, 26.578343],
            云南: [102.712251, 25.040609],
            西藏: [91.132212, 29.660361],
            陕西: [108.948024, 34.263161],
            甘肃: [103.823557, 36.058039],
            青海: [101.778916, 36.623178],
            宁夏: [106.278179, 38.46637],
            新疆: [87.617733, 43.792818],
            北京: [116.405285, 39.904989],
            天津: [117.190182, 39.125596],
            上海: [121.472644, 31.231706],
            重庆: [106.504962, 29.533155],
            香港: [114.173355, 22.320048],
            澳门: [113.54909, 22.198951],
        };
        var XAData = [
            // [{ name: '北京' }, { name: '贵州', value: 100 }],
            [{name: '贵州'}, {name: '北京', value: 200}],
            [{name: '贵州'}, {name: '辽宁', value: 300}],
            [{name: '贵州'}, {name: '天津', value: 400}],
            [{name: '贵州'}, {name: '新疆', value: 100}],
            [{name: '贵州'}, {name: '台湾', value: 100}],
            [{name: '贵州'}, {name: '重庆', value: 100}],
            [{name: '贵州'}, {name: '西藏', value: 100}],
            [{name: '贵州'}, {name: '上海', value: 100}],
            [{name: '贵州'}, {name: '河南', value: 100}],
            [{name: '贵州'}, {name: '河北', value: 100}],
            [{name: '贵州'}, {name: '江苏', value: 100}],
            [{name: '贵州'}, {name: '浙江', value: 100}],
            [{name: '贵州'}, {name: '山东', value: 100}],
            [{name: '贵州'}, {name: '广东', value: 100}],
            [{name: '贵州'}, {name: '广西', value: 100}],
        ];
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,
                        toName: dataItem[1].name,
                        coords: [fromCoord, toCoord],
                        value: dataItem[1].value,
                    });
                }
            }
            return res;
        };
        var color = ''; //航线的颜色
        var series = [];
        [['贵州', XAData]].forEach(function (item, i) {
            series.push({
                shading: 'color', // 三维地理坐标系组件中三维图形的着色效果
                name: item[0] + ' Top3',
                type: 'lines',
                zlevel: 2,
                symbol: ['none', 'none'],
                symbolSize: 10,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'arrow', //箭头图标
                    symbolSize: 5,
                },
                lineStyle: {
                    normal: {
                        width: 1, //尾迹线条宽度
                        opacity: 1, //尾迹线条透明度
                        curveness: 0.4, //尾迹线条曲直度
                    },
                },
                data: convertData(item[1]),
            });
        });
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: function (params, ticket, callback) {
                    return params.data.fromName + '>' + params.data.toName + '：' + params.value + ' 人';
                },
            },
            visualMap: {
                //图例值控制
                min: 0,
                max: 400,
                calculable: true,
                show: false,
                color: ['#00eaff', '#00eaff', '#00eaff', '#00eaff', '#00eaff'],
                textStyle: {
                    color: '#fff',
                },
            },
            geo: {
                zoom: 1.2,
                map: 'china',
                label: {
                    normal: {
                        show: true,
                        color: '#fff',
                        fontSize: 10,
                    },
                    emphasis: {
                        areaColor: '#2AB8FF',
                        borderWidth: 0.5,
                        textStyle: {
                            color: '#fff',
                        },
                    },
                },
                roam: true,
                itemStyle: {
                    normal: {
                        borderColor: '#068fa2',
                        areaColor: '#142947',
                        shadowColor: '#013C62',
                        borderWidth: 1,
                    },
                    emphasis: {
                        areaColor: '#0b192d',
                    },
                },
            },
            series: series,
        };
        myChart.setOption(option)
        window.addEventListener('resize', function () {
            myChart.resize()
        })
    })
})()
