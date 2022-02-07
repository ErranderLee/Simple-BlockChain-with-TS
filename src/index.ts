import * as CryptoJS from "crypto-js";
class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    // static 메소드이므로 Block을 인스턴스화 하지 않아도 사용할 수 있음.(Block.calculate~)
    static calculatedBlockHash = (
        index:number, 
        previousHash:string, 
        timestamp:number, 
        data:string
    ): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "2020202020", "", "hello", 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = () : Block[] => blockChain;

const getLatestBlock = () : Block => blockChain[blockChain.length - 1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data: string) : Block => {
    const previousBlock : Block = getLatestBlock();
    const newIndex : number = previousBlock.index + 1;
    const newTimeStamp : number = getNewTimeStamp();
    const newHash : string = Block.calculatedBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    return newBlock;
};

console.log(createNewBlock("hello"), createNewBlock("bye"));
console.log(blockChain);
export {};