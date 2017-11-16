import fs from "fs";

const buf = fs.readFileSync(process.argv[2]);

let offset = 0;
while(offset < buf.length){
    const chr = String.fromCodePoint(buf.readUInt16LE(offset));
    console.log("@"+ chr);
    offset += 2;

    const strokeNum = buf.readUInt16LE(offset);
    console.log(":"+ strokeNum);
    offset += 2;
    for(let i = 0; i < strokeNum; i++){
        const x0 = buf.readUInt8(offset + 0);
        const y0 = buf.readUInt8(offset + 1);
        const x1 = buf.readUInt8(offset + 2);
        const y1 = buf.readUInt8(offset + 3);
        console.log(x0 + ", " + y0 + ", " + x1 + ", " + y1);
        offset += 4;
    }
}