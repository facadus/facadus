module.exports = function (grunt) {

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    dir: 'temp',
                    optimize: 'none',
                    optimizeCss: 'none',
                    removeCombined: true,
                    stubModules: ['text'],
                    modules: [
                        {
                            name: 'MyApplication',
                            include: [
                                'widgets/header/Header'
                            ]
                        }
                    ],
                    paths: {
                        'facadus': ':empty',
                        'text': '../lib/require/text'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

};