module.exports = function(config) {
    config.set({
 
        // base path, that will be used to resolve files and exclude
        basePath: '../REVCast/',
 
        // frameworks to use
        frameworks: ['jasmine'],
 
        // list of files / patterns to load in the browser
        files: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
            'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
            "bower_components/highcharts-ng/dist/highcharts-ng.min.js",
            "bower_components/highstock-release/highstock.js",
            "bower_components/highcharts-release/modules/exporting.js",
            "bower_components/angular-material-icons/angular-material-icons.min.js",
            "bower_components/angular-animate/angular-animate.min.js",
            "bower_components/angularjs-toaster/toaster.js",
//          'bower_components/angular-dialog-service/dist/dialogs.js',
            'bower_components/ng-file-upload/dist/ng-file-upload.min.js',
            'bower_components/ng-file-upload/dist/ng-file-upload-shim.min.js',
			'bower_components/angular-modal-service/dst/angular-modal-service.min.js',
			'bower_components/moment/min/moment.min.js',
			'bower_components/bootstrap-daterangepicker/daterangepicker.js',
			'bower_components/angular-daterangepicker-plus/dist/angular-daterangepicker-plus.min.js',
            "assets/libs/angular-pageslide-directive.min.js",
            'modules/templates/*.tmpl.html',
            'bower_components/angular-ui-grid/ui-grid.min.js',
            "bower_components/angular-svg-round-progressbar/build/roundProgress.js",
            'app.js',
            'index.html',
            'modules/**/*.js',
            'test/**/*.spec.js'
        ],
 
        // list of files to exclude
        exclude: [
        ],
 
        // test results reporter to use
        reporters: ['progress'],
 
        // web server port
        port: 9876,
 
        // enable / disable colors in the output (reporters and logs)
        colors: true,
 
        // level of logging
        logLevel: config.LOG_INFO,
 
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
 
        // Start these browsers
        browsers: ['PhantomJS'],
 
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        browserDisconnectTimeout : 10000, // default 2000         
        browserDisconnectTolerance : 1, // default 0         
        browserNoActivityTimeout : 60000, //default 10000
 
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    });
};
