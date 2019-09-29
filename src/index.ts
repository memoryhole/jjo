import * as fs from 'fs';

type Value = string | boolean | number | null | Array<any> | Object;

function isJSON(input : string) {
     return (input.startsWith("{") && input.endsWith("}")) || (input.startsWith("[") && input.endsWith("]")) || (input.startsWith('"') && input.endsWith('"'));
}

function isFileReference(input: string) {
    return input.startsWith(":") || input.startsWith("@");
}

function readFile(input: string) : Value {
    const parseJSON = input.startsWith(":") ? true : input.startsWith("@") ? false : undefined;
    const filePath = input.slice(1);

    if (parseJSON === undefined) {
        throw new Error(`input string of '${input}' must begin with one of : or @ to read a file`);
    }

    const contents = fs.readFileSync(filePath).toString();

    if (parseJSON) {
        return JSON.parse(contents);
    } else {
        return contents;
    }
}

export function parse(input: string[]) {
    const pairs = input.map(pair => pair.split("="));

    const obj: {[key: string]: Value} = {};

    pairs.forEach(([key, value]) => {
        if (value === "") {
            obj[key] = "";
        } else if (value === "null") {
            obj[key] = null;
        } else if (["true", "false"].includes(value)) {
            obj[key] = Boolean(value);
        } else if (isFileReference(value)) {
            obj[key] = readFile(value);
        } else if (isJSON(value)) {
            obj[key] = JSON.parse(value);
        } else if (!isNaN(Number(value))) {
            obj[key] = Number(value);
        } else {
            obj[key] = value;
        }
    })

    return obj;
}