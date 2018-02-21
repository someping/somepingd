const library   = require('./lib');

class Daemon {
  constructor() {
    this.log = new library.log();
    
    this.nodes = new library.nodeslist();
    this.mpool = new library.messagepool();
    this.keystore = new library.keystore();

    this.server = null;
    this.apiserver = null;
  }

  start(address = '127.0.0.1', port = 44545) {
    this.createServer(address, port);
    this.createApiserver();
  }

  broadcast(output) {
    let nodes = this.nodes.getAll();
    let peers = this.server.peers.getAll();

    for (var i = 0; i < nodes.length; i++) {
      nodes[i].sendMessage(output);
    }

    for (var i = 0; i < peers.length; i++) {
      peers[i].sendMessage(output);
    }
  }

  createServer(address, port) {
    this.server = new library.server(address, port);
  }

  createApiserver() {
    if (this.server == null) {
      console.log('Cannot create apiserver without creating a server first.');
      return;
    }
    this.apiserver = new library.apiserver();
  }

  getNodes() {
    return this.nodes;
  }
}

module.exports = Daemon;