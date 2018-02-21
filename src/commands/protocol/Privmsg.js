module.exports = (endpoint, args) => {

  let input = {};
  input.id = args[1];
  input.recepient = args[2];
  input.data = args[3];
  input.nonce = args[4];

  if (
    typeof input.id == 'undefined' ||
    typeof input.recepient == 'undefined' ||
    typeof input.data == 'undefined' || 
    typeof input.nonce == 'undefined') {
    // Return unkown command error.
    return;
  }

  daemon.mpool.findOrBroadcast(input.id, input.recepient, input.data, input.nonce);
}