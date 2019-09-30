import { parse, parseKeyValuePairs } from './index';

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
        ])).toMatchSnapshot()
    });

    it('parses json types', () => {
        expect(parseKeyValuePairs([
            'obj={"key": "value", "flag": false}',
            'arr=[{"something": "else", "num": 123}, true, "string"]'
        ])).toMatchSnapshot()
    });

   xit('handles invalid json', () => {
        expect(parseKeyValuePairs([
            'obj={"key": "value", "flag: false}',
            'arr=[{"something": "else" "num": 123}, true, "string"]'
        ])).toMatchSnapshot()
    });

    it('parses files', () => {
        expect(parseKeyValuePairs([
            `obj=:${__dirname}/__fixtures__/data.json`
        ])).toMatchSnapshot()
    });

    it('parses files literally', () => {
        expect(parseKeyValuePairs([
            `obj=@${__dirname}/__fixtures__/data.json`
        ])).toMatchSnapshot()
    });

    xit('handles files with invalid json', () => {
        expect(parseKeyValuePairs([
            `obj=:${__dirname}/__fixtures__/bad_data.json`
        ])).toMatchSnapshot()
    });
});