'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from '../config';
import utils from '../utils';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

$.help(gulp); // provide help through 'gulp help' -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)


// Generates the app.d.ts references file dynamically from all application *.ts files.
gulp.task('gen-ts-refs', () => {
    var target = gulp.src(config.files.appTypeScriptReferences);
    var sources = gulp.src(config.typescript.srcAppOnly, {read: false});
    return target.pipe($.inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: (filepath) => {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.folders.typings));
});

