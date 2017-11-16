import * as fs from "fs";

const inputFile = process.argv[2];

var dd = fs.readFileSync(inputFile, "utf-8");
import p from "../lib/lff/parser";

var data = p(dd.split("\n"));
console.log(data.length + "char parsed.");

const buf = new Buffer(1000 * 1000 * 100);
let offset = 0;

let codemax = 0;
let lengthmax = 0;

function norm(str){
    const f = parseFloat(str);
    return Math.round(256 * f / 10);
}

function lim(val, limit){
    if(val > limit){
        return limit;
    }
    return val;
}

for (const font of data) {
    //文字の書き込み
    const cp = font[0].charCodeAt(0);
    buf.writeUInt16LE(cp, offset);
    console.log("@"+ font[0]);
    console.log("@@"+ cp);
    if(codemax < cp){
        codemax = cp;
    }
    offset += 2;

    //ストロークの数
    const strokeNum = font[1].length;
    buf.writeUInt16LE(strokeNum, offset);
    console.log(":"+ strokeNum);
    if(lengthmax < strokeNum){
        lengthmax = strokeNum;
    }
    offset += 2;

    //ストローク（4つ一組）
    for(let x = 0; x < strokeNum; x++){
        const f = [
            norm(font[1][x][0]),
            norm(font[1][x][1]),
            norm(font[1][x][2]),
            norm(font[1][x][3])
        ];
        if(f.length > 4){
            buf.writeUInt8(lim(f[0], 255), offset);
            buf.writeUInt8(lim(f[1], 255), offset + 1);
            buf.writeUInt8(lim(f[2], 255), offset + 2);
            buf.writeUInt8(lim(f[3], 255), offset + 3);
        }
        offset += f.length;
    }
}

const outbuf = new Buffer(offset);
buf.copy(outbuf, 0, 0, offset);

console.log("CODE_POINT_MAX: " + codemax);
console.log("LENGTH_MAX: " + lengthmax);

console.log(offset / 1000 + "KB");

fs.writeFileSync(inputFile + ".bin", outbuf);

