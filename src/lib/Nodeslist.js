const md5 = require('md5');
const log = require('./Log');

class Nodeslist {
  constructor() {
    // Holder for nodes
    this.all = [];
  }

  add(node) {
    // Find or add node to node list.
    if (this.exists(node.identifier) == false) 
    {
      // Add new node to nodes list.
      this.all.push(node);
      return true;
    }

    return false;
  }

  // Check if a node exists in our list or not.
  exists(identifier) {

    // Search for rows with 
    let matchingnodes = this.all.filter(
      (match) => match.identifier == identifier
    );

    if (matchingnodes.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  remove(node) {
    // Find node in node list.
    if (this.exists(node.identifier) == true) 
    {
      // Get nodes index in node list
      let nodeIndex = this.getIndex(node);

      // Remove node from list with index.
      this.all.splice(nodeIndex, 1);
    }
  }

  getAll() {
    return this.all;
  }

  getIndex(node) {
    let index = 0;
    let nodes = this.all;

    // Loop throug list of nodes.
    for (var i = 0; i < nodes.length; i++) {

      // Look for node with matching identifier.
      if (nodes[i].identifier == node.identifier) 
        return index;

      index++;
    }

    return null;
  }
}

module.exports = Nodeslist;