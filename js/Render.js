/**
 * @author MaZiXiao
 * @date 2022-07-29 17:10
 */

(function () {
    let overviewData = []
    $(document).ready(function () {
        /*  默认隐藏所有盒子*/
        $('.inner').hide()
        /*给每一个inner加入loading节点*/
        const loadingDom = $('<div class="loading-box"><span class="loading iconfont icon-icon_loading"></span></div>')
        $('.panel').prepend(loadingDom)

        /*  渲染overviewData*/
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
})()
