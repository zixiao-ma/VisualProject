/**
 * @author MaZiXiao
 * @date 2022-07-29 16:54
 */

(function () {
    $(document).ready(function () {
        $('.monitor li').click(function () {
            $(this).addClass('active').siblings('li').removeClass('active')
        })
    })
})()
/*
{
    "address": "青海省上海市六枝特区",
    "time": "2009-11-20 03:33:18",
    "sex": "男",
    "amount": 38,
    "id": 16
},*/
