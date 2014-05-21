/**
 * rewards_temp：我要领奖按钮弹出层模板
 * User: xiejinlong@yy.com
 * Time: (2014-01-17 18:07)
 */
define(function(require, exports, module) {
    var template=require('artTemplate'),
        temp_temp=template(
            '<h2>恭喜您获得：</h2>'+
            '<ul>'+
                '<% for(var i = 0; i < data.length; i++){ %>'+
                    '<li>奖励<%=(i+1)%>：<em class="dou_icon"></em>X<%=data[i].awardName%></li>'+
                '<% } %>'+
            '</ul>'
        )

    module.exports={
        temp_temp:temp_temp
    }
})