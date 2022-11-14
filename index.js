"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    //Transfer funds from one address to another
    constructor(amount, payer, //public key
    payee) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
    //Method to convert the object to a string
    toString() {
        return JSON.stringify(this);
    }
}
class Block {
}
class Chain {
}
class Wallet {
}
