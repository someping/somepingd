module.exports = (socket, args) => {
  let keypair = daemon.keystore.generateKeypair();
  daemon.apiserver.sendAndLog(socket, 'Generating a new public key:');
  daemon.apiserver.sendAndLog(socket, '<span style="color: green;">' + keypair.getPublicKey() + '</span>');
  daemon.apiserver.sendAndLog(socket, 'Give your public key the users you want to receive messages from.');
}