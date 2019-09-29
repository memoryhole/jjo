import { parse } from './index';

describe('jjo', () => {
    it('parses standard types', () => {
        expect(parse([
            'string=string',
            'number=1234',
            'boolean=true',
            'float=1.234',
            'empty=',
            'badfloat=1.123.4'
        ])).toMatchSnapshot()
    });

    it('parses json types', () => {
        expect(parse([
            'obj={"key": "value", "flag": false}',
            'arr=[{"something": "else", "num": 123}, true, "string"]'
        ])).toMatchSnapshot()
    });

   xit('handles invalid json', () => {
        expect(parse([
            'obj={"key": "value", "flag: false}',
            'arr=[{"something": "else" "num": 123}, true, "string"]'
        ])).toMatchSnapshot()
    });

    it('parses files', () => {
        expect(parse([
            `obj=:${__dirname}/__fixtures__/data.json`
        ])).toMatchSnapshot()
    });

    it('parses files literally', () => {
        expect(parse([
            `obj=@${__dirname}/__fixtures__/data.json`
        ])).toMatchSnapshot()
    });

    xit('handles files with invalid json', () => {
        expect(parse([
            `obj=:${__dirname}/__fixtures__/bad_data.json`
        ])).toMatchSnapshot()
    });
});