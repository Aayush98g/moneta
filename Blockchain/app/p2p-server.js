const Websocket=require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
//checks if peer enviormnetal varibale has been declared or not
//string that contain weeb socket address
//that the web socket should connect to as peer.
const peers= process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGE_TYPES=
{
	chain:'CHAIN',
	transaction:'TRANSACTION'
};
class P2P_server
{
	constructor(blockchain,transactionPool)
	{
		this.blockchain=blockchain;

		this.transactionPool=transactionPool;

				this.sockets=[];
	}



	listen() {
		

		const server = new Websocket.Server({ port: P2P_PORT });
   	   server.on('connection', socket => this.connectSocket(socket));

        this.connect2Peers();

		
	console.log(`Listening for peer-to-peer connections on port: ${P2P_PORT}`);
	
	}
	connect2Peers()
	{
		peers.forEach(peer => {
			const socket = new Websocket(peer);
			socket.on('open', () => this.connectSocket(socket));

		});
	}
	connectSocket(socket)
	{
		this.sockets.push(socket);
		console.log(`socket connected `);
		this.messageHandler(socket);
		this.sendchain(socket);
	}

	messageHandler(socket)
	{
		socket.on('message',message => 
		{
			const data=JSON.parse(message);
			switch(data.type)
			{
				case MESSAGE_TYPES.chain:
				this.blockchain.replaceChain(data.chain);
				break;
				case MESSAGE_TYPES.transaction:
				this.transactionPool.update_0_AdditionOfTransaction(data.transaction);
				break;
			}
		});
	}
	sendchain(socket)
	{
		socket.send(JSON.stringify({
			type: MESSAGE_TYPES.chain,
			chain: this.blockchain.chain
		}));
	}
	sendTrasaction(socket,transaction)
	{
		socket.send(JSON.stringify({
			type:MESSAGE_TYPES.transaction,
			transaction
		}));
	}
	syncChains()
	{
		//send chain to all conected sockets
		this.sockets.forEach(socket => this.sendchain(socket));
	}
	brodcastTransction(transaction)
	{
		this.sockets.forEach(socket => this.sendTrasaction(socket,transaction));
	}

}
module.exports=P2P_server;