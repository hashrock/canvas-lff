var LffLine = {};

LffLine.charNo = function(input){
    var regex = /\[([0-9a-f][0-9a-f][0-9a-f][0-9a-f])\] (.)/;
    var m = regex.exec(input);
    if(m){
        var result = m[2];
        return result;
    }
    return null;
}
LffLine.line = function(input){
    var regex2 = /([0-9.]+),([0-9.]+);([0-9.]+),([0-9.]+)/g
    var m = regex2.exec(input);
    if(m){
        var result = [m[1],m[2], m[3], m[4]]
        return result;
    }
    return null;
}

module.exports = LffLine;
