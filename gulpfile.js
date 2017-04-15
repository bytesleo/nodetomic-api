/*
*@Author: Leonardo Rico
*@Github: https://github.com/kevoj
*/

const gulp = require('gulp'),
    rename = require('gulp-rename'),
    clean = require('gulp-rimraf'),
    color = require('gulp-color'),
    replace_string = require('gulp-replace'),
    runSequence = require('run-sequence'),
    jsonModify = require('gulp-json-modify'),
    babel = require('gulp-babel');

const dist = './dist';
const dist_server = dist + '/server';

gulp.task('build', function() {
    runSequence('build-clean', 'build-babel', 'build-replace');
});

gulp.task('build-clean', function() {
    return gulp.src([dist_server + "/*"], {read: false}).pipe(clean({force: true}));
});

gulp.task('build-babel', function() {
    return gulp.src(['src/**/*.js']).pipe(babel()).pipe(gulp.dest(dist_server));
});

gulp.task('build-replace', function() {
    gulp.src([dist_server + "/config/production.js"]).pipe(rename('index.js')).pipe(gulp.dest(dist_server + '/config'));
    gulp.src([
        dist_server + "/config/production.js",
        dist_server + "/core/dev.js"
    ], {read: false}).pipe(clean({force: true}));
    gulp.src(dist_server + "/core/engine.js").pipe(replace_string("require('./dev').default(app);", '')).pipe(gulp.dest(dist_server + '/core/'));
    gulp.src('package.json').pipe(jsonModify({'key': 'devDependencies', value: {}})).pipe(gulp.dest(dist));
    gulp.src(['src/views/*']).pipe(gulp.dest(dist_server + '/views'));
    gulp.src(['src/assets/*']).pipe(gulp.dest(dist_server + '/assets'));
    setTimeout(function() {
        console.log(color('Build success!', 'GREEN'));
    }, 500);
});
