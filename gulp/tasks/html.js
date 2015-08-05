'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

import config from '../config';
import utils from '../utils';

gulp.task('html', 'Optimize HTML', () =>{
  return utils.plumbedSrc(
      config.html.src
  )

  // Display the files in the stream
  //.pipe($.debug({title: 'Stream contents:', minimal: true}))

  // Inject production assets path: https://www.npmjs.com/package/gulp-html-replace
  .pipe($.htmlReplace({
    'css-vendor': config.styles.finalVendorCssBundlePath,
    'css-bundle': config.styles.finalCssBundlePath,
    'js-app': config.javascript.finalJsBundlePath
  }))

  // Minify HTML
  .pipe($.iff(config.files.any + config.extensions.html, $.minifyHtml()))

  // Output files
  .pipe(gulp.dest(config.html.dest))

  // Task result
  .pipe($.size({
    title: 'html'
  }));
});
