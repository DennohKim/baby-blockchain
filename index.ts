import * as crypto from "crypto";

class Transaction{
    //Transfer funds from one address to another
    constructor(
        public amount: number,
        public payer: string, //public key
        public payee: string, //public key
    ){}

    //Method to convert the object to a string
    toString(){
        return JSON.stringify(this);

    }

}

//Container for multiple transactions
class Block {
    constructor (
        public prevHash: string,
        public transaction: Transaction,
        public timestamp = Date.now()

    ) {}

    //Hash of a block
    get hash () {

        const str = JSON.stringify(this); //stringify object
        const hash = crypto.createHash('SHA256'); //specify the hashing algorithm
        hash.update(str).end();
        return hash.digest('hex'); //a transaction has a link to the previous transaction
    }


}

//Linked list of blocks
class Chain {
    public static instance = new Chain(); //There should be only one blockchain therefore make it a singleton instance

    chain: Block[];

    //Contructor to define genesis block
    constructor (){
        this.chain = [new Block(null, new Transaction(100, 'genesis', 'satoshi'))];

    }

    get lastBlock() {
        return this.chain[this.chain.length -  1];

    }

    addBlock(transaction: Transaction, senderPublicKey: string, signature: string){
        const newBlock = new Block(this.lastBlock.hash, transaction); 
        this.chain.push(newBlock); //add new block to chain

    }

    


}

class Wallet {

}

