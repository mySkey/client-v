#!/usr/bin/env node
const shelljs = require('shelljs');
const program = require('commander');

const packageInfo = require('../package');

function getTimeStr() {
  const now = new Date();
  const datetime = now.toLocaleString();
  const [date, time] = datetime.split(' ');
  const [year, month, day] = date.split('/');
  const [hour, minute, second] = time.split(':');
  return (
    year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  );
}

function asyncVersion(distDir = 'dist') {
  const newVersion = getTimeStr();
  shelljs.cd(`./${distDir}`);
  shelljs.touch('client_v_version.json');
  shelljs
    .ShellString(`{"version": "${newVersion}"}`)
    .to('client_v_version.json');
  // shelljs.exec(`echo '{"version": "${newVersion}"}' > client_v_version.json`);
}

program
  .version(packageInfo.version, '-v, --version')
  .usage('<command> [options]');

program.option('-d,--dir <value>').action(() => {
  const { dir } = program.opts();
  asyncVersion(dir);
});

program.parse(process.argv);
