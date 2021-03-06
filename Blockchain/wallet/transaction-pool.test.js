const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');
const Wallet = require('./index');

describe('TransactionPool', () => {
  let tp, wallet, transaction;
  beforeEach(() => {
    tp = new TransactionPool();
    wallet = new Wallet();
    transaction=wallet.createTransaction('r4nd-4dr355',24,tp)
  });

  it('to see if adds a transaction to the pool', () => {
    expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
  });

  it('to see if updates a transaction in the pool', () => {
    const oldTransaction = JSON.stringify(transaction);
    const newTransaction = transaction.update(wallet, 'foo-4ddr355', 9);
    tp.update_0_AdditionOfTransaction(newTransaction);
    //since we want the transaction  to be equal
    expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id)))
      .not.toEqual(oldTransaction);
  });

  describe('mixing valid and corrupt transactions', () => {
  let validTransactions;
  beforeEach(() => {
    validTransactions = [...tp.transactions];
    for (let i=0; i<6; i++) {
      wallet = new Wallet();
      transaction = wallet.createTransaction('r4nd-4dr355', 30, bc, tp);
      if (i%2==0) {
        transaction.input.amount = 9999;
      } else {
        validTransactions.push(transaction);
      }
    }
  });

  it('shows a difference between valid and corrupt transactions', () => {
    expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
  });

  it('grabs valid transactions', () => {
    expect(tp.validTransactions()).toEqual(validTransactions);
  });
});
});