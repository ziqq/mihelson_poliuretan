var config = require('../config');
var gulp = require('gulp');
var cached = require('gulp-cached');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csso = require('postcss-csso');
var browserSync = require('browser-sync');
var path = require('path');
var stream = browserSync.stream;

var processors = [
    autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }),
    mqpacker({
        sort: sortMediaQueries
    }),
    csso
];

gulp.task('sass', function() {
    return gulp
        .src(config.src.sass + '/**/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                // nested, expanded, compact, compressed
                outputStyle: config.production ? 'compressed' : 'expanded',
                precision: 5
            })
        )
        .on('error', config.errorHandler)
        .pipe(cached('styles'))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.css))
        .pipe(stream());
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['sass']).on(
        'unlink',
        function(filepath) {
            delete cached.caches.styles[path.resolve(filepath)];
        }
    );
});

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}
