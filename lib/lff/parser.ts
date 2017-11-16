import * as lff from "./line";

function parseLines(lines) {
    const fonts: any[] = [];
    let info: any[] = [];
    let letter = "";
    lines.forEach(item => {
        if (item === "") {
            if (letter !== "") {
                fonts.push([
                    letter,
                    info
                ]);
                info = [];
                letter = "";
            }
        } else {
            const resultChar = lff.charNo(item);
            if (resultChar) {
                letter = resultChar;
            }
            const resultLine = lff.line(item);
            if (resultLine) {
                info.push(resultLine);
            }
        }
    })

    return fonts;
}

export default parseLines;
