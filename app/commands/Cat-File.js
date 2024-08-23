const fs =require("fs")
const path =require("path")
const zlib =require("zlib")

class CatFile{
    constructor(flag,commit){
        this.flag=flag;
        this.commit=commit
    }

    executeCommand(){
        switch (this.flag) {
            case "-p":{
                const folder=this.commit.slice(0,2);
                const file=this.commit.slice(2);

                const compeletePath=path.join(process.cwd(), ".git" , "objects", folder , file)

                if(!fs.existsSync(compeletePath)) throw new Error(`Not a valid object name ${this.commit}`)

                const catFileBuffer=zlib.inflateSync(fs.readFileSync(compeletePath));
                const finalOutput=catFileBuffer.toString().split("\x00")[1];
                process.stdout.write(finalOutput)

            }    
            break;
        
            default:
                throw new Error("Unknown Command!");
            break;
        }
    }
}

module.exports=CatFile