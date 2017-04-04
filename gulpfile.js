/*
*@Author: Leonardo Rico
@Github: https://github.com/kevoj
*/

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    clean = require('gulp-rimraf'),
    color = require('gulp-color'),
    replace_string = require('gulp-replace'),
    runSequence = require('run-sequence'),
    jsonModify = require('gulp-json-modify');

var dist = './dist';
var dist_server = dist + '/server';

gulp.task('serve:build:clean', function() {
    return gulp.src([dist + "/server/*"], {read: false}).pipe(clean({force: true}));
});

gulp.task('serve:build:replace', function() {
    gulp.src([dist_server + "/config/production.js"]).pipe(rename('index.js')).pipe(gulp.dest(dist_server + '/config'));
    gulp.src([
        dist_server + "/config/production.js",
        dist_server + "/core/dev.js"
    ], {read: false}).pipe(clean({force: true}));
    gulp.src(dist_server + "/core/engine.js").pipe(replace_string("require('./dev').default(app);", '')).pipe(gulp.dest(dist_server + '/core/'));
    gulp.src('package.json').pipe(jsonModify({'key': 'devDependencies', value: {}})).pipe(gulp.dest(dist));
    setTimeout(function() {
        console.log(color('Build success!', 'GREEN'));
    }, 500);
});
