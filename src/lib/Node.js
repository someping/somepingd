const net = require('net');
const sha256 = require('sha256');
const log = require('./Log');
const commands = require('../commands/protocol');

class Node {
  constructor(_address, _port) {
    
    this.address = _address;
    this.port = _port;
    this.identifier = this.address + ":" + this.port;

    if (daemon.nodes.exists(this.identifier)) {
      daemon.apiserver.log(`Already connected to node: ${this.identifier}`);
      return null;
    }

    this.socket = new net.Socket();
    this.socket.connect(this.port, this.address, this.connection.bind(this));

    this.socket.on('data', this.onMessageReceived.bind(this));
    this.socket.on('close', this.disconnect.bind(this));

    // if (server != null) {
    //   setTimeout(this.revealServerPort.bind(this), 1000);
    // }
  }

  connection() {
    daemon.log.node('CONNECTED', 'INFO', this.identifier);
    daemon.apiserver.log(`Connected to node: ${this.identifier}`);
  }

  revealServerPort() {
    this.sendMessage('IDENTIFY PUBLICPORT ' + this.server.port);
  }

  disconnect() {
    daemon.log.node('QUIT', 'INFO', this.identifier);
    daemon.apiserver.log(`Disconnected from node: ${this.identifier}`);
    daemon.nodes.remove(this);
  }

  sendMessage(message) {
    // write message to socket connection.
    this.socket.write(message);
    daemon.log.node(message, 'SEND', this.identifier);
  }

  onMessageReceived(message) {
    let input = `${message}`.trim();
    let args = input.split(' ');
    let cmd = args[0].toUpperCase();

    // Write to log
    this.writeLog(input, 'RECV');

    // Check if there is any available commands matching 
    // the first argument in received message.
    if (commands[cmd]) 
    {
      // Run command if found.
      commands[cmd](this, args);
    }
  }

  writeLog(message = '', direction = 'INFO') {
    daemon.log.peer(message, direction, this.identifier)
  }
}

module.exports = Node;