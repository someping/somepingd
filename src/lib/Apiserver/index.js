const fs = require('fs');
const log = require('../Log');

const webroot = __dirname + '/webui/';
const commands = __dirname + '/webui/';

class Apiserver {
  constructor(express, http, io) {
    this.server = daemon.server;
    this.commands = require('../../commands/api')

    this.express = require('express')();
    this.http = require('http').Server(this.express);
    this.io = require('socket.io')(this.http);

    this.webServerPort = parseInt(this.server.port) + 10;

    this.io.on('connection', this.ioConnect.bind(this));

    this.express.get('/', function(req, res) {
      res.sendFile( webroot + 'index.html');
    });

    this.http.listen(this.webServerPort, this.onWebserverStarted.bind(this));
  }

  onWebserverStarted() {
    daemon.log.apiserver(`Open this URL in your browser to view webui: http://127.0.0.1:${this.webServerPort}`);
  }

  ioConnect(socket) {
    socket.on('command', (command) => { this.commandReceived(socket, command) });
    socket.on('disconnect', this.ioDisconnect.bind(this));
  }

  commandReceived(socket, input) {
    daemon.log.apiserver(input, 'CMD');

    let args = input.split(' ');
    let cmd = args[0].toUpperCase();

    // Check if there is any available commands matching 
    // the first argument in received message.
    if (this.commands[cmd]) 
    {
      // Run command if found.
      this.commands[cmd](socket, args);
    } else {
      let cmdNotFound = 'Unknown command: ' + cmd;
      daemon.log.apiserver(cmdNotFound, 'LOG');
      socket.emit('log', [cmdNotFound]);
    }
  }

  ioDisconnect(socket) {
    daemon.log.apiserver('client disconnected');
  }

  log(data, type = 'LOG') {
    this.io.emit('log', [data]);
  }

  sendAndLog(socket, data, type = 'LOG') {
    daemon.log.apiserver(data, type);
    socket.emit('log', [data]);
  }
}

module.exports = Apiserver;