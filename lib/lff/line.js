const LffLine = {};

LffLine.charNo = input => {
    const regex = /\[([0-9a-f][0-9a-f][0-9a-f][0-9a-f])\] (.)/;
    const m = regex.exec(input);
    if(m){
        const result = m[2];
        return result;
    }
    return null;
}
LffLine.line = input => {
    const regex2 = /([0-9.]+),([0-9.]+);([0-9.]+),([0-9.]+)/g;
    const m = regex2.exec(input);
    if(m){
        const result = [m[1],m[2], m[3], m[4]];
        return result;
    }
    return null;
}

export default LffLine;
