var gulp = require('gulp');

gulp.task('watch', [
    // 'copy:watch',
    'sprite:svg:watch',
    'sprite:png:watch',
    'nunjucks:watch',
    'js:watch',
    // 'webpack:watch',
    'list-pages:watch',
    'sass:watch'
]);
