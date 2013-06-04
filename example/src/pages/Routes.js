define([
    './home/Home',
    './settings/Settings'
], function (Home, Settings) {

    return [
        {
            name: 'Home',
            pattern: '',
            Presenter: Home
        },
        {
            name: 'Settings',
            pattern: 'settings/:section',
            Presenter: Settings
        }
    ];

});