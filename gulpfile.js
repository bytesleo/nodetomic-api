/**
 * 
 * @type Module nodetomic Gulp
 */
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
        connect = require('gulp-connect'),
        livereload = require('gulp-livereload');


var configDev = require('./server/config/index');
var configPro = require('./server/config/production');
var path_root = './dist';
var path_client_from = configDev.client;
var path_client_to = path_root + '/' + configPro.client;

var color_compile = 'BLUE';
var color_success = 'GREEN';
var color_watch = 'YELLOW';


//gulp.task('default', ['start:server']);
//gulp.watch('js/source/*.js', ['js']);

gulp.task('serve', ['start:livereload', 'dev-sass-watch'], function () {
    nodemon({
        script: './server/app.js',
        watch: ['dev-sass-watch']
//        //tasks: ['dev-sass-compile']
    }).on('restart', function () {
        console.log('restarted!')
    })
});


gulp.task('serve-dist', function () {
    nodemon({
        script: './dist/server/app.js'
    });
});


gulp.task('build', function () {
    runSequence(
            'build-clean',
            [
                'build-scripts',
                'build-scripts-libs'
            ],
            'build-styles',
            [
                'replace-paths-html',
                'build-htmls'
            ],
            'build-images',
            [
                'build-server',
                'build-server-production'
            ],
            'build-extra-files'
            )
});


gulp.task('start:livereload', function () {
    livereload.listen(
            {
                basePath: path_client_from,
                host: configDev.livereload.ip,
                port: configDev.livereload.port
            }
    );
});


/*
 * TASKS COMPILE TO PRODUCTION
 */

gulp.task('build-clean', function () {

    console.log(color('Clean all files in build folder...', color_success));

    return gulp.src(path_root + "/*", {read: false}).pipe(clean());

});


gulp.task('build-scripts', function () {

    console.log(color('build-scripts...', color_compile));

    return gulp.src(path_client_from + '/scripts/**/*.js')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/js'));

});


gulp.task('build-scripts-libs', function () {

    console.log(color('build-scripts-libs...', color_compile));

    return  gulp.src(path_client_from + '/lib/**/*.js')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/js/libs/'));


});


gulp.task('build-styles', function () {

    console.log(color('build-styles...', color_compile));

    return  gulp.src([path_client_from + '/lib/**/*.{sass,scss,css}', path_client_from + '/styles/**/*.{sass,scss,css}'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(concat('app.css'))
            .pipe(rename('app.min.css'))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/css'));
});


gulp.task('replace-paths-html', function () {

    console.log(color('replace-paths-html...', color_compile));

    return gulp.src(path_client_from + '/index.html')
            .pipe(htmlreplace({
                'clean': '',
                'css': 'css/app.min.css',
                'js': [
                    'js/libs/libs.min.js',
                    'js/app.min.js'
                ]
            }))
            //.pipe(rename('index.html'))
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(path_client_to));
});


gulp.task('build-htmls', function () {

    console.log(color('replace-paths-html...', color_compile));

    return gulp.src(path_client_from + '/partials/**/*.html')
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(gulp.dest(path_client_to + '/partials'));
});

gulp.task('build-images', function () {

    console.log(color('build-imgs', color_compile));

    return gulp.src([path_client_from + '/images/*.*'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(imagemin())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/images/'));
});


gulp.task('build-server', function () {

    console.log(color('build-server...', color_compile));

    return gulp.src([
        'server/**/*',
        '!server/config/**',
        '!server/core/engine.js',
        '!server/core/livereload.js'
    ], {base: "."}).pipe(gulp.dest(path_root));

});


gulp.task('build-server-production', function () {

    console.log(color('build-server...', color_compile));

    gulp.src(["server/config/production.js"])
            .pipe(rename('index.js'))
            .pipe(gulp.dest(path_root + '/server/config'));

    gulp.src("server/core/engine.js")
            .pipe(replace_string("require('./dev')(app);", ''))
            .pipe(gulp.dest(path_root + '/server/core/'));

//replace object
//    gulp.src(["server/core/config.js"])
//            .pipe(replace('production: false', 'production: true', {}))
//            .pipe(replace('log: true', 'log: false', {}))
//            .pipe(replace("client: './src'", "client: './public'", {}))
//            .pipe(rename('config.js'))
//            .pipe(gulp.dest(server_pro + '/server/core/'));

});


gulp.task('build-extra-files', function () {

    console.log(color('build-extra-files...', color_compile));

    gulp.src('package.json', {base: "."})
            .pipe(gulp.dest(path_root));

    gulp.src(path_client_from + '/favicon.ico', {base: "."})
            .pipe(rename('favicon.ico'))
            .pipe(gulp.dest(path_client_to));
});


/*
 * TASKS DEVELOPMENT
 */

gulp.task('dev-sass-compile', function () {

    console.log(color('Compile SASS', color_success));

    gulp.src(path_client_from + '/styles/**/*.{sass,scss,css}')
            .pipe(plumber())
            //.pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('app.css'))
            //.pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_from + '/'))
            .pipe(livereload());
});


gulp.task('dev-sass-watch', function () {

    console.log(color('SASS watching...', 'BLUE'));
    gulp.watch(path_client_from + '/styles/**/*.{sass,scss,css}', ['dev-sass-compile']);

});