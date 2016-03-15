var lff = require("./line");

function parseLines(lines){
    var fonts = [];
    var info = [];
    var letter = "";
    lines.forEach(function(item){
        if(item === ""){
            if(letter !== ""){
                fonts.push([
                    letter,
                    info
                ]);
                info = [];
                letter = "";
            }
        }else{
            var resultChar = lff.charNo(item);
            if(resultChar){
                letter = resultChar;
            }
            var resultLine = lff.line(item);
            if(resultLine){
                info.push(resultLine);
            }
        }
    })
    
    return fonts;
}

module.exports = parseLines;
