'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        pkg: require('./package.json'),
        version: {
            moduleVersion: {
                options: {
                    prefix: "\\('version',\\s*'"
                },
                src: ['src/*.js']
            },
            ngdocVersion: {
                options: { prefix: 'version ' },
                src: ['src/*.js']
            }
        },
        ngdocs: {
            options: {
                html5Mode: false,
                startPage: '/api/ng-suggest',
                titleLink: '#/api/ng-suggest',
                navTemplate: 'src/docs-nav.html',
                scripts: [ 
                    'angular.js',
                    'ng-suggest.js' 
                ]
            },
            api: {
                title: 'Documentation',
                src: [ 'src/*.js', 'src/**/*.js' ],
            },
        },
        connect: {
            options: {
                keepalive: true
            },
            server: {}
        },
        clean: ['docs'],
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                keepalive: true,
                singleRun: true,
                autoWatch: false,
            },
            watch: {
                configFile: 'karma.conf.js',
                keepalive: true,
                singleRun: false,
                autoWatch: true,
            }
        },
        ngtemplates: {
            app: {
                cwd:  'src/templates',
                src: '**.html', 
                dest: 'ng-suggest-templates.js',
            },
            options: {
                module: 'opensearchSuggest',
                prefix: 'template/',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true, 
                    removeComments: true
                } 
            }
        },
        concat: {
            dist: {
                src: [
                    'src/*.js','src/**/*.js',
                    'ng-suggest-templates.js'
                ],
                dest: 'ng-suggest.js',
            },
        },
    });

    grunt.registerTask('default',['docs']);
    grunt.registerTask('ng-suggest',['version','ngtemplates','concat']);
    grunt.registerTask('docs',['clean','ng-suggest','ngdocs']);
    grunt.registerTask('test',['karma:unit']);
    grunt.registerTask('watch',['karma:watch']);
};
