module.exports = (socket, args) => {
  let pubkeys = [];
  let count = daemon.keystore.getAll().length;

  daemon.apiserver.sendAndLog(socket, `You have ${count} public key(s): `);

  // Generate a pubkeys list
  daemon.keystore.getAll().map((keypair) => {
    daemon.apiserver.sendAndLog(socket, '<span style="color: green;">' + keypair.getPublicKey() + '</span>');
  });
}