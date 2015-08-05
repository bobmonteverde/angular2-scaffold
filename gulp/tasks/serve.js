
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from '../config';
import utils from '../utils';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

$.help(gulp); // provide help through 'gulp help' -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)


// Watch files for changes & reload
gulp.task('serve', ['styles'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    // logPrefix: 'WSK', //TODO: decide if I should use a custom prefix here
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    //server: ['.tmp', 'app']
    server: config.webServerFolders.dev
  });

  //gulp.watch(['app/**/*.html'], reload);
  gulp.watch([config.html.src], browserSync.reload);
  //gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch([config.styles.src], ['styles', browserSync.reload]);
  //gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch([config.javascript.src], browserSync.reload);
  //gulp.watch(['app/images/**/*'], reload);
  gulp.watch([config.images.src], browserSync.reload);
});

