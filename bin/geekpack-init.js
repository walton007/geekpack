#!/usr/bin/env node

'use strict';

const co = require('co');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const program = require('commander');
const util = require('../lib/util');
const log = util.getLogger('geekpack-init');

program
  .parse(process.argv);

const appname = program.args.length > 0 ? program.args[0] : 'noname';
const dest = program.args.length === 0 ? process.cwd() : path.join(process.cwd(), appname);
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

const ignoreFiles = ['.DS_Store'];
var destDirFiles = fs.readdirSync(dest).filter(name => ignoreFiles.indexOf(name) < 0 );
if (destDirFiles.length > 0 ) {
  console.error('page name required or init the project in an empty directory');
  process.exit(1);
}

log('init new project:', appname);

co(function* () {
  const src = path.resolve(__dirname, '../template');
  yield util.copyTo(src, dest);

  // generate .geekpack.json
  generateGeekpackJson(dest);

  // generate .geekpack.json
  updatePackageJsonName(dest);

  log('Done');
}).catch(function (err) {
  console.error(err.stack);
  process.exit(1);
});

function generateGeekpackJson(dest) {
  log('generateGeekpackJson');
  let jsonInfo = {
    appname: appname,
    pages: [],
    otherEntries: { }
  };
  let geekpackPath = path.join(dest, '.geekpack.json');
  fse.writeJsonSync(geekpackPath, jsonInfo);
}

function updatePackageJsonName(dest) {
  log('UpdatePackageJsonName');
  let packageJsonPath = path.join(dest, 'package.json');
  let packageJson = require(packageJsonPath);
  packageJson.name = appname;
  packageJson.description = `${appname} based on react and webpack`;
  fse.writeJsonSync(packageJsonPath, packageJson);
}
