/**
 * index :页面入口.
 * User: xiejinlong@yy.com
 * Time: (2014-02-28 15:46)
 */
define(function(require, exports, module) {
    var Base=require("base");
    var List=require("./index/list");
    var common=require("common");
    var index=Base.Base.extend({
        /**
         * 初始化函数
         * @method initialize
         * */

        initialize:function(){
            console.log("页面入口");
            new List();
            common.test();
            $("#load").on("click",function(){
                require.async('index_async',function(index_async){
                    new index_async();
                })
            })

            seajs.log("ddd");
        },
        test:function(){
            console.log("test");
        }
    })
    /*var Widget=require("widget"),

        index = Widget.extend({

            events: {
                'click h3': 'heading',
                'mouseover p': 'paragraph'
            },

            heading: function() {
                this.$('h3').html('标题被点击了。');
            },

            paragraph: function() {
                this.$('p').css('background-color', 'red');
            }
        });*/

    module.exports=index;
})