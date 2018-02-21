const Message = require('./Message');

class MessagePool {
  constructor() {
    this.all = [];
  }

  generateAndBroadcast(_pubKey, _body) {
    let message = Message.generate(_pubKey, _body);
    if (message) {
      this.broadcast(message);
      this.add(message);
      return message;
    } else {
      return null;
    }
  }

  findOrBroadcast(_id, _recepient, _data, _nonce) {  
    if (this.exists(_id)) {
      return;
    } 
    
    let message = new Message();
    message.id = _id;
    message.recepient = _recepient;
    message.data = _data;
    message.nonce = _nonce;

    if (!message.isValid()) {
      return;
    }

    this.broadcast(message);
    this.add(message);

    if (message.hasMatchingKeypair()) {
      let data = message.decryptedData();
      daemon.apiserver.log('---- INCOMING MESSAGE ----');
      daemon.apiserver.log(`From: ${data.sender}`);
      daemon.apiserver.log(`Message: ${data.body}`);
      daemon.apiserver.log('--------');

    }
  }

  broadcast(message) {
    if (!message.isValid())
      return false;

    if (message.isBroadcasted())
      return false;

    daemon.broadcast(`PRIVMSG ${message.id} ${message.recepient} ${message.data} ${message.nonce}`);
    message.broadcasted = true;
  }

  add(message) {
    // Find or add node to node list.
    if (this.exists(message.id) == false) 
    {
      // Add new node to nodes list.
      this.all.push(message);
      return true;
    }

    return false;
  }

  // Check if a node exists in our list or not.
  exists(id) {
    // Search for rows with 
    let matchingnodes = this.all.filter(
      (match) => match.id == id
    );

    if (matchingnodes.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  getAll() {
    return this.all;
  }
}

module.exports = MessagePool;