var EC = require('elliptic').ec;

var ec = new EC('secp256k1');
 
// Generate keys
var key = ec.genKeyPair();

const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log(`Public Key: ${publicKey}`)
console.log(`Private Key: ${privateKey}`)
