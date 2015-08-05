'use strict';

import gulp from 'gulp';
import config from '../config';
import utils from '../utils';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

help(gulp); // provide help through 'gulp help' -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)


// Copy web fonts to dist
gulp.task('fonts', function () {
  return utils.plumbedSrc(
      config.images.src
  )

  // Output files
  .pipe(gulp.dest(config.fonts.dest))

  // Task result
  .pipe($.size({title: 'fonts'}));
});
