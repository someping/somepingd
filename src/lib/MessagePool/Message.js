var NodeRSA = require('node-rsa');
const sha256 = require('sha256');

class Message {
  constructor() {
    // Global variables
    this.id = null;
    this.nonce = 0;
    this.data = null;
    this.recepient = null;

    // Local variables
    this.broadcasted = false;
  }

  decryptedData() {
    if (!this.hasMatchingKeypair()) {
      return null;
    }

    try {
      let keypair = this.getMatchingKeypair();
      let key = keypair.key;

      return key.decrypt(this.data, 'json');
    }
    catch (error) {
      return null; 
    } 
  }

  hasMatchingKeypair() {  
    return daemon.keystore.exists(this.recepient);
  }

  getMatchingKeypair() {  
    return daemon.keystore.find(this.recepient);
  }

  generateHashWithWorkProof() {
    let data = this.data;
    let hash = this.generateHash(data);

    daemon.log.write('SYSTEM', 'Generating id for message: ' + data);
    while (!this.hasLeadingZeros(hash)) {
      this.nonce++;
      hash = this.generateHash(data);
    }

    this.id = hash; // Save valid hash as id.
    daemon.log.write('SYSTEM', 'Found valid hash ID: ' + hash);

    return hash;
  }

  generateHash() {
    let data = this.data + this.recepient + this.nonce;
    let hash = sha256.x2(data);
    return hash;
  }

  hasLeadingZeros(hash) {
    let match = "";
    let numberOfZeros = Message.difficulty();
    
    for (var i = 0; i < numberOfZeros; i++) {
      match += "0"
    }
    
    return hash.substring(0, numberOfZeros) == match;
  }

  isValid() {
    return (this.id == this.generateHash() && this.hasLeadingZeros(this.id));
  }

  isBroadcasted() {
    return this.broadcasted;
  }

  static generate(_pubKey, _body) {
    
    let message = new Message();

    let recepient = sha256.x2(_pubKey);
    let body = _body;
    let sender = null;

    // @todo: Encrypt this with private key from _recepient
    let data = {
      timestamp: new Date(),
      sender: sender,
      recepient: recepient,
      body: body
    };

    try {
      let pubKey = new Buffer.from(_pubKey, 'base64').toString("ascii")
      let key = new NodeRSA(pubKey, 'pkcs8-public');

      data = key.encrypt(data, 'base64', 'utf8');
    }

    catch(error) {
      return null;
    }

    message.data = data;
    message.recepient = recepient;
    message.generateHashWithWorkProof();

    return message;
  }

  static difficulty() {
    return 3;
  }  
}

module.exports = Message;