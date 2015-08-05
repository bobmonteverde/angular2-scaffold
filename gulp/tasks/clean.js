'use strict';

import gulp from 'gulp';
import del from 'del';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

$.help(gulp); // provide help through 'gulp help' -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)

import config from '../config';
import utils from '../utils';

gulp.task('clean', 'Clean output directories',
  del.bind(null, [
      config.folders.temp,
      config.folders.dist + config.globs.any
    ], {
      dot: true
    }
  )
);
