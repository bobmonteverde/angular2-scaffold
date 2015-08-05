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
  //return utils.plumbedSrc(
      //config.styles.src
  //)
  //TODO: figure out why the above src isn't working correctly, but below is
  return gulp.src([
    'app/styles/*.scss',
    'app/styles/**/*.css',
    'app/styles/components/components.scss'
  ])
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

    /*
    //TODO: see if below makes sense instead of above
  // Include vendor prefixes
  // The if clause prevents autoprefixer from messing up the sourcemaps (necessary if the maps are put in separate files)
  // reference: https://github.com/sindresorhus/gulp-autoprefixer/issues/8#issuecomment-93817177
  .pipe(iff([ config.extensions.css, '!*.map' ], autoprefixer({
    browsers: config.autoprefixerBrowsers // alternative: $.autoprefixer('last 2 version')
  })))
 */


  //.pipe(gulp.dest('dist/styles'))
  .pipe(gulp.dest(config.styles.destDist))

  // Task result
  .pipe($.size({
    title: 'styles'
  }));
});
