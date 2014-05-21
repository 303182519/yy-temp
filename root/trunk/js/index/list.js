/**
 * 首页list模块.
 * User: xiejinlong@yy.com
 * Time: (2014-05-21 10:11)
 */
define(function(require, exports, module) {
    var Base=require("base");
    var temp=require("../../template/index/list_temp");
    var List=Base.Base.extend({
        /**
         * 初始化函数
         * @method initialize*/

        initialize:function(){
            console.log("首页list模块");
            var data=[
                {
                    awardName:"DDT"
                },
                {
                    awardName:"SXD"
                },
                {
                    awardName:"FRXZ2"
                }
            ]
            $("#list").html(temp.temp_temp({
                data:data
            }))
        }
    })
    module.exports=List;
})