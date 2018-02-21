var NodeRSA = require('node-rsa');
var sha256 = require('sha256');

class Keypair {
  constructor() {
    this.key = new NodeRSA({b: 512});
    this.identifier = sha256.x2(this.getPublicKey());
  }

  encrypt(data) {
    this.key.encrypt(data, 'base64', 'utf8');
  }

  decrypt(data) {
    this.key.decrypt(data, 'base64', 'utf8');
  }

  getPrivateKey() {
    return new Buffer(this.key.exportKey('pkcs8')).toString('base64');
  }

  getPublicKey() {
    return new Buffer(this.key.exportKey('pkcs8-public')).toString('base64');
  }
}

module.exports = Keypair;