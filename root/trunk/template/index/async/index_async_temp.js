
define(function(require, exports, module) {
    var template=require('artTemplate'),
        temp_temp=template(
            '<h2>恭喜您获得：</h2>'
        )

    module.exports={
        temp_temp:temp_temp
    }
})