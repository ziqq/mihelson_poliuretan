var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');
var config = require('../config.js');

gulp.task('copy:fonts', function() {
    return gulp
        .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:libs', function() {
    return gulp
        .src(config.src.libs + '/**/*.*')
        .pipe(gulp.dest(config.dest.libs));
});

gulp.task('copy:rootfiles', function() {
    return gulp
        .src([config.src.root + '/*.*', '!' + config.src.assets + '/**/*.*'])
        .pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', function() {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,7z,mp4}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(newer(config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,7z}'))
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:img:production', function() {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,mp4}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(
            imagemin({
                optimizationLevel: 3
            })
        )
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy', function(cp) {
    runSequence('copy:img', 'copy:rootfiles', 'copy:fonts', 'copy:libs', cp);
});

gulp.task('copy:production', function(cp) {
    runSequence(
        'copy:img:production',
        'copy:rootfiles',
        'copy:fonts',
        // 'copy:libs',
        cp
    );
});

gulp.task('copy:watch', function() {
    gulp.watch(config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}', ['copy:img']);
});
