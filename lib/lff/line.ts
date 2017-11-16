export function charNo(input: string) {
    const regex = /\[([0-9a-f][0-9a-f][0-9a-f][0-9a-f])\] (.)/;
    const m = regex.exec(input);
    if (m) {
        const result = m[2];
        return result;
    }
    return "";
}

export function line(input: string) {
    const regex2 = /([0-9.]+),([0-9.]+);([0-9.]+),([0-9.]+)/g;
    const m = regex2.exec(input);
    if (m) {
        const result = [m[1], m[2], m[3], m[4]];
        return result;
    }
    return [];
}
