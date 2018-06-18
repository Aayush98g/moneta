const Transaction =require('../wallet/transaction');
class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }


  mine() {
    const validTransactions = this.transactionPool.validTransactions();
    // include a reward transaction for the miner
    // create a block consisting of the valid transactions
    // synchronize chains in the peer-to-peer server
    // clear the transaction pool
    // broadcast to every miner to clear their transaction pools
  }
  existingTransaction()
  {
  	return this.transactions.find(t => t.input.address === address);
  }
  validTransactions()
  {
			  	return this.transactions.filter(transaction =>
			  	{
			  		const outputTot=transaction.outputs.reduce((total,output)=>
			  		{
			  			return total+output.amount;
			  		},0);
			  		if(transaction.input.amount != outputTot)
			  			{
			  				console.log(`invalid transaction ${transaction.input.address}.`);
			  				}
			  		if(!Transaction.verifyTransaction(transaction))
			  		{
			  			console.log(`invalid signature ${transaction.input.address}.`);		

			  		}
			  		return transaction;		
			  	});
			  }


}

module.exports = Miner;
/*
*           	  ************
**				   ***********
***					**********
****                 *********
*****                  *******
******				    ******
*******                  *****
********                  ****
*********                  ***
**********				    **
***********					 *
*/