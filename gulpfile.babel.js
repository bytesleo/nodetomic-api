/*
*@Author: Leonardo Rico Guevara
*@Github: https://github.com/kevoj
*/
import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import clean from 'gulp-rimraf';
import color from 'gulp-color';
import minify from 'gulp-minifier';
import replace_string from 'gulp-replace';
import runSequence from 'run-sequence';
import jsonModify from 'gulp-json-modify';
import config from './src/config';

const dist = './dist';
const dist_server = `${dist}/server`;
const dist_swagger = `${dist}/api-docs`;
const dist_package = `${dist}/package.json`;

gulp.task('build', () => {
  runSequence('build-clean', 'build-babel', 'build-replace');
});

gulp.task('build-clean', () => {
  return gulp.src([
    `${dist_server}/*`, `!${dist_server}/assets`, dist_swagger, dist_package
  ], {read: false}).pipe(clean({force: true}));
});

gulp.task('build-babel', () => {
  return gulp.src(['src/**/*.js', '!src/core/dev.js', '!src/config/*.js']).pipe(babel()).pipe(gulp.dest(dist_server));
});

gulp.task('build-replace', () => {
  gulp.src(["src/config/production.js"]).pipe(babel()).pipe(rename('index.js')).pipe(gulp.dest(`${dist_server}/config`));
  gulp.src(['src/views/**/*.{html,css}']).pipe(minify({minify: true, collapseWhitespace: true, conservativeCollapse: true, minifyJS: true, minifyCSS: true})).pipe(gulp.dest(`${dist_server}/views`));
  gulp.src(['src/assets/**/*']).pipe(gulp.dest(`${dist_server}/assets`));
  gulp.src(['src/**/*.yaml']).pipe(gulp.dest(dist_server));
  gulp.src([`api-docs/*`]).pipe(gulp.dest(dist_swagger));
  gulp.src(`${dist_server}/core/engine.js`).pipe(replace_string("require('./dev').default(app);", '')).pipe(gulp.dest(`${dist_server}/core`));
  gulp.src('package.json').pipe(jsonModify({'key': 'devDependencies', value: {}})).pipe(gulp.dest(dist));
  setTimeout(() => console.log(color('Build success!', 'GREEN')), 500);
});
