var fs = require("fs");

var buf = fs.readFileSync(process.argv[2]);

var offset = 0;
while(offset < buf.length){
    var chr = String.fromCodePoint(buf.readUInt16LE(offset));
    console.log("@"+ chr);
    offset += 2;

    var strokeNum = buf.readUInt16LE(offset);
    console.log(":"+ strokeNum);
    offset += 2;
    for(var i = 0; i < strokeNum; i++){
        var x0 = buf.readUInt8(offset + 0);
        var y0 = buf.readUInt8(offset + 1);
        var x1 = buf.readUInt8(offset + 2);
        var y1 = buf.readUInt8(offset + 3);
        console.log(x0 + ", " + y0 + ", " + x1 + ", " + y1);
        offset += 4;
    }
}