'use strict';

import utils from './utils';

let extensions = {
  javascript: '.js',
  typescript: '.ts',
  css: '.css',
  sass: '.scss',
  html: '.html'
  //TODO: add fonts
};

let folders = {
  root: '.',
  dist: './dist',
  temp: './.tmp',
  app: './app',
  styles: '/styles',
  scripts: '/scripts',
  images: '/images',
  fonts: '/fonts',
  typings: './typings',
  nodeModules: './node_modules',
  jspmPackages: './jspm_packages'
};

let globs = {
  any: '/**/*',
  scripts: {
    javascript: '/**/*' + extensions.javascript,
    typescript: '/**/*' + extensions.typescript
  },
  styles: {
    css: '/**/*' + extensions.css,
    sass: '/**/*' + extensions.sass,
    vendor: folders.styles + '/vendor{' + extensions.sass + ',' + extensions.css + '}'
  },
  images: folders.images + '/**/*',
  html: '/**/*' + extensions.html,
  fonts: '/**/*' //TODO: add font extensions
};

let files = {
  any: '*',
  packageJSON: folders.root + '/package.json',
  appTypeScriptReferences: folders.typings + '/typescriptApp.d.ts',
  libraryTypeScriptDefinitions: folders.typings + globs.scripts.typescript,
  jspmConfigFile: folders.root + '/config.js' //'/jspm.conf.js' TODO: consider renaming /config.js to jspm.config.js for clarity
};

let webServerFolders = {
  dev: [
    folders.root, // necessary to have jspm_packages & jspm config file without needing a copy step
    folders.temp,
    folders.app
  ],
  dist: [
    folders.dist
  ]
};

let finalJsBundleName = 'bundle.min.js';

let javascript = {
  src: [
    folders.app + globs.scripts.javascript
  ],
  srcDist: folders.temp + '/core/core.bootstrap.js',
  dest: folders.temp,
  destDist: folders.dist + folders.scripts + '/' + finalJsBundleName,
  finalJsBundlePath: folders.scripts + '/' + finalJsBundleName
};

let typescript = {
  src: [
    folders.app + globs.scripts.typescript,
    files.libraryTypeScriptDefinitions, // reference to library .d.ts files
    files.appTypeScriptReferences // reference to app.d.ts files
  ],
  srcAppOnly: [
    folders.app + globs.scripts.typescript
  ],
  dest: folders.temp
};

let styles = {
  src: [
    folders.app + globs.styles.css,
    folders.app + globs.styles.sass
  ],
  srcVendorOnly: [
    folders.app + globs.styles.vendor
  ],
  srcWithoutVendor: [
    folders.app + globs.styles.css,
    folders.app + globs.styles.sass,
    utils.exclude(folders.app + globs.styles.vendor)
  ],
  //dest: folders.temp, // during DEV
  dest: folders.temp + folders.styles, // during DEV
  destDist: folders.dist + folders.styles, // for PROD
  finalCssBundleFilename: 'bundle.min.css',
  finalCssBundlePath: folders.styles + '/bundle.min.css',
  finalVendorCssBundleFilename: 'vendor.min.css',
  finalVendorCssBundlePath: folders.styles + '/vendor.min.css'
};

let images = {
  src: [
    folders.app + globs.images
  ],
  dest: folders.dist + folders.images
};

let html = {
  src: [
    folders.app + globs.html
  ],
  dest: folders.dist
};

let fonts = {
  src: [
    folders.app + globs.fonts
  ],
  dest: folders.dist + folders.fonts
};

let copy = {
  src: [
    folders.app + globs.any,

    // ignore stuff handled by the other tasks
    utils.exclude(folders.app + globs.html),
    utils.exclude(folders.app + globs.styles.css),
    utils.exclude(folders.app + globs.styles.sass),
    utils.exclude(folders.app + globs.scripts.javascript),
    utils.exclude(folders.app + globs.scripts.typescript)
    //TODO: add fonts, maybe?
  ],
  dest: folders.dist
};

let autoprefixerBrowsers = [
'ie >= 10',
'ie_mob >= 10',
'ff >= 30',
'chrome >= 34',
'safari >= 7',
'opera >= 23',
'ios >= 7',
'android >= 4.4',
'bb >= 10'
];

let minifyCss = { // https://www.npmjs.com/package/gulp-minify-g
  keepBreaks: false, // no problem here
  keepSpecialComments: true, // necessary for licensing
  compatibility: false, // no problem here
  aggressiveMerging: false // necessary because it breaks PureCSS
};

module.exports = {
  extensions,
  folders,
  globs,
  files,
  javascript,
  typescript,
  styles,
  images,
  html,
  fonts,
  copy,
  autoprefixerBrowsers,
  minifyCss,
  webServerFolders
};
