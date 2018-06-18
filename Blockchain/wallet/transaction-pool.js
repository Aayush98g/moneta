class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  update_0_AdditionOfTransaction(transaction) {
   //to check if the trasaction already exist(with same tid) !
    let transactionWithId = this.transactions.find(t => t.id === transaction.id);
    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }
    existingTransaction(address) {
    return this.transactions.find(transaction => transaction.input.address === address);
  }
}

module.exports = TransactionPool;