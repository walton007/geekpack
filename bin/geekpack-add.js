#!/usr/bin/env node

'use strict';

const co = require('co');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const program = require('commander');
const util = require('../lib/util');
const log = util.getLogger('geekpack-add');
const readline = require('readline');
const PWD = process.cwd();

program
  .option('-r, --route <routepath>', 'Add route')
  .parse(process.argv);

if (program.args.length < 1) {
  console.error('page name required');
  process.exit(1);
}

const pagename = program.args[0];
const route = program.route ? program.route : pagename;

co(function* () {
  const geekpackPath = path.join(PWD, '.geekpack.json');
  if (!fs.existsSync(geekpackPath)) {
    return log('.geekpack.json not exists, please make sure runing this command under geekpack project.'.red);
  }

  const geekpackConfig = require(geekpackPath);

  // check page name not used
  let existPageName = geekpackConfig.pages.some(page => { return page.name === pagename });
  if (existPageName) {
    return log(`${pagename} already exists, please change another name`.red);
  };

  // check route not used
  let existRoute = geekpackConfig.pages.some(page => { return page.route === route });
  if (existRoute) {
    return log(`${route} already exists, please change another route`.red);
  };

  // copy sample page and rename to pagename
  yield createNewPage(geekpackConfig.appname);

  // updateGeekpack
  let newPage = {name: pagename, route: route};
  geekpackConfig.pages.push(newPage);
  fse.writeJsonSync(geekpackPath, geekpackConfig);

  yield handleRouteReplaceholder(newPage);

  log('Done');
}).catch(function (err) {
  console.error(err.stack);
  process.exit(1);
});

function handleRouteReplaceholder (newPage) {
  log('handleRouteReplaceholder');
  return function (callback) {
    const routesFilePath = path.join(PWD, 'src/routes.jsx');
    const PLACEHOLDER_MOD_TAG = 'GEEKPACK PLACEHOLDER START [import module]';
    const PLACEHOLDER_ROUTE_TAG = 'GEEKPACK PLACEHOLDER START [import route]';
    // const PLACEHOLDER_END = 'GEEKPACK PLACEHOLDER END';
    const PLACEHOLDER_MOD_CONTENT = `import ${newPage.name} from '${newPage.name}'`;
    const PLACEHOLDER_ROUTE_CONTENT = `          <Route path="${newPage.route}" component={${newPage.name}}/>`;

    let lineArr = [];
    let importModIdxS = -1;
    let routeIdxS = -1;
    let rl = readline.createInterface({
      input: fs.createReadStream(routesFilePath)
    });

    rl
    .on('line', function (line) {
      // log('Line from file:', line);
      lineArr.push(line);
      if (importModIdxS < 0 && line.indexOf(PLACEHOLDER_MOD_TAG) >= 0) {
        importModIdxS = lineArr.length;
      }
      if (routeIdxS < 0 && line.indexOf(PLACEHOLDER_ROUTE_TAG) >= 0) {
        routeIdxS = lineArr.length;
      }
    })
    .on('close', function() {
      log('Have a great day! close');
      if (importModIdxS < 0 || routeIdxS < 0) {
        return callback('bad route.jsx template');
      }

      let finalArr = lineArr.slice(0, importModIdxS)
        .concat(PLACEHOLDER_MOD_CONTENT)
        .concat(lineArr.slice(importModIdxS, routeIdxS))
        .concat(PLACEHOLDER_ROUTE_CONTENT)
        .concat(lineArr.slice(routeIdxS));
      fs.writeFileSync(routesFilePath, finalArr.join('\n'));

      callback(null);
    });
  };
}

function createNewPage (appname) {
  log('createNewPage');
  return function (callback) {
    const newPageDir = path.join(PWD, 'src/components/customPages', pagename);
    if (fs.existsSync(newPageDir)) {
      return callback(`${newPageDir} already exists.`);
    }
    fs.mkdir(newPageDir);
    const targetPkgjsonPath = path.join(newPageDir, 'package.json');
    const targetPkgjsxPath = path.join(newPageDir, `${pagename}.jsx`);
    const targetPkglessPath = path.join(newPageDir, `${pagename}.less`);
    // copy content under samplePage to target:
    // package.json
    const baseSamplePageDir = path.join(__dirname, '../template/src/components/samplePage');
    let pathPkgjson = require(path.join(baseSamplePageDir, 'package.json'));
    pathPkgjson.name = pagename;
    pathPkgjson.main = `./${pagename}.jsx`;
    fse.writeJsonSync(targetPkgjsonPath, pathPkgjson);
    // .jsx
    let jsxFile = fs.readFileSync(path.join(baseSamplePageDir, 'samplePage.jsx'), 'utf8');
    fs.writeFileSync(targetPkgjsxPath, jsxFile.replace(new RegExp('samplePage', 'ig'), pagename));

    // .less
    let lessFile = `
      .${appname} {
        .${pagename} {

        }
      }
    `
    fs.writeFileSync(targetPkglessPath, lessFile);

    callback(null);
  }
}
