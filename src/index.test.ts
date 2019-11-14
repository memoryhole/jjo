import { parse, parseKeyValuePairs } from './index';
import * as fs from 'fs';
import * as path from 'path';

describe('jjo', () => {
    it('parses standard types', () => {
        expect(parseKeyValuePairs([
            'string=string',
            'number=1234',
            'boolean=true',
            'boolean2=false',
            'float=1.234',
            'empty=',
            'badfloat=1.123.4'
        ])).toEqual({
            string: 'string',
            number: 1234,
            boolean: true,
            boolean2: false,
            float: 1.234,
            empty:'',
            badfloat:'1.123.4'
        });
    });

    it('parses json types', () => {
        expect(parseKeyValuePairs([
            'obj={"key": "value", "flag": false}',
            'arr=[{"something": "else", "num": 123}, true, "string"]'
        ])).toEqual({
            obj: {"key": "value", "flag": false},
            arr: [{"something": "else", "num": 123}, true, "string"]
        });
    });

   it('handles invalid json', () => {
        expect(() => parseKeyValuePairs([
            'obj={"key": "value", "flag: false}',
            'arr=[{"something": "else" "num": 123}, true, "string"]'
        ])).toThrow(/Invalid JSON: /);
    });

    it('parses files', () => {
        expect(parseKeyValuePairs([
            `obj=:${__dirname}/__fixtures__/data.json`
        ])).toEqual({
            obj: {
                "boolean": true,
                "key": "value",
                "number": 123.12
            }
        });
    });

    it('parses files literally', () => {
        const filePath = path.join(__dirname, "/__fixtures__/data.json");
        expect(parseKeyValuePairs([
            `obj=@${filePath}`
        ])).toEqual({
            obj: fs.readFileSync(filePath).toString()
        });
    });

    it('handles files with invalid json', () => {
        const filePath = path.join(__dirname, "/__fixtures__/bad_data.json");
        expect(() => parseKeyValuePairs([
            `obj=:${filePath}`
        ])).toThrow(/Invalid JSON in file/);
    });
});