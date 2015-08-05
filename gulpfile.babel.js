/*
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulp/tasks. Any files in that directory get
 automatically required below.

 To add a new task, simply add a new task file that directory.
 gulp/tasks/default.js specifies the default set of tasks to run
 when you run `gulp`.

 Principle taken from gulp-starter: https://github.com/greypants/gulp-starter
 Principle taken from midnightLightV2: https://github.com/dsebastien/midnightLightV2
 */

'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

//import help from 'gulp-help';
$.help(gulp); // provide help through 'gulp help' -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)


// Load all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', {
  recurse: true
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  console.log('gulp default task');
  //gulp.start('build');
});
