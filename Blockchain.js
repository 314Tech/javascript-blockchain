const Block = require('./Block');
const Transaction = require('./Transaction');

class Blockchain {
  constructor(difficulty) {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = difficulty;
    this.pendingTransactions = [];
    this.minersReward = 20;
  }

  createGenesisBlock() {
    return new Block(new Date().getTime()/1000, [], "Genesis Block", '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let newBlock = new Block(Date.now(), this.pendingTransactions);
    newBlock.mineBlock(this.difficulty);
    newBlock.previoushash = this.getLatestBlock().hash;

    this.chain.push(newBlock);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.minersReward)
    ]
  }

  addTransaction(transaction) {

    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('Transaction must include from and to address.');
    }

    if (!transaction.isValid()) {
      throw new Error('Cannot add transaction to the chain');
    }

    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for(const block of this.chain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }
        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }

  isValid() {

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if (!currentBlock.hasValidTransaction()) {
        return lfalse;
      }
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previoushash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;