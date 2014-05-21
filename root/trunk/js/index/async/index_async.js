/**
 * index :页面入口.
 * User: xiejinlong@yy.com
 * Time: (2014-02-28 15:46)
 */
define(function(require, exports, module) {
    var Base=require("base");
    var temp=require("../../../template/index/list_temp");
    var yibu=Base.Base.extend({
        /**
         * 初始化函数
         * @method initialize*/

        initialize:function(){
            console.log("异步加载过来的");

        }
    })

    module.exports=yibu;
})