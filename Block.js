const SHA256 = require('crypto-js/sha256');

class Block {

  constructor(timestamp, transactions, previoushash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previoushash = previoushash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.timestamp + JSON.stringify(this.transactions) + this. previoushash + this.nonce).toString();
  }

  mineBlock(difficulty) {
    console.log(`Mining Block ...`);
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  hasValidTransaction() {
    for (const tr of this.transactions) {
      if (!tr.isValid()) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Block;