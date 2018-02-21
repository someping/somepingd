module.exports = (endpoint, args) => {
  let nodes = [];

  // Generate a nodes list
  daemon.nodes.getAll().map((node) => {
    nodes.push({
      address: node.address,
      port: node.port
    })
  });

  endpoint.sendMessage(`NODES ${JSON.stringify(nodes)}` + "\n");
}