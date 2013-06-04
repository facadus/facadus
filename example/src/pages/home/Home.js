define([
    'facadus/Presenter',
    'text!./Home.html'
], function (Presenter, template) {

    return Presenter.extend({
        template: template
    });

});