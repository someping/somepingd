module.exports = (socket, args) => {
  let nodes = [];

  // Generate a nodes list
  daemon.nodes.getAll().map((node) => {
    nodes.push({
      address: node.address,
      port: node.port
    })
  });

  daemon.apiserver.sendAndLog(socket, 'Total number of connected nodes: ' + nodes.length);
  daemon.apiserver.sendAndLog(socket, JSON.stringify(nodes));
}