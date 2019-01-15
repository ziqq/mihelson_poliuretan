var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('../config');

function buildDevelopment(cb) {
    runSequence(
        'clean',
        // 'sprite:png',
        // 'sprite:svg:build',
        'svgo',
        'sass',
        // 'sass:libs',
        'nunjucks',
        'js:all',
        // 'webpack',
        'copy',
        'list-pages',
        cb
    );
}

function buildProduction(cb) {
    runSequence(
        'clean',
        // 'sprite:png',
        // 'sprite:svg:build',
        'svgo',
        'sass',
        'nunjucks',
        'js:all',
        // 'webpack',
        'copy:production',
        'list-pages',
        cb
    );
}

gulp.task('build', function(cb) {
    config.setEnv('production');
    config.logEnv();
    buildProduction(cb);
});

gulp.task('build:dev', function(cb) {
    config.setEnv('development');
    config.logEnv();
    buildDevelopment(cb);
});
