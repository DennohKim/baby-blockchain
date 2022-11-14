"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
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
//Container for multiple transactions
class Block {
    constructor(prevHash, transaction, timestamp = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.timestamp = timestamp;
    }
    //Hash of a block
    get hash() {
        const str = JSON.stringify(this); //stringify object
        const hash = crypto.createHash('SHA256'); //specify the hashing algorithm
        hash.update(str).end();
        return hash.digest('hex'); //a transaction has a link to the previous transaction
    }
}
//Linked list of blocks
class Chain {
    //Contructor to define genesis block
    constructor() {
        this.chain = [new Block(null, new Transaction(100, 'genesis', 'satoshi'))];
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(transaction, senderPublicKey, signature) {
        const newBlock = new Block(this.lastBlock.hash, transaction);
        this.chain.push(newBlock); //add new block to chain
    }
}
Chain.instance = new Chain(); //There should be only one blockchain therefore make it a singleton instance
class Wallet {
}
