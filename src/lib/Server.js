const net = require('net');
const Peer = require('./Peer');
const Peerslist = require('./Peerslist');
const log = require('./Log');

class Server {
  constructor(address = '127.0.0.1', port = 8554) {
    this.address = address;
    this.port = port;    
    this.peers = new Peerslist();
    this.commands = require('../commands/protocol');

    // Start listening for peers.
    this.listen();
  }

  connection(socket) {
    // Add peer to peer list
    let peer = this.peerFromSocket(socket);

    // Add a 'data' event handler to this instance of socket
    socket.on('data', (data) => this.messageReceived(peer, data));
    
    // Add a 'close' event handler to this instance of socket
    socket.on('end', (data) => this.peerDisconnect(peer));
  }

  listen() {

    if (!this.peers) {
      daemon.log.peer('Missing: [peerslist]', 'ERROR');
      return false;
    } 

    if (!this.commands) {
      daemon.log.peer('Missing: [commands]', 'ERROR');
      return false;
    }

    // Create a server and listen to <port>
    net.createServer( this.connection.bind(this) ).listen(this.port, this.address);
  }

  messageReceived(peer, message) {
    let input = `${message}`.trim();
    let args = input.split(' ');
    let cmd = args[0].toUpperCase();

    // Write to log
    peer.writeLog(input, 'RECV');

    // Check if there is any available commands matching 
    // the first argument in received message.
    if (this.commands[cmd]) 
    {
      // Run command if found.
      this.commands[cmd](peer, args);
    }
  }

  peerFromSocket(socket) {
    // Convert socket into Peer object.
    let peer = new Peer(socket);

    // Add peer to peerslist
    this.peers.add(peer);

    daemon.log.peer('CONNECTED', 'INFO', peer.identifier);
    daemon.apiserver.log(`New connection from peer: ${peer.identifier}`);

    // Return our new peer object.
    return peer;
  }

  peerDisconnect(peer) {
    // Remove peer from peers.
    this.peers.remove(peer);

    daemon.log.peer('QUIT', 'INFO', peer.identifier);
    daemon.apiserver.log(`Peer disconnected: ${peer.identifier}`);
  }

}

module.exports = Server;