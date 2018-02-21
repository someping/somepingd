const Node = require('../../lib/Node');

module.exports = (socket, args) => {
  if (typeof args[1] == 'undefined') {
    daemon.apiserver.sendAndLog(socket, 'Missing argument: <host[:port]>');
    daemon.apiserver.sendAndLog(socket, 'Usage: CONNECT <host[:port]> ');
    return;
  }

  let fullAddress = args[1].split(':');
  let address = fullAddress[0];
  let port = 44545;

  if (typeof fullAddress[1] != 'undefined') {
    port = fullAddress[1];
  }

  let node = new Node(address, port);
  if (node && daemon.nodes.add(node)) {
    // Valid objects.
    // @todo: validate connection is valid to.
  }
}