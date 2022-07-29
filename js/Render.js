/**
 * @author MaZiXiao
 * @date 2022-07-29 17:10
 */
(function () {
    $(document).ready(function () {
        /*  渲染overviewData*/
        let overviewStr = '';
        overviewData.forEach(item => {
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
        $('.overview ul').html(overviewStr)
    })
})()
