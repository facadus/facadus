define([
    './Base'
], function (Base) {

    function extend(protoProps, staticProps) {
        protoProps || (protoProps = {});

        var child = protoProps.hasOwnProperty('constructor') ? protoProps.constructor : function Constructor() {
            return Constructor.__super__.constructor.apply(this, arguments);
        };

        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                child[key] = this[key];
            }
        }

        function Parent() {
            this.constructor = child;
        }

        Parent.prototype = this.prototype;
        child.prototype = new Parent();
        child.__super__ = this.prototype;

        Base._.extend(child.prototype, protoProps);

        if (staticProps) {
            Base._.extend(child, staticProps);
        }

        return child;
    }

    var Class = function () {
    };

    Class.prototype.super = function (Class, fn) {
        return Class.__super__[fn].apply(this, Base._.toArray(arguments).slice(2));
    };

    Class.create = Class.extend = extend;

    return Class;

});