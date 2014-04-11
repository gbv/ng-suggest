module.exports = function(config) {
    config.set({
        files: [
            'test/lib/angular*.js',
            'src/*.js',
            'test/**/*.js',
        ],
        frameworks: ['jasmine'],
        browsers: ['Firefox'],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher'
        ],
        // continuous integration mode
        autoWatch: true,
        singleRun: false,
    });
};
