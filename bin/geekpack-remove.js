#!/usr/bin/env node

'use strict';

const co = require('co');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const program = require('commander');
const util = require('../lib/util');
const log = util.getLogger('geekpack-remove');
const readline = require('readline');
const PWD = process.cwd();

program
  .parse(process.argv);

if (program.args.length < 1) {
  console.error('page name required');
  process.exit(1);
}
log('run remove');
const pagename = program.args[0];

co(function* () {
  const geekpackPath = path.join(PWD, '.geekpack.json');
  if (!fs.existsSync(geekpackPath)) {
    return log('.geekpack.json not exists, please make sure runing this command under geekpack project.'.red);
  }

  const geekpackConfig = require(geekpackPath);

  // check page name not used
  let existPageName = geekpackConfig.pages.some(page => { return page.name === pagename });
  if (!existPageName) {
    return log(`${pagename} not exists!`.red);
  };

  // remove page
  let pagePath = path.join(PWD, 'src/components/customPages/', pagename);
  if (fs.existsSync(pagePath)) {
    fse.removeSync(pagePath);
  }

  // updateGeekpack
  let oldPage;
  geekpackConfig.pages = geekpackConfig.pages.filter(
    page => {
      if (page.name !== pagename) {
        return true
      }
      oldPage = page;
      return false;
    });
  fse.writeJsonSync(geekpackPath, geekpackConfig);

  // update route.jsx
  yield handleRouteReplaceholder(oldPage);

  log('Done');
}).catch(function (err) {
  console.error(err.stack);
  process.exit(1);
});

function handleRouteReplaceholder (oldPage) {
  log('handleRouteReplaceholder');
  return function (callback) {
    const routesFilePath = path.join(PWD, 'src/routes.jsx');
    const PLACEHOLDER_MOD_TAG = 'GEEKPACK PLACEHOLDER START [import module]';
    const PLACEHOLDER_ROUTE_TAG = 'GEEKPACK PLACEHOLDER START [import route]';
    // const PLACEHOLDER_END = 'GEEKPACK PLACEHOLDER END';
    const PLACEHOLDER_MOD_CONTENT = `import ${oldPage.name} from '${oldPage.name}'`;
    const PLACEHOLDER_ROUTE_CONTENT = `<Route path="${oldPage.route}" component={${oldPage.name}}/>`;

    let lineArr = [];
    let importModIdxS = -1;
    let routeIdxS = -1;
    let rl = readline.createInterface({
      input: fs.createReadStream(routesFilePath)
    });

    rl
    .on('line', function (line) {
      if (line.indexOf(PLACEHOLDER_MOD_CONTENT) >= 0
        || line.indexOf(PLACEHOLDER_ROUTE_CONTENT) >= 0) {
        return;
      }

      lineArr.push(line);
    })
    .on('close', function() {
      log('Have a great day! close');
      fs.writeFileSync(routesFilePath, lineArr.join('\n'));
      callback(null);
    });
  };
}