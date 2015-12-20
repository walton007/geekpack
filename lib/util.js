#!/usr/bin/env node

'use strict';

const fse = require('fs-extra');

require('colors');

function copyTo(src, dest) {
  return function (callback) {
    log(`${src} copyTo ${dest}`);
    fse.copy(src, dest, function (err) {
      if (err) return callback(err)
      callback(null);
    })
  };
}

function getLogger(prefix) {
  return function () {
    const args = Array.prototype.slice.call(arguments);
    args[0] = `[${prefix}] `.blue + args[0];

    console.log.apply(console, args);
  }
}

const log = getLogger('[util]');

module.exports = {
  getLogger: getLogger,
  copyTo: copyTo
}