const md5 = require('md5');

class Peer {
  constructor(_socket) {
    // Socket object
    this.socket = _socket;

    // The IP address our client is connection from.
    this.address = _socket.remoteAddress,

    // The port our client is listening on.
    this.remotePort = _socket.remotePort,

    // Public if client allows incoming connections?
    this.isPublic = false,

     // If public accessible, which port should new peers connect to?
    this.port = null;

    // When was the last time we got a message Peer? 
    this.timestampRecv = Date.now();

    // When was the last time we sent a message to this Peer? 
    this.timestampSent = Date.now();

    // Unique identifer for this peer (to check for duplicates).
    this.identifier = this.address + ":" + this.remotePort;

    // Public key for communication.
    this.publicKey = null;
  }

  sendMessage(message) {
    // write message to peers socket connection.
    this.socket.write(message);
    this.writeLog(message, 'SEND');
  }

  writeLog(message = '', direction = 'INFO') {
    daemon.log.peer(message, direction, this.identifier);
  }

  setPublicKey(_publicKey) {
    this.publicKey = _publicKey;
  }

  setPublicPort(_publicPort) {
    this.port = _publicPort;
    this.isPublic = true;
  }
}

module.exports = Peer;