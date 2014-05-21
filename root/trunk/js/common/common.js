/**
 * commonjs 页面公用JS文件.
 * User: xiejinlong@yy.com
 * Time: (2013-08-08 14:43)
 */
define(function(require, exports, module) {
    var commonJs={
        /**
         *判断遮罩层是否生成
         */
        showMask:function(){
            if($("#mask").size()==0){
                $("<div id='mask'></div>").appendTo('body');
                this.maskEvent();
                this.bindEvent();
            }else{
                $("#mask").show();
            }
        },
        test:function(){
            console.log("common");
        },
        /**
         * 关闭弹出层
         */
        closeMask:function(){
            $("#mask").hide();
        },
        //功能描述：获取 url 的参数值
        parseQueryString:function(url) {
            var pos;
            var obj = {};
            if ((pos = url.indexOf("?")) != -1) {
                var param = url.substring(pos+1, url.length)
                var paramArr = param.split('&');
                var keyValue = [];
                for (var i = 0, l = paramArr.length; i < l; i++) {
                    keyValue = paramArr[i].split('=');
                    obj[keyValue[0]] = keyValue[1];
                }
            }
            return obj;
        },
        /**
         * 函数节流
         */
        throttle:function(fn, delay){
            var timer = null;
            return function(){
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function(){
                    fn.apply(context, args);
                }, delay);
            };
        },
        //请求jsonp数据
        geturl:function(url,datas,callback){
            $.ajax({
                type : 'POST',
                dataType : "jsonp",
                jsonp:"callback",
                data: datas || "",
                url  : url,
                async : false,
                cache : false,
                success : function(data){
                    callback && callback(data);
                },
                error:function(){
                    alert("请求资源失败");
                }
            });
        },
        /**
         *弹出层绑定事件
         */
        maskEvent:function(){
            var _this=this;
            this.mask=$("#mask");

            if($.browser.msie && parseInt($.browser.version) <= 6){
                var w=Math.max($(window).width(),$(".wrap").width());
                var h=Math.max($(window).height(),$(".wrap").outerHeight(true));
                this.mask.width(w).height(h);
            }

            var mask_throttle=this.throttle(function(){
                if($.browser.msie && parseInt($.browser.version) <= 6){
                    var ww=Math.max($(window).width(),$(".wrap").width());
                    var hh=Math.max($(window).height(),$(".wrap").outerHeight(true));
                    _this.mask.width(ww).height(hh);
                }
            },100);

            $(window).resize(function(){
                mask_throttle();
            })
        },
        /**
         * 公用弹出层
         * @param htmlStr {string}  显示html内容
         */
        tipLayer:function(htmlStr){
            $("#pop_content").html(htmlStr);
            $("#pop_layer").show();
            this.showMask();
        },
        bindEvent:function(){
            var _this=this;
            //关闭弹出层
            $("#pop_layer").on("click",".close_pop,.pop_btn",function(){
                _this.tipLayer_hide();
            })
        },
        tipLayer_hide:function(){
            $("#pop_layer").hide();
            this.closeMask();
        }
    }
    module.exports=commonJs;
})