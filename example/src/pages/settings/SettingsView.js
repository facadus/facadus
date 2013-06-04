define([
    'facadus/View',
    'text!./Settings.html'
], function (View, template) {

    return View.extend({
        template: template,
        setTitle: function (title) {
            this.$('p').text(title);
        }
    })

});