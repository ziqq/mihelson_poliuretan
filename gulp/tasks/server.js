var gulp = require('gulp');
var server = require('browser-sync').create();
var util = require('gulp-util');
var config = require('../config');

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me

gulp.task('server', function() {
    server.init({
        server: {
            baseDir: !config.production
                ? [config.dest.root, config.src.root]
                : config.dest.root,
            directory: false,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        files: [
            config.dest.html + '/*.html',
            config.dest.css + '/**/*.css',
            config.dest.js + '/**/*.js'
        ],
        port: util.env.port || 3000,
        logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
        logConnections: false,
        logFileChanges: true,
        open: Boolean(util.env.open),
        notify: false,
        ghostMode: false,
        online: Boolean(util.env.tunnel),
        tunnel: util.env.tunnel || null
    });
});

// gulp.task('server', function() {
//     server({
//         proxy: 'https://www.samesite.com',
//         files: [config.dest.css + '*.css'],
//         middleware: require('serve-static')('./build'),
//         rewriteRules: [
//             {
//                 match: new RegExp('</head>'),
//                 fn: function() {
//                     return '<script async src="/browser-sync/browser-sync-client.js?v=2.18.13"></script>' +
//                         '<link rel="stylesheet" href="/css/main.css" media="all"></script></head >'
//                 }
//             }
//         ],
//         port: 8080,
//         open: true
//     });
// });

module.exports = server;
