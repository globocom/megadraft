#!/usr/bin/env node

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

var rimraf = require('rimraf');
var execSync = require('child_process').execSync;
var fs = require('fs');

var NODE_MODULES = 'node_modules/.bin/';

function run (cmd) {
  console.log('-> ' + cmd);
  return execSync(NODE_MODULES + cmd, {stdio: [0, 1, 2]});
}

console.log('# Cleaning up lib/');
rimraf.sync('lib/');

console.log('# Transpiling source');
run('babel --copy-files -d lib/ src/');

console.log('# Converting SVG to React');
run('svg2react lib/icons/*');

console.log('# Transpiling icons');
run('babel -d ./ lib/icons/*.react.js');

console.log('# Renaming icons to original import names');
var file, fullPath, newName;
var files = fs.readdirSync('lib/icons');
for (var i = 0; i < files.length; i++) {
  file = files[i];
  if (!file.endsWith('.react.js')) {
    continue;
  }

  fullPath = 'lib/icons/' + file;
  newName = fullPath.replace('.react.js', '');

  console.log(fullPath, '->', newName);

  fs.renameSync(fullPath, newName);
}

console.log('# Building lib: done!');
