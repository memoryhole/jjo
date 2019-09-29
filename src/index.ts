import * as fs from 'fs';

type Value = string | boolean | number | null | Array<any> | Object;

function isJSON(input : string) {
     return (input.startsWith("{") && input.endsWith("}")) || (input.startsWith("[") && input.endsWith("]"));
}

function isFileReference(input: string) {
    return input.startsWith(":");
}

function readFile(input: string) : Value {
    const filePath = input.slice(1);
    return JSON.parse(fs.readFileSync(filePath).toString());

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