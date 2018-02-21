const Keypair = require('./Keypair');

class Keystore {
  constructor() {
    this.all = [];
  }

  add(keypair) {
    // Find or add keypair to keypair list.
    if (this.exists(keypair.identifier) == false) 
    {
      // Add new keypair to keypairs list.
      this.all.push(keypair);
      return true;
    }

    return false;
  }

  find(identifier) {
    // Search for rows with 
    let matchingkeypairs = this.all.filter(
      (match) => match.identifier == identifier
    );

    if (matchingkeypairs.length > 0) {
      return matchingkeypairs[0];
    } else {
      return null;
    }
  }

  // Check if a keypair exists in our list or not.
  exists(identifier) {
    // Search for rows with 
    let matchingkeypairs = this.all.filter(
      (match) => match.identifier == identifier
    );

    if (matchingkeypairs.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  generateKeypair() {
    let keypair = new Keypair();
    this.add(keypair);
    return keypair;
  }

  getAll() {
    return this.all;
  }
}

module.exports = Keystore;