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

export function parse(input: string) {
        if (input === "") {
            return "";
        } else if (input === "null") {
            return  null;
        } else if (["true", "false"].includes(input)) {
            return Boolean(input);
        } else if (isFileReference(input)) {
            return readFile(input);
        } else if (isJSON(input)) {
            return JSON.parse(input);
        } else if (!isNaN(Number(input))) {
            return Number(input);
        } else {
            return input;
        }

}

export function parseKeyValuePairs(input: string[]) {
    const pairs = input.map(pair => pair.split("="));

    const obj: {[key: string]: Value} = {};

    pairs.forEach(([key, value]) => {
        obj[key] = parse(value);
    })

    return obj;
}