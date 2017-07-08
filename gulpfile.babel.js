import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import clean from 'gulp-rimraf';
import chalk from 'chalk';
import minify from 'gulp-minifier';
import replace_string from 'gulp-replace';
import runSequence from 'run-sequence';
import jeditor from "gulp-json-editor";
import fs from 'fs';
import config from './src/config';

const dist = './dist';
const dist_server = `${dist}/server`;
const dist_swagger = `${dist}/api-docs`;
const dist_package = `${dist}/package.json`;
const dist_client = `${dist}/client`;

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
  gulp.src("package.json").pipe(jeditor((json) => {
    delete json.devDependencies;
    json.scripts = {
      start: `node server/app.js`
    };
    return json;
  })).pipe(gulp.dest(dist));

  if (!fs.existsSync(`${dist}/client`)) {
    gulp.src(['client/*']).pipe(gulp.dest(dist_client));
  }
  setTimeout(() => console.log(chalk.greenBright('\n---------\nBuild success!\n---------\n')), 500);
});
