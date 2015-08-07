
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from '../config';
import utils from '../utils';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

$.help(gulp); // provide help through 'gulp help' -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)


// Watch files for changes & reload
let startBrowserSync = () => {
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

  gulp.watch([config.html.src], browserSync.reload);
  gulp.watch([config.styles.src], ['styles', browserSync.reload]);
  gulp.watch(config.typescript.srcAppOnly, [
    //'ts-lint',
    'scripts-typescript'
    //'gen-ts-refs'
  ]); // TypeScript changes will force a reload
  gulp.watch([config.javascript.src], browserSync.reload);
  gulp.watch([config.images.src], browserSync.reload);
};


//gulp.task('serve', 'Watch files for changes and rebuild/reload automagically', () =>{
gulp.task('serve', () =>{
  runSequence('prepare-serve', startBrowserSync); // here we need to ensure that all the other tasks are done before we start BrowserSync
});


//gulp.task('prepare-serve', 'Do all the necessary preparatory work for the serve task', (callback) =>{
gulp.task('prepare-serve', (callback) => {
  return runSequence([
    //'gen-ts-refs',
    //'scripts-javascript',
    'scripts-typescript',
    'styles'
    //'validate-package-json'
  ], callback);
});
