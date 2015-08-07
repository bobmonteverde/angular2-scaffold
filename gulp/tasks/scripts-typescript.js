'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from '../config';
import utils from '../utils';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

$.help(gulp); // provide help through 'gulp help' -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)


gulp.task('scripts-typescript', 'Transpile TypeScript to ES5, include references to library and app .d.ts files and generate sourcemaps', () =>{

  // references:
  // https://www.npmjs.com/package/gulp-typescript
  let tsProject = $.ts.createProject('tsconfig.json', {
    typescript: require('typescript'), // override the typescript version by that defined in package.json

    // other overrides here if needed
    // http://json.schemastore.org/tsconfig
    // https://github.com/Microsoft/TypeScript/wiki/Compiler%20Options
  });

  let tsResult = utils.plumbedSrc(config.typescript.src) // handle errors nicely (i.e., without breaking watch)
    .pipe($.sourcemaps.init())
    .pipe($.ts(
      tsProject
    ));

  // Output files
  tsResult.dts.pipe(gulp.dest(config.typescript.dest));

  return tsResult.js
    .pipe($.sourcemaps.write({ // use '.' to write the sourcemap to a separate file in the same dir
      includeContent: false, // alternative: include the contents and remove sourceRoot. Avoids issues but prevents from editing the sources directly in the browser
      sourceRoot: '/' // use an absolute path because we have scripts in different subpaths
    }))

    // Output files
    .pipe(gulp.dest(config.typescript.dest))

    // Task result
    .pipe($.size({
      title: 'scripts-typescript'
    }))

    // Reload Browser if needed
    .pipe($.if(browserSync.active, browserSync.reload({
      stream: true, once: true
    })));
});
