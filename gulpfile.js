/**
 * 
 * @type Module Gulp by nodeTomic
 */
/* var libs*/
var gulp = require('gulp'),
        gutil = require('gulp-util'),
        jshint = require('gulp-jshint'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        plumber = require('gulp-plumber'),
        nodemon = require('gulp-nodemon'),
        color = require('gulp-color'),
        rename = require('gulp-rename'),
        htmlreplace = require('gulp-html-replace'),
        htmlmin = require('gulp-htmlmin'),
        clean = require('gulp-rimraf'),
        replace_string = require('gulp-replace'),
        replace = require('gulp-string-replace'),
        runSequence = require('run-sequence'),
        open = require("open"),
        livereload = require('gulp-livereload'),
        spawn = require('child_process').spawn,
        filter = require('gulp-filter'),
        order = require("gulp-order"),
        mainBowerFiles = require('main-bower-files'),
        wiredep = require('wiredep').stream,
        strip = require('gulp-strip-comments'),
        obfuscate = require('gulp-obfuscate'),
        node;

var inject = require("gulp-inject");

/* var config*/
var configDev = require('./server/config/index'),
        configPro = require('./server/config/production'),
        path_root = './dist',
        path_client_from = configDev.client,
        path_client_to = path_root + '/' + configPro.client,
        color_compile = 'BLUE',
        color_success = 'GREEN',
        color_watch = 'YELLOW';


//gulp.task('default', ['start:server']);
//gulp.watch('js/source/*.js', ['js']);

/*
 * COMMAND SERVE
 */

gulp.task('serve', ['serve:start', 'inject:bower', 'dev-sass-compile', 'serve:livereload', 'serve:watch']);

gulp.task('serve:start', function () {
    if (node)
        node.kill();
    node = spawn('node', ['./server/app.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('serve:livereload', function () {
    livereload.listen(
            {
                basePath: path_client_from,
                host: configDev.livereload.ip,
                port: configDev.livereload.port
            }
    );
});

gulp.task('serve:watch', function () {
    gulp.watch(['./server/**/*.js'], ['serve:start']);
    gulp.watch(path_client_from + '/styles/**/*.{sass,scss,css}', ['dev-sass-compile']);
    gulp.watch('./bower.json', ['inject:bower']);
});

// clean up if an error goes unhandled.
process.on('exit', function () {
    if (node)
        node.kill();
});

/*
 * TASKS SERVE
 */



gulp.task('inject:bower', function () {

    return gulp.src(path_client_from + '/index.html')
            .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower'}))
            .pipe(gulp.dest(path_client_from))
            .pipe(livereload());

//    return gulp.src(path_client_from + '/index.html')
//            .pipe(wiredep({
//                directory: './bower_components',
//                ignorePath: '..'
//            }))
//            .pipe(gulp.dest(path_client_from));
});

gulp.task('dev-sass-compile', function () {
    console.log(color('SASS Compile...', 'BLUE'));
    gulp.src(path_client_from + '/styles/**/*.{sass,scss,css}')
            .pipe(plumber())
            //.pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('app.css'))
            //.pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_from + '/'))
            .pipe(livereload());
});

/*
 * COMMAND DIST
 */

gulp.task('serve-dist', function () {
    nodemon({
        script: './dist/server/app.js',
        //watch: ['dev-sass-watch']
        //tasks: ['dev-sass-compile']
    });
});

/*
 * COMMAND BUILD
 */

gulp.task('build', function () {
    runSequence(
            'build:clean',
            [
                'build:scripts'
            ],
            [
                'build:styles'
            ],
            [
                'replace:paths:html',
                'build:htmls'
            ],
            'build:images',
            [
                'build:server',
                'build:server:production'
            ],
            'build:extra:files',
            [
                'build:bower:js',
                'build:bower:css'
            ]
            )
});

/*
 * TASKS BUILD
 */

gulp.task('build:clean', function () {
    return gulp.src(path_root + "/*", {read: false}).pipe(clean());
});

gulp.task('build:scripts', function () {
    return gulp.src([path_client_from + '/lib/**/*.js', path_client_from + '/scripts/**/*.js'])
            .pipe(plumber()).pipe(sourcemaps.init())
            .pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(concat('app.js')).pipe(uglify())
//            .pipe(obfuscate())
            .pipe(sourcemaps.write('../maps'))
            .pipe(gulp.dest(path_client_to + '/js'));
});

gulp.task('build:styles', function () {
    return  gulp.src([path_client_from + '/lib/**/*.{sass,scss,css}', path_client_from + '/styles/**/*.{sass,scss,css}'])
            .pipe(plumber()).pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(concat('app.css')).pipe(sourcemaps.write('../maps'))
            .pipe(gulp.dest(path_client_to + '/css'));
});

gulp.task('replace:paths:html', function () {
    return gulp.src(path_client_from + '/index.html')
            .pipe(htmlreplace({
                'clean': '',
                'css': [
                    'css/vendor.css',
                    'css/app.css',
                ],
                'js': [
                    'js/vendor.js',
                    'js/app.js'
                ]
            }))
            .pipe(strip({safe: true}))
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(path_client_to));
});

gulp.task('build:htmls', function () {
    return gulp.src(path_client_from + '/partials/**/*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(path_client_to + '/partials'));
});

gulp.task('build:images', function () {
    return gulp.src([path_client_from + '/images/*.*'])
            .pipe(plumber()).pipe(sourcemaps.init())
            .pipe(imagemin())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/images/'));
});

gulp.task('build:server', function () {
    return gulp.src([
        'server/**/*',
        '!server/config/**',
        '!server/core/engine.js',
        '!server/core/dev.js'
    ], {base: "."}).pipe(gulp.dest(path_root));

});

gulp.task('build:server:production', function () {
    gulp.src(["server/config/production.js"])
            .pipe(rename('index.js'))
            .pipe(gulp.dest(path_root + '/server/config'));

    gulp.src("server/core/engine.js")
            .pipe(replace_string("require('./dev')(app);", ''))
            .pipe(gulp.dest(path_root + '/server/core/'));
});

gulp.task('build:extra:files', function () {
    gulp.src('package.json').pipe(gulp.dest(path_root));
    gulp.src(path_client_from + '/favicon.ico').pipe(gulp.dest(path_client_to));
});

/*
 * BOWER BUILD
 */
//var mainBowerFiles = require('gulp-main-bower-files');

gulp.task('build:bower:js', function () {
    return gulp.src(mainBowerFiles())
            .pipe(plumber()).pipe(sourcemaps.init()).pipe(filter('**/*.js'))
            .pipe(concat('vendor.js')).pipe(uglify()).pipe(sourcemaps.write('../maps'))
            .pipe(gulp.dest(path_client_to + '/js'));
});

gulp.task('build:bower:css', function () {
    return gulp.src(mainBowerFiles())
            .pipe(plumber()).pipe(sourcemaps.init()).pipe(filter('**/*.css'))
            .pipe(order([
                'normalize.css',
                '*'
            ]))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(concat('vendor.css')).pipe(sourcemaps.write('../maps'))
            .pipe(gulp.dest(path_client_to + '/css'));
});