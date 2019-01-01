const Blockchain = require('./Blockchain');
const Transaction = require('./Transaction');
var EC = require('elliptic').ec;

var ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('270c27812cb7816367ce0ba09bec8f175369feff44e3e655df04f397507ff99c');
const otherKey = ec.keyFromPrivate('c34895b54976231e2fc861eeb6f99ad913f0c682c6d1739c0a4ff2d68f0fb892');

const myWalletAddress = myKey.getPublic('hex');
const otherWalletAddress = otherKey.getPublic('hex');

var blockchain = new Blockchain(4);

// Create the transaction
var transaction = new Transaction(myWalletAddress, otherWalletAddress, 50);
// Sign the transaction
transaction.signTransaction(myKey);
// Add the transaction to the block
blockchain.addTransaction(transaction);
// Mine the block
blockchain.minePendingTransactions(myWalletAddress);
blockchain.minePendingTransactions(myWalletAddress);

console.log(`Balances ${myWalletAddress}: ${blockchain.getBalanceOfAddress(myWalletAddress)}`);
console.log(`Balances ${otherWalletAddress}: ${blockchain.getBalanceOfAddress(otherWalletAddress)}`);

console.log(JSON.stringify(blockchain,undefined,4).toString());