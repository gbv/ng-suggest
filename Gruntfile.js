'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-template');

    grunt.initConfig({
        pkg: require('./package.json'),
        version: { // take version number from package.json
            moduleVersion: {
                options: {
                    prefix: "\\('version',\\s*'"
                },
                src: ['src/*.js']
            },
        },
        template: {
            index: {
                options: {
                     data: function() { 
                        return grunt.config.get('pkg'); 
                    }
                },
                files: {
                    'src/index.ngdoc': ['src/index.ngdoc.tpl']
                }
            }
        },
        ngdocs: {
            options: {
                html5Mode: false,
                titleLink: '#/api',
                navTemplate: 'src/docs-nav.html',
                scripts: [ 
                    'angular.js',
                    'ng-suggest.min.js',
/*                    
                    "http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap.min.js",
                    "http://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.js"
*/                    
                ]
            },
            api: {
                title: 'API documentation',
                src: [ 'src/*.js', 'src/**/*.js', 'src/*.ngdoc' ],
                api: true,
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
                module: 'ngSuggest',
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
        ngmin: {
            angular: {
                src: ['ng-suggest.js'],
                dest: 'ng-suggest.js',
            }
        },
        uglify : {
            options: {
                report: 'min',
                mangle: false
            },
            my_target : {
                files : {
                    'ng-suggest.min.js' : ['ng-suggest.js']
                }
            }
        },
        shell: {
            demo: {
                command: [
                    "rm -rf docs/demo",
                    "cp -r demo docs",
                    "cp ng-suggest.js docs/grunt-scripts",
                    "perl -pi -e 's|<script src=\"\\.\\..+|<script src=\"../grunt-scripts/ng-suggest.js\"></script>|' docs/demo/*.html"
                ].join('&&')
            },
            site: {
                command: "rm -rf site && mkdir site && cp -r docs/* site"
            },
            working_copy_must_be_clean: {
                command: "if git status --porcelain 2>/dev/null | grep -q .; then exit 1; fi",
                options: { failOnError: true } 
            },
            push_site: {
                command: "git push origin gh-pages",
                options: { failOnError: true } 
            },
            gh_pages: {
                command: [
                    'git checkout gh-pages',
                    'git pull origin gh-pages',
                    'cp -rf site/* .',
                    'rm -rf site',
                    'git add .',
                    'git commit -m "updated site"',
                    'git checkout master'
                ].join('&&'),
                options: { 
                    stdout: true,
                    stderr: true,
                    failOnError: true
                } 
            }
        }
    });

    grunt.registerTask('default',['docs']);
    grunt.registerTask('ng-suggest',['version','ngtemplates','concat','ngmin','uglify']);
    grunt.registerTask('docs',['clean','ng-suggest','template','ngdocs','shell:demo']);
    grunt.registerTask('gh-pages', ['test','shell:working_copy_must_be_clean','site','shell:gh_pages']);
    grunt.registerTask('push-site', ['gh-pages','shell:push_site']);
    grunt.registerTask('site', ['docs','shell:site']);
    grunt.registerTask('test',['karma:unit']);
    grunt.registerTask('watch',['karma:watch']);
};
