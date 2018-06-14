const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY,MINERATE } = require('../config');
class Block {
	constructor(timestamp, lasthash, hash, data, nonce,difficulty) 
	{
		this.timestamp=timestamp;
		this.lasthash=lasthash;
		this.hash=hash;
		this.data=data;
		this.nonce = nonce;
		this.difficulty=difficulty || DIFFICULTY;

	}

	toString()
	{
		//printing hash value partially
		return `block -
			timestamp = ${this.timestamp}
			lasthash  = ${this.lasthash.substring(0,7)}
			hash      = ${this.hash.substring(0,7)}
			nonce	  = ${this.nonce}
			difficulty= ${this.difficulty}
			data	  = ${this.data}

			`;
	}
	// static enable us to call this function without having 
	// to make new instance of the Block
	static genesis()
	{
		//dummy values
		return new this('genesis','----','f1h75s-123',[],0,DIFFICULTY);


	}
	
	static mineBlock(lastBlock, data) {
			const lastHash = lastBlock.hash;
			let hash, timestamp;
			let nonce = 0;
			let { difficulty }=lastBlock;

			do {
		    nonce++;
		    timestamp = Date.now();
		    difficulty=Block.adjustDifficulty(lastBlock,timestamp);
		    hash = Block.hash(timestamp, lastHash, data, nonce,difficulty);
		  } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

		  return new this(timestamp, lastHash, hash, data, nonce,difficulty);
		
		}
	static hash(timestamp,lasthash,data,nonce,difficulty)
	{
      return SHA256(`${timestamp}${lasthash}${data}${nonce}${difficulty}`).toString();
	}
	//caluc hash from the block
	static blockHash(block)
	{
		const { timestamp ,lasthash ,data ,nonce,difficulty} =block;
		return Block.hash(timestamp,lasthash,data,nonce,difficulty);
	}
	static adjustDifficulty(lastBlock,timestamp)
	{
		let {difficulty}=lastBlock;
		difficulty=lastBlock.timestamp+MINERATE > timestamp ? difficulty+1 : difficulty-1
		return difficulty
	}
}

module.exports = Block;
