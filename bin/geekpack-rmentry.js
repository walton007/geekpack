#!/usr/bin/env node

'use strict';

const co = require('co');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const program = require('commander');
const util = require('../lib/util');
const log = util.getLogger('geekpack-list');

const PWD = process.cwd();
require('colors');

log('run rmentry');

program
  .parse(process.argv);

if (program.args.length < 1) {
  console.error('entry name required');
  process.exit(1);
}

const entryName = program.args[0];

co(function* () {
  const geekpackPath = path.join(PWD, '.geekpack.json');
  if (!fs.existsSync(geekpackPath)) {
    return log('.geekpack.json not exists, please make sure runing this command under geekpack project.'.red);
  }

  const geekpackConfig = require(geekpackPath);
  let otherEntries = geekpackConfig.otherEntries;
  if (!(entryName in otherEntries)){
    return log(`${entryName} not exist.`.red);
  }
  if (entryName === 'index') {
    return log(`entry index is reserved and cant removed. Please use another entry name`.red);
  }

  const absEntryFilePath = path.join(PWD, 'src', otherEntries[entryName]);
  if (fs.existsSync(absEntryFilePath)) {
    // remove this file
    fse.removeSync(absEntryFilePath);
  }

  // updateGeekpack
  delete geekpackConfig.otherEntries[entryName];
  fse.writeJsonSync(geekpackPath, geekpackConfig);

}).catch(function (err) {
  console.error(err.stack);
  process.exit(1);
});
