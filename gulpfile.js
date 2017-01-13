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


//var config = require('');



var client_dev = './src_old2';
var client_pro = './dist/public';
var server_pro = './dist';


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

    gulp.src(client_dev + '/lib/**/*.js')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(client_pro + '/js/libs/'));

    gulp.src(client_dev + '/scripts/**/*.js')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(jshint())
            //.pipe(jshint.reporter('default'))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(client_pro + '/js'));

    gutil.log('Finish JS');

});


gulp.task('compress-img', function () {

    console.log(color('Compress Images...', 'CYAN'));
    gulp.src([client_dev + '/images/*.*'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(imagemin())
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(client_pro + '/images/'));
});


gulp.task('compress-sass', function () {

    console.log(color('Compress SASS...', 'CYAN'));
    gulp.src([client_dev + '/lib/**/*.{sass,scss,css}', client_dev + '/styles/**/*.{sass,scss,css}'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(concat('app.css'))
            .pipe(rename('app.min.css'))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(client_pro + '/css'));
});


gulp.task('replace-html', function () {
    console.log(color('Replace html...', 'CYAN'));

    gulp.src(client_dev + '/index.html')
            .pipe(htmlreplace({
                'clean': '',
                'css': 'css/app.min.css',
                'js': ['js/libs/libs.min.js', 'js/app.min.js']
            }))
            //.pipe(rename('index.html'))
            .pipe(gulp.dest(client_pro));

});


gulp.task('compress-html', function () {
    return gulp.src(client_dev + '/partials/**/*.html')
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(client_pro + '/partials'));
});


gulp.task('copy-server', function () {
    console.log(color('Copy server...', 'CYAN'));
    gulp.src([
        'server/**/*', 
        '!server/core/config.js'
    ], {base: "."}).pipe(gulp.dest(server_pro));



    gulp.src(["server/core/config.js"])
            .pipe(replace('production: false', 'production: true', {}))
            .pipe(replace('log: true', 'log: false', {}))
            .pipe(replace("client: './src'", "client: './public'", {}))
            .pipe(rename('config.js'))
            .pipe(gulp.dest(server_pro + '/server/core/'));

});


gulp.task('copy-others', function () {
    console.log(color('Copy others...', 'CYAN'));
    gulp.src('package.json', {base: "."}).pipe(gulp.dest(server_pro));
    gulp.src(client_dev + '/favicon.ico', {base: "."}).pipe(rename('favicon.ico')).pipe(gulp.dest(client_pro));
});







gulp.task('dev-compress-sass', function () {
    console.log(color('Sass compile..', 'CYAN'));
    gulp.src(client_dev + '/styles/**/*.{sass,scss,css}')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            //.pipe(concat('app.css'))
            .pipe(rename('app.css'))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(client_dev));
});



gulp.task('sass-watch', function () {
    console.log(color('SASS watching...', 'CYAN'));
    gulp.watch(client_dev + '/styles/**/*.{sass,scss,css}', ['dev-compress-sass']);
});






//gulp.watch('js/source/*.js', ['js']);

gulp.task('serve', ['sass-watch'], function () {

    nodemon({
        script: './server/app.js',
        //task: ['sass-watch'],
        //      watch: ['sass-watch']
    });

});


