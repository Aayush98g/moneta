const Block = require('./block');
const { DIFFICULTY } = require('../config');

describe('Block', () => {
let data, lastBlock, block;
beforeEach(() => {
	data = 'bar';
lastBlock = Block.genesis();
block = Block.mineBlock(lastBlock, data);
});
	
it('`data` to match the input', () => {
expect(block.data).toEqual(data);
});
	
it('if the `lastHash` to match the hash of the last block i.e. linked or not', () => {
expect(block.lasthash).toEqual(lastBlock.hash);
});

it('generates a hash that matches the difficulty', () => {
	expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
});
it('if lowers the difficulty for slowly mined blocks', () => {
  expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty-1);
});

it('if raises the difficulty for quickly mined blocks', () => {
  expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1);
});


})