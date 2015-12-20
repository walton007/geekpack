#!/usr/bin/env node

'use strict';

const co = require('co');
const path = require('path');
const fs = require('fs');
const program = require('commander');
const util = require('../lib/util');
const log = util.getLogger('geekpack-list');

const PWD = process.cwd();
require('colors');

log('run list');

program
  .parse(process.argv);

co(function* () {
  const geekpackPath = path.join(PWD, '.geekpack.json');
  if (!fs.existsSync(geekpackPath)) {
    return log('.geekpack.json not exists, please make sure runing this command under geekpack project.'.red);
  }

  const geekpackConfig = require(geekpackPath);

  log(`App Name: ${geekpackConfig.appname}. Contain ${geekpackConfig.pages.length} pages:`.yellow);
  log(`Page Name          Page Route Path `.green);
  geekpackConfig.pages.map(
    page => log(` ${page.name}      ${page.route} `));

}).catch(function (err) {
  console.error(err.stack);
  process.exit(1);
});
