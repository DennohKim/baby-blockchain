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
        return hash.digest('hex');
    }


}

class Chain {

}

class Wallet {

}

