var fs = require("fs");

var buf = fs.readFileSync(process.argv[2]);

for(var i = 0; i < 100; i++){
    var u = buf.readUInt8(i);
    console.log(u);
}

