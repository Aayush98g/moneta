const Blockchain=require('./blockchain')
const bc =new Blockchain();
for (var i = 0; i < 4; i++) {
console.log(bc.addBlock(`riya ${i}`).toString());
	
}