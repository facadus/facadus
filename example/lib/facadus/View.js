define([
    './Base',
    './Class'
], function (Base, Class) {

    return Class.create({
        constructor: function () {
            this.eventBus = Base.$({});
            this.bindable = [];
        },

        on: function () {
            this.eventBus.on.apply(this.eventBus, arguments);
        },
        off: function () {
            this.eventBus.off.apply(this.eventBus, arguments);
        },
        trigger: function () {
            this.eventBus.trigger.apply(this.eventBus, arguments);
        },

        $: function (selector) {
            return this.$el.find(selector);
        },

        template: '<div></div>',

        _requireWidget: function ($placeholder) {
            this.loadCouner++;
            require([$placeholder.data('type')], function (Widget) {
                this._onloadWidget(Widget, $placeholder);
            }.bind(this));
        },

        _onloadWidget: function (Widget, $placeholder) {
            var widget = new Widget();
            this[$placeholder.data('name')] = widget;

            var attribute = $placeholder.data('bind');
            if (attribute != null) {
                this.bindable.push({
                    'attribute': attribute,
                    'widget': widget
                });
            }

            widget.on('ready', function () {
                var value = $placeholder.data('value');
                if (value != null) {
                    widget.setValue(value);
                }
                $placeholder.replaceWith(widget.$el);
                this.loadCouner--;
                this._viewReady();
            }.bind(this));

            widget.render();
        },

        _viewReady: function () {
            if (this.loadCouner == 0) {
                this.trigger('ready');
                this.init();
            }
        },

        init: function () {
        },

        render: function () {
            this.$el = Base.$(Base.$.parseHTML(this.template));
            if (this.style != null && this.style.$el == null) {
                this.style.$el = Base.$(Base.$.parseHTML('<style></style>')).html(this.style).appendTo('head');
            }

            var events = this.events || {},
                delegateEventSplitter = /^(\S+)\s*(.*)$/;
            for (var key in events) {
                var method = events[key];
                if (!Base._.isFunction(method)) method = this[events[key]];
                if (!method) throw new Error('Method "' + events[key] + '" does not exist');
                var match = key.match(delegateEventSplitter);
                var eventName = match[1], selector = match[2];
                method = Base._.bind(method, this);
                eventName += '.delegateEvents' + this.cid;
                if (selector === '') {
                    this.$el.bind(eventName, method);
                } else {
                    this.$el.delegate(selector, eventName, method);
                }
            }


            this.loadCouner = 0;
            this.$el.find('[data-type]').each(function (i, el) {
                this._requireWidget(Base.$(el));
            }.bind(this));
            this._viewReady();
        },

        setParent: function ($container) {
            $container.contents().detach();
            $container.append(this.$el);
        },

        setPresenter: function (presenter) {
            this.presenter = presenter;
        }
    });

});