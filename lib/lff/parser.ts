import * as lff from "./line";

export interface Line{
    x1: number
    y1: number
    x2: number
    y2: number
}

export interface Font{
    letter: string
    info: Line[]
}

export function parseLines(lines: string[]) {
    const fonts: Font[] = [];
    let info: Line[] = [];
    let letter = "";
    lines.forEach(item => {
        if (item === "") {
            if (letter !== "") {
                const font: Font = {
                    letter: letter,
                    info: info
                }
                fonts.push(font)
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
                const line: Line = {
                    x1: parseFloat(resultLine[0]),
                    y1: parseFloat(resultLine[1]),
                    x2: parseFloat(resultLine[2]),
                    y2: parseFloat(resultLine[3]),
                }
                info.push(line);
            }
        }
    })

    return fonts;
}
