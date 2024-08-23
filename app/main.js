const fs = require("fs");
const path = require("path");


const CatFile = require("./commands/Cat-File");
const Hashobject = require("./commands/Hash-objects");
const LsTree = require("./commands/Ls-Tree");

const command = process.argv[2];

switch (command) {
  case "init":
    createGitDirectory();
    break;
  case "cat-file":
    handleCatfileCommands()
    break;
  case "hash-object":
    handleHashobjectCommands();
    break;
  case "ls-tree":
    handleLsTreeCommands();
    break;
  default:
    throw new Error(`Unknown command ${command}`);
}

function createGitDirectory() {
  fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });

  fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
  console.log("Initialized git directory");
}

function handleCatfileCommands(){
    const flag=process.argv[3];
    const commit=process.argv[4];

    const catFileCommand = new CatFile(flag,commit)

    catFileCommand.executeCommand()
}

function handleHashobjectCommands(){
    let flag=process.argv[3];
    let filepath=process.argv[4];

    if(!filepath){
        filepath=flag;
        flag=null
    }

    const hasobject=new Hashobject(flag,filepath);
    hasobject.execute()

}

function handleLsTreeCommands(){
    const shah=process.argv[3];
    const flag=process.argv[4]

    const lstree=new LsTree(shah,flag);

    lstree.execute()

}