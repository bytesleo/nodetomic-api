var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    rename = require('gulp-rename'),
    clean = require('gulp-rimraf'),
    color = require('gulp-color'),
    replace_string = require('gulp-replace'),
    runSequence = require('run-sequence');

var dist = './dist';

gulp.task('default', ['serve:start']);

// serve:start

gulp.task('serve:start', function() {
    var stream = nodemon({script: './server/app.js'});
    stream.on('restart', function() {
        console.log(color('Server restart: ' + new Date(), 'CYAN'));
    }).on('crash', function() {
        console.log(color('Server has crashed!\n', 'RED'));
        stream.emit('restart', 10);
    });
});

// serve:build

gulp.task('serve:build', function() {
    return runSequence('serve:build:clean', ['serve:build:start'], 'serve:build:extra')
});

gulp.task('serve:build:clean', function() {
    return gulp.src(dist + "/*", {read: false}).pipe(clean({force: true}));
});

gulp.task('serve:build:start', function() {
    return gulp.src([
        'server/**/*', '!server/config/**', '!server/core/engine.js', '!server/core/dev.js'
    ], {base: "."}).pipe(gulp.dest(dist));
});

gulp.task('serve:build:extra', function() {
    gulp.src(["server/config/production.js"]).pipe(rename('index.js')).pipe(gulp.dest(dist + '/server/config'));
    gulp.src("server/core/engine.js").pipe(replace_string("require('./dev')(app);", '')).pipe(gulp.dest(dist + '/server/core/'));
    gulp.src('package.json').pipe(gulp.dest(dist));
    setTimeout(function() {
        console.log(color('Build success!', 'GREEN'));
    }, 500);
});
