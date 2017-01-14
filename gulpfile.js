/*
 * Dependencias
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
        notify = require("gulp-notify"),
        color = require('gulp-color'),
        rename = require('gulp-rename'),
        htmlreplace = require('gulp-html-replace'),
        htmlmin = require('gulp-htmlmin'),
        clean = require('gulp-clean'),
        replace = require('gulp-string-replace');


var configDev = require('./server/config/index');
var configPro = require('./server/config/production');
var path_root = './dist';
var path_client_from = configDev.client;
var path_client_to = path_root + '/' + configPro.client;




//gulp.task('default', ['clean']);


gulp.task('build', [
//    'clean',
    'compress-js',
    'compress-sass',
    'compress-img',
    'copy-server',
    'replace-html',
    'compress-html',
    'copy-others'

], function () {
    console.log(color('Enjoy!', 'GREEN'));
});


//gulp.task('clean', function () {
//    console.log(color('Clean...', 'GREEN'));
//    return gulp.src(server_pro, {read: false})
//            .pipe(clean());
//});


gulp.task('compress-js', function () {

    console.log(color('Compress JS...', 'CYAN'));

    gulp.src(path_client_from + '/lib/**/*.js')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/js/libs/'));

    gulp.src(path_client_from + '/scripts/**/*.js')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/js'));

    gutil.log('Finish JS');

});


gulp.task('compress-img', function () {

    console.log(color('Compress Images...', 'CYAN'));
    gulp.src([path_client_from + '/images/*.*'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(imagemin())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/images/'));
});


gulp.task('compress-sass', function () {

    console.log(color('Compress SASS...', 'CYAN'));
    gulp.src([path_client_from + '/lib/**/*.{sass,scss,css}', path_client_from + '/styles/**/*.{sass,scss,css}'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(concat('app.css'))
            .pipe(rename('app.min.css'))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_to + '/css'));
});


gulp.task('replace-html', function () {
    console.log(color('Replace html...', 'CYAN'));

    gulp.src(path_client_from + '/index.html')
            .pipe(htmlreplace({
                'clean': '',
                'css': 'css/app.min.css',
                'js': ['js/libs/libs.min.js', 'js/app.min.js']
            }))
            //.pipe(rename('index.html'))
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(path_client_to));

});


gulp.task('compress-html', function () {
    return gulp.src(path_client_from + '/partials/**/*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(path_client_to + '/partials'));
});


gulp.task('copy-server', function () {

    console.log(color('Copy server...', 'CYAN'));
    gulp.src([
        'server/**/*',
        '!server/config/**',
    ], {base: "."}).pipe(gulp.dest(path_root));


    gulp.src(["server/config/production.js"])
            .pipe(rename('index.js'))
            .pipe(gulp.dest(path_root + '/server/config'));


    //replace object
//    gulp.src(["server/core/config.js"])
//            .pipe(replace('production: false', 'production: true', {}))
//            .pipe(replace('log: true', 'log: false', {}))
//            .pipe(replace("client: './src'", "client: './public'", {}))
//            .pipe(rename('config.js'))
//            .pipe(gulp.dest(server_pro + '/server/core/'));

});


gulp.task('copy-others', function () {
    console.log(color('Copy others...', 'CYAN'));
    gulp.src('package.json', {base: "."}).pipe(gulp.dest(path_root));
    gulp.src(path_client_from + '/favicon.ico', {base: "."}).pipe(rename('favicon.ico')).pipe(gulp.dest(path_client_to));
});







gulp.task('dev-compress-sass', function () {
    console.log(color('Sass compile..', 'CYAN'));
    gulp.src(path_client_from + '/styles/**/*.{sass,scss,css}')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            //.pipe(concat('app.css'))
            .pipe(rename('app.css'))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(path_client_from));
});



gulp.task('sass-watch', function () {
    console.log(color('SASS watching...', 'CYAN'));
    gulp.watch(path_client_from + '/styles/**/*.{sass,scss,css}', ['dev-compress-sass']);
});






//gulp.watch('js/source/*.js', ['js']);

gulp.task('serve', ['sass-watch'], function () {

    nodemon({
        script: './server/app.js',
        //task: ['sass-watch'],
        //      watch: ['sass-watch']
    });

});


