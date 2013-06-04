define([
    'facadus/View'
], function (View) {

    return View.extend({
        template: '<h1></h1>',
        setValue: function (value) {
            this.$el.text(value);
        }
    });

});