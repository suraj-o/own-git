const fs =require("fs")
const path =require("path")
const zlib =require("zlib")

class LsTree {
    constructor(shah,flag){
        this.shah=shah;
        this.flag=flag
    }

    execute(){
        const folder=this.shah.slice(0,2);
        const file=this.shah.slice(2);

        const compeletePath=path.join(process.cwd(), ".git" , "objects", folder , file)


        if(!fs.existsSync(compeletePath)) throw new Error(`Not a valid object name ${this.commit}`)

            if(this.flag === "--name-only"){
                const catFileBuffer=zlib.inflateSync(fs.readFileSync(compeletePath)).toString().split("\0");

                const check=catFileBuffer.filter(vlaue=>vlaue.includes(" ")).map(vlaue=>vlaue.split(" ")[1]);
        
                check.forEach(name=>{
                        process.stdout.write(`${name} \n`)
                })
            }
    }
}

module.exports=LsTree