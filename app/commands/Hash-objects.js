const fs =require("fs")
const path =require("path")
const zlib =require("zlib")
const crypto =require("crypto")
class Hashobject{
    constructor(flag,filepath){
        this.flag=flag;
        this.filepath=filepath;
    }

    execute(){
        // make sure file is there
        const isFile=path.resolve(this.filepath);
            if(!fs.existsSync(isFile))
                throw new Error(`could not open ${this.filepath} for reading: No such file or directory`)

        // read the file
        const fileContent=fs.readFileSync(isFile);
        const fileLength=fileContent.length

        // create blob
        const header =`blob ${fileLength}\0`;
        const blob=Buffer.concat([Buffer.from(header),fileContent])

        // calculate hash
        const hash =crypto.createHash("sha1").update(fileContent).digest("hex");

        if(this.flag && this.flag==="-w"){
            const folder= hash.slice(0,2);
            const file=hash.slice(2);

            const basePath = path.join(process.cwd(),".git","objects",folder);

            if(!fs.existsSync(basePath)) fs.mkdirSync(basePath,{recursive:true});

            const commpressData=zlib.deflateSync(blob);

            fs.writeFileSync(path.join(basePath,file),commpressData);
        }

        process.stdout.write(hash);
    }
}

module.exports=Hashobject