const md5 = require('md5');

class Peerslist {
  constructor() {
    // Holder for peers
    this.all = [];
  }

  add(peer) {
    // Find or add Peer to peer list.
    if (this.exists(peer.identifier) == false) 
    {
      // Add new peer to peers list.
      this.all.push(peer);      
    }
  }

  // Check if a peer exists in our list or not.
  exists(identifier) {
    // Search for rows with 
    let matchingPeers = this.all.filter(
      (match) => match.identifier == identifier
    );
    
    if (matchingPeers.length > 0) return true;
    else return false;
  }

  remove(peer) {
    // Find peer in peer list.
    if (this.exists(peer.identifier) == true) 
    {
      // Get peers index in peer list
      let peerIndex = this.getIndex(peer);

      // Remove peer from list with index.
      this.all.splice(peerIndex, 1);
    }
  }

  getAll() {
    return this.all;
  }

  getIndex(peer) {
    let index = 0;
    let peers = this.all;

    // Loop throug list of peers.
    for (var i = 0; i < peers.length; i++) {

      // Look for peer with matching identifier.
      if (peers[i].identifier == peer.identifier) 
        return index;

      index++;
    }

    return null;
  }
}

module.exports = Peerslist;