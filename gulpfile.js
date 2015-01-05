var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();

var AUTOPREFIXER_BROWSERS = [
    'last 2 versions'
];

var config = {
    main:       'source/main',
    modules:    'source/modules',
    factories:  'source/appFactories',
    services:   'source/appServices',
    directives: 'source/appDirectives',
    vendor:     'source/vendor',
    statics:    'source/static',
    build:      'build'
};

gulp.task('jadeIndex', function() {
    return gulp.src(config.main + '/jade/*.jade')
        .pipe(plugins.jade({pretty: true}))
        .pipe(gulp.dest(config.build));
});

gulp.task('jadeModule', function(){
    return gulp.src(config.modules + '/**/*.jade', {base: './source/modules/'})
        .pipe(plugins.jade({ pretty: true }))
        .pipe(plugins.rename({dirname: ''}))
        .pipe(gulp.dest(config.build + '/layout'));
});

gulp.task('cssModule', function() {
    return gulp.src(config.modules + '/**/*.scss')
        .pipe(plugins.concat('modules.scss'))
        .pipe(plugins.rename({ prefix: "_" }))
        .pipe(gulp.dest(config.main + '/scss/includes'));
});

gulp.task('cssVendor', function() {
    return gulp.src(config.vendor + '/scss/*.scss')
        .pipe(plugins.concat('vendor.scss'))
        .pipe(plugins.rename({ prefix: "_" }))
        .pipe(gulp.dest(config.main + '/scss/includes'));
});

gulp.task('css', function() {
    return gulp.src(config.main + '/scss/style.scss')
        .pipe(plugins.sass({ style: 'nested'}) //'compact', //'compressed',
            .on("error", plugins.notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(plugins.sourcemaps.init({loadMaps: true}))
        .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(config.build + '/css'));
});

gulp.task('vendorJs', function () {
    return gulp.src([
        config.vendor + '/js/jquery.js',
        config.vendor + '/js/angular.js',
        config.vendor + '/js/angular-ui-router.min.js',
        config.vendor + '/js/angular-resource.js',
        config.vendor + '/js/bootstrap.js'
    ])
        .pipe(plugins.concat('vendor.js'))
        //.pipe(uglify())
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(gulp.dest(config.build +'/js'));
});

gulp.task('appJs', function() {
    return  gulp.src([
        config.main + '/js/app.js',
        config.main + '/js/routes.js',
        config.directives + '/*',
        config.services + '/*',
        config.factories + '/*',
        config.modules + '/**/js/*'
    ])
        .pipe(plugins.concat('app.js'))
        //.pipe(uglify())
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(gulp.dest(config.build +'/js'));
});

gulp.task('statics', function() {
    return gulp.src([config.statics + '/**/*'], { dot: true })
        .pipe(gulp.dest(config.build));
});

gulp.task('staticModuleImg', function() {
    return gulp.src(config.modules + '/**/img/*')
        .pipe(plugins.rename({ dirname: ''}))
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('watch', function() {
    gulp.watch(config.main +        '/jade/*', ['jadeIndex']);
    gulp.watch(config.modules +     '/**/jade/*', ['jadeModule']);
    gulp.watch(config.modules +     '/**/scss/*', ['cssModule', 'css']);
    gulp.watch(config.vendor +      '/scss/*', ['cssVendor', 'css']);
    gulp.watch(config.main +        '/scss/*', ['css']);
    gulp.watch(config.vendor +      '/js/*', ['vendorJs']);
    gulp.watch(config.modules +     '/**/js/*', ['appJs']);
    gulp.watch(config.main +        '/js/*', ['appJs']);
    gulp.watch(config.directives +  '/*', ['appJs']);
    gulp.watch(config.services +    '/*', ['appJs']);
    gulp.watch(config.factories +   '/*', ['appJs']);
    gulp.watch(config.statics +     '/**/*', ['statics']);
    gulp.watch(config.modules +     '/**/img/*', ['staticModuleImg']);
    plugins.livereload.listen();                                                        // Create LiveReload server
    gulp.watch([config.build + '/**/*']).on('change', plugins.livereload.changed);      // Watch any files in dist, reload on change
});

// DEFAULT TASKS + LiveRELOAD _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
gulp.task('default', [
    'jadeIndex', 'jadeModule',
    'css', 'cssModule', 'cssVendor',
    'vendorJs', 'appJs',
    'statics', 'staticModuleImg',
    'watch' ]);
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -