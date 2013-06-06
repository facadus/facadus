define([
    './Base',
    './Class',
    './View'
], function (Base, Class, View) {

    return Class.create({
        constructor: function (container) {
            this.router = new Base.Backbone.Router();
            if (this.template) {
                this.View = View.extend({
                    template: this.template,
                    style: this.style
                });
                this.view = new this.View();
                this.watingForViewReady = true;
                this.view.on('ready', function () {
                    this.view.setParent(Base.$(container));
                    this.$container = this.view.$('[data-region]');
                    this._routes(this.routes);
                    this.watingForViewReady = false;
                    if (this.startRequired) {
                        this.start();
                    }
                }.bind(this));
                this.view.render();
            } else {
                this.$container = Base.$(container);
                this._routes(this.routes);
            }
        },
        start: function () {
            if (this.watingForViewReady) {
                this.startRequired = true;
            } else {
                this.startRequired = false;
                Base.Backbone.history.start();
            }
        },
        stop: function () {
            Base.Backbone.history.stop();
        },
        _routes: function (routes) {
            routes.forEach(function (route) {
                this._route(route);
            }, this);
        },
        _route: function (route) {
            function Application_startPresenter(view, presenter, $container, args) {
                view.setPresenter(presenter);
                view.setParent($container);
                presenter.start.apply(presenter, args);
            }

            // TODO: use eventbus for route change handling
            function Application_routeOnChange() {
                var presenter = new route.Presenter(),
                    proto = route.Presenter.prototype,
                    args = Base._.toArray(arguments);
                if (!proto.view) {
                    if (!proto.View) {
                        proto.View = View.extend({
                            template: proto.template,
                            style: proto.style
                        });
                    }

                    proto.view = new proto.View();
                    proto.view.on('ready', function () {
                        Application_startPresenter(proto.view, presenter, this.$container, args);
                    }.bind(this));
                    proto.view.render();
                } else {
                    Application_startPresenter(proto.view, presenter, this.$container, args);
                }
            }

            this.router.route(route.pattern, route.name, Application_routeOnChange.bind(this));
        }
    });

});
