define([
    'facadus/Application',
    './pages/Routes',
    'text!./MyApplication.html',
    'text!./MyApplication.css'
], function (Application, Routes, template, style) {

    return Application.extend({
        template: template,
        style: style,
        routes: Routes
    });

});