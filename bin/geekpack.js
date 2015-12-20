#!/usr/bin/env node

'use strict';

const program = require('commander');

program
  .usage('init {appname}')
  .version(require('../package.json').version)
  .command('init [name]', 'init a new project')
  .command('add [page]', 'add a new page')
  .command('remove [page]', 'remove a old page')
  .command('list', 'list pages installed')
  .command('addentry', 'add an independent entry')
  .command('rmentry [entryname]', 'remove an entry')
  .parse(process.argv);