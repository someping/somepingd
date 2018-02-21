module.exports = (endpoint, args) => {
  let peers = [];

  // Generate a peers list
  daemon.server.peers.getAll().map((peer) => {
    peers.push({
      address: peer.address,
      port: peer.port
    })
  });

  endpoint.sendMessage(`PEERS ${JSON.stringify(peers)}` + "\n");
}