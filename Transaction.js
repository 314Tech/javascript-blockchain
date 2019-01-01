var SHA256 = require('crypto-js/sha256');
var EC = require('elliptic').ec;

var ec = new EC('secp256k1');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.timestamp = Date.now();
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount + this.timestamp).toString();
  }

  signTransaction(signedKey) {
    if (signedKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign a trasaction for another wallet');
    }

    const hashTx = this.calculateHash();
    console.log(hashTx)
    const sig = signedKey.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex');
  }

  isValid() {
    if (this.fromAddress === null) {
      return true;
    }

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature for this transaction');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

module.exports = Transaction;