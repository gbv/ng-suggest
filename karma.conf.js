module.exports = function(config) {
    config.set({
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'ng-suggest.js',
            'test/**/*.js',
        ],
        frameworks: ['jasmine'],
        browsers: ['Firefox'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher'
        ],
    });
};
