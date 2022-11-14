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

class Block {

}

class Chain {

}

class Wallet {

}

