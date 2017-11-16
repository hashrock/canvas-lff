import fs from "fs";

const buf = fs.readFileSync(process.argv[2]);

for(let i = 0; i < 100; i++){
    const u = buf.readUInt8(i);
    console.log(u);
}

