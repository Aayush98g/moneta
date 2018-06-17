const Transaction = require('./transaction');
const Wallet = require('./index');

describe(' => Transaction', () => {
  let transaction, wallet, recipient, amount;
  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = 'r3c1p13nt';
    transaction = Transaction.newTransaction(wallet, recipient, amount);
  });

  it('checks if ouputs the `amount` subtracted from the wallet balance', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount);
  });

  it('checks if  outputs the `amount` added to the recipient', () => {
    expect(transaction.outputs.find(output => output.address === recipient).amount)
      .toEqual(amount);
  });
    it('checks if validates a valid transaction', () => {
    expect(Transaction.verifyTransaction(transaction)).toBe(true);
  });

  it('checks if invalidates a corrupt transaction', () => {
    transaction.outputs[0].amount = 50000;
    expect(Transaction.verifyTransaction(transaction)).toBe(false);
  });
  it('checks if inputs the balance of the wallet', () => {
   expect(transaction.input.amount).toEqual(wallet.balance);
});

  describe('=> transacting with an amount that exceeds the balance', () => {
    beforeEach(() => {
      amount = 50000;
      transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('checks if does not create the transaction', () => {
      expect(transaction).toEqual(undefined);
    });
});
  describe('=> and updating a transaction', () => {
  let nextAmount, nextRecipient;
  beforeEach(() => {
    nextAmount = 20;
    nextRecipient = 'n3xt-4ddr355';
    transaction = transaction.update(wallet, nextRecipient, nextAmount);
  });

  it('checks if subtracts the next amount from the sender’s output', () => {
    expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
      .toEqual(wallet.balance - amount - nextAmount);
  });

  it('checks if outputs an amount for the next recipient', () => {
    expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
      .toEqual(nextAmount);
  });
});
});