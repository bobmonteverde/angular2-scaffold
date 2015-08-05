'use strict';

import gulp from 'gulp';
import del from 'del';
import config from '../config';
import utils from '../utils';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

$.help(gulp); // provide help through 'gulp help' -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)


// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return utils.plumbedSrc(
      config.styles.src
  )
  .pipe($.sourcemaps.init())
  .pipe($.changed('.tmp/styles', {extension: '.css'}))
  .pipe($.sass({
    precision: 10,
    onError: console.error.bind(console, 'Sass error:')
  }))
  .pipe($.autoprefixer({browsers: config.autoprefixerBrowsers }))
  .pipe($.sourcemaps.write())

  .pipe(gulp.dest(config.styles.dest))
  // Concatenate and minify styles
  .pipe($.if('*.css', $.csso()))
  //.pipe(gulp.dest('dist/styles'))
  .pipe(gulp.dest(config.styles.destDist))

  // Task result
  .pipe($.size({
    title: 'styles'
  }));
});
