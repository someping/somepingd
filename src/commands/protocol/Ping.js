module.exports = (endpoint, args) => {
  // Return PONG to peer.
  endpoint.sendMessage("PONG\n");
}