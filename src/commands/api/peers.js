module.exports = (socket, args) => {
  let peers = [];

  // Generate a peers list
  daemon.server.peers.getAll().map((peer) => {
    peers.push({
      address: peer.address,
      port: peer.port,
      public: peer.isPublic
    })
  });

  daemon.apiserver.sendAndLog(socket, 'Total number of connected peers: ' + peers.length);
  daemon.apiserver.sendAndLog(socket, JSON.stringify(peers));
}