#!/usr/bin/env node
const fs        = require('fs');
const program = require('commander');
const Daemon  = require('./src/Daemon')

global.daemon = new Daemon();

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

/**
 * Parse command line arguments with commander.
*/
program
  .version(require('./VERSION'))
  .option('-h, --host <host>', 'Set external address')
  .option('-p, --port <port>', 'Set custom port')
  .parse(process.argv);

  fs.readFile('./LOGO', function(err,data) {
    let logo = new Buffer(data).toString();
    console.log(logo);
    daemon.start(program.host, program.port);
  })