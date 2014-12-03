var     gulp        = require("gulp"),                   // main gulp file
        autoprefix  = require("gulp-autoprefixer"),      // set css prefixes
        notify      = require("gulp-notify"),            // warn if error.message
        concat      = require("gulp-concat"),            // multiple streams into one
        filter      = require("gulp-filter"),            // to filter necessary items
        jade        = require("gulp-jade"),              // converts jade to html
        livereload  = require("gulp-livereload"),        // reloads browser on changes
        rename      = require("gulp-rename"),            // file names transformations
        sass        = require("gulp-ruby-sass"),         // converts scss to css
        uglify      = require("gulp-uglify"),            // minificates piped files
        util        = require("gulp-util");              // gulp utilities required

var AUTOPREFIXER_BROWSERS = [
    'last 2 versions'
];

var config = {
    main:       'source/main',
    module:     'source/modules',
    factories:  'source/appFactories',
    services:   'source/appServices',
    directives: 'source/appDirectives',
    vendor:     'source/vendor',
    statics:    'source/static',
    build:      'build'
};

gulp.task('jadeIndex', function() {
    return gulp.src(config.main + '/jade/*.jade')
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(config.build));
});

gulp.task('jadeModule', function(){
    return gulp.src(config.module + '/**/*.jade', {base: './source/modules/'})
        .pipe(jade({ pretty: true }))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.build + '/layout'));
});

gulp.task('cssModule', function() {
    return gulp.src(config.module + '/**/*.scss')
        .pipe(concat('module.scss'))
        .pipe(rename({ prefix: "_" }))
        .pipe(gulp.dest(config.main + '/scss/includes'));
});

gulp.task('cssVendor', function() {
    return gulp.src(config.vendor + '/scss/*.scss')
        .pipe(concat('vendor.scss'))
        .pipe(rename({ prefix: "_" }))
        .pipe(gulp.dest(config.main + '/scss/includes'));
});

gulp.task('css', function() {
    return gulp.src(config.main + '/scss/style.scss')
        .pipe(sass({ style: 'nested', "sourcemap=none": true  }) //'compact', //'compressed',
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        })))
        .pipe(autoprefix(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest(config.build + '/css'));
});

gulp.task('vendorJs', function () {
    return gulp.src([
        config.vendor + '/js/jquery.js',
        config.vendor + '/js/angular.js',
        config.vendor + '/js/angular-route.js',
        config.vendor + '/js/angular-resource.js',
        config.vendor + '/js/bootstrap.js'
        ])
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(config.build +'/js'));
});

gulp.task('appJs', function() {
    return  gulp.src([
            config.main + '/js/app.js',
            config.directives + '/*.js',
            config.services + '/*.js',
            config.factories + '/*.js',
            config.module + '/**/*.js'
    ])
        .pipe(concat('app.js'))
        //.pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(config.build +'/js'));
});

gulp.task('statics', function() {
    return gulp.src([config.statics + '/**/*'], { dot: true })
        .pipe(gulp.dest(config.build));
});

gulp.task('staticModuleImg', function() {
    return gulp.src(config.module + '/**/img/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('watch', function() {
    gulp.watch(config.main + '/jade/*.jade', ['jadeIndex']);
    gulp.watch(config.module + '/**/*.jade', ['jadeModule']);
    gulp.watch(config.module + '/**/*.scss', ['cssModule', 'css']);
    gulp.watch(config.vendor + '/css/*.scss', ['cssVendor', 'css']);
    gulp.watch(config.main + '/scss/style.scss', ['css']);
    gulp.watch(config.vendor + '/js/*', ['vendorJs']);
    gulp.watch(config.module + '/**/*.js', ['appJs']);
    gulp.watch(config.main + '/js/**/*.js', ['appJs']);
    gulp.watch(config.directives + '/*.js', ['appJs']);
    gulp.watch(config.services + '/*.js', ['appJs']);
    gulp.watch(config.factories + '/*.js', ['appJs']);
    gulp.watch(config.statics + '/**/*', ['statics']);
    gulp.watch(config.module + '/**/img/*', ['staticModuleImg']);
    livereload.listen();                                                        // Create LiveReload server
    gulp.watch([config.build + '/**/*']).on('change', livereload.changed);      // Watch any files in dist, reload on change
});

// DEFAULT TASKS + LiveRELOAD _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
gulp.task('default', [
    'jadeIndex', 'jadeModule',
    'css', //'cssModule', 'cssVendor',
    'vendorJs', 'appJs',
    'statics', 'staticModuleImg',
    'watch' ]);
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -