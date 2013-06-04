define([
    'facadus/Presenter',
    './SettingsView'
], function (Presenter, View) {

    return Presenter.extend({
        View: View,
        start: function (section) {
            switch (section) {
                case 'privacy':
                    this.view.setTitle('Privacy');
                    break;
                case 'general':
                default:
                    this.view.setTitle('General');
                    break;
            }
        }
    })

});