define(function(require,exports,module){

    function Class(o) {
        //把之前的函数转换
        if (!(this instanceof Class) && isFunction(o)) {
            return classify(o)
        }
    }

    Class.create=function(obj){
        function subClass(){
            if(this.constructor===subClass && this.initialize){
                this.initialize.apply(this,arguments);
            }
        }
        //真正创建
        implement.call(subClass,obj);

        //暴露静态方法
        return classify(subClass);
    }

    function classify(cls){
        //继承
        cls.extend=Class.extend;
        //扩展
        cls.implement=implement;
        return cls;
    }

    function implement(proto){
        var key, value;
        for(key in proto){
            value=proto[key];
            if(Class.Mutators.hasOwnProperty(key)){
                Class.Mutators[key].call(this, value)
            }else{
                this.prototype[key]=value;
            }
        }
    }

    Class.extend = function(properties) {
        properties || (properties = {})
        properties.Extends = this

        return Class.create(properties)
    }

    Class.Mutators={
        'Extends':function(parent){
            var existed = this.prototype;
            var proto = createProto(parent.prototype);
            mix(proto,existed);
            proto.constructor = this;

            this.prototype=proto;
            //经典
            this.superclass=parent.prototype;
        },
        'Implements': function(items) {
            isArray(items) || (items = [items])
            var proto = this.prototype, item

            while (item = items.shift()) {
                mix(proto, item.prototype || item)
            }
        },
        'Statics': function(staticProperties) {
            mix(this, staticProperties)
        }
    }


    function Ctor() {
    }

    var createProto = Object.__proto__ ?
        function(proto) {
            return { __proto__: proto }
        } :
        function(proto) {
            Ctor.prototype = proto
            return new Ctor()
        }


    // Helpers
    // ------------

    function mix(r, s, wl) {
        // Copy "all" properties including inherited ones.
        for (var p in s) {
            if (s.hasOwnProperty(p)) {
                if (wl && indexOf(wl, p) === -1) continue

                // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
                if (p !== 'prototype') {
                    r[p] = s[p]
                }
            }
        }
    }

    var toString = Object.prototype.toString

    var isArray = Array.isArray || function(val) {
        return toString.call(val) === '[object Array]'
    }

    var isFunction = function(val) {
        return toString.call(val) === '[object Function]'
    }

    var indexOf = Array.prototype.indexOf ?
        function(arr, item) {
            return arr.indexOf(item)
        } :
        function(arr, item) {
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i] === item) {
                    return i
                }
            }
            return -1
        }

    module.exports = Class
})