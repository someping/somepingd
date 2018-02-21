module.exports = (socket, args) => {  
  if (typeof args[1] == 'undefined' || typeof args[2] == 'undefined') {
    daemon.apiserver.sendAndLog(socket, 'Invalid format. Usage example: SENDMSG &lt;pubkey&gt; message...');
    return;
  }

  let receiverPubkey = args[1];
  let body = args;
  body.shift();
  body.shift();

  daemon.mpool.generateAndBroadcast(receiverPubkey, body.join(' '));
}