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

log('run addentry');

program
  .option('-p, --path <path>', 'Add Other Entry')
  .parse(process.argv);

if (program.args.length < 1) {
  console.error('entry name required');
  process.exit(1);
}

const entryName = program.args[0];
const entryFilePath = program.path ? program.path : `${entryName}.js`;

co(function* () {
  const geekpackPath = path.join(PWD, '.geekpack.json');
  if (!fs.existsSync(geekpackPath)) {
    return log('.geekpack.json not exists, please make sure runing this command under geekpack project.'.red);
  }

  const geekpackConfig = require(geekpackPath);
  let otherEntries = geekpackConfig.otherEntries;
  if (entryName in otherEntries) {
    return log(`${entryName} have already been defined. Please use another name`.red);
  }
  if (entryName === 'index') {
    return log(`name index is reserved. Please use another name`.red);
  }

  const absEntryFilePath = path.join(PWD, 'src', entryFilePath);
  if (!fs.existsSync(absEntryFilePath)) {
    // create the new file
    var ws = fse.createOutputStream(absEntryFilePath);
    ws.write(`console.log('${entryName} Please write your own code here')`);
  }

  // updateGeekpack
  geekpackConfig.otherEntries[entryName] = entryFilePath;
  fse.writeJsonSync(geekpackPath, geekpackConfig);

}).catch(function (err) {
  console.error(err.stack);
  process.exit(1);
});
