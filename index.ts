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
    public nonce = Math.round(Math.random() * 99999999999); //One time use random number

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
        this.chain = [new Block('', new Transaction(100, 'genesis', 'satoshi'))];

    }

    get lastBlock() {
        return this.chain[this.chain.length -  1];

    }

    //To prevent double spending
    mine(nonce: number) {
        let solution = 1;
        console.log('⛏️ Mining...')

        //While loop
        while(true){
            const hash = crypto.createHash('MD5');
            hash.update((nonce + solution).toString()).end();

            const attempt = hash.digest('hex');

            if (attempt.substr(0,4) === '0000'){
                console.log(`Solved: ${solution}`);
                return solution;
            }

            solution += 1

        }
    }

    addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer){
        const newBlock = new Block(this.lastBlock.hash, transaction); 
        this.chain.push(newBlock); //add new block to chain

        //create a signature verification
        const verifier = crypto.createVerify('SHA256');
        verifier.update(transaction.toString());

        const isValid = verifier.verify(senderPublicKey, signature); //Validate the transaction

        if (isValid){
            const newBlock = new Block(this.lastBlock.hash, transaction);
            this.mine(newBlock.nonce)
            this.chain.push(newBlock); //add new block to chain

        }

    }
}

class Wallet {
    public publicKey: string; // for receiving money
    public privateKey: string; // for spending money

    //Generate public and private key with RSA
    constructor (){
       const keypair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem'},
        privateKeyEncoding: { type: 'pkcs8', format: 'pem'}

       });

       this.privateKey = keypair.privateKey;
       this.publicKey = keypair.publicKey;


    }

    sendMoney(amount: number, payeePublicKey: string){
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end(); //create signature with transaction data as value

        const signature = sign.sign(this.privateKey); //Sign it with the private key
        Chain.instance.addBlock(transaction, this.publicKey, signature);


    }

}

//Example usage

const satoshi = new Wallet();
const bob = new Wallet();
const alice = new Wallet();

satoshi.sendMoney(50, bob.publicKey);
bob.sendMoney(23, alice.publicKey);
alice.sendMoney(5, bob.publicKey);

console.log(Chain.instance)


