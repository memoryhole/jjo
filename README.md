# jjo
[![Build Status](https://travis-ci.org/memoryhole/jjo.svg?branch=master)](https://travis-ci.org/memoryhole/jjo)

jjo is a small utility to create JSON objects that was inspired by [jpmens/jo](https://github.com/jpmens/jo) and [skanehira/gjo](https://github.com/skanehira/gjo).

I figured why not add a Javascript version for node.js as well.

## How to install

```bash
npm install -g jjo
```

## Usage

```
Usage: jjo [options] [items...]

a small utility to create JSON objects

Options:
  -V, --version  output the version number
  -a, --array    create a json array
  -h, --help     output usage information
```

## Examples

### Create Object
```bash
jjo number=123 float=123.12 string="this is a string" otherstring=foobar object={\"a\":true} array=[1,2,3] boolean=true
```
```json
{
    "number": 123,
    "float": 123.12,
    "string": "this is a string",
    "otherstring": "foobar",
    "object": {
        "a": true
    },
    "array": [
        1,
        2,
        3
    ],
    "boolean": true
}
```

### Create Array
```bash
jjo -a 123 "foo bar" {\"a\":123} false
```
```json
[
    123,
    "foo bar",
    {
        "a": 123
    },
    false
]
```

### Nesting
```bash
jjo somekey=false array=$(jjo -a *)
```
```json
{
    "somekey": false,
    "array": [
        "dist",
        "jest.config.js",
        "LICENSE",
        "node_modules",
        "package.json",
        "package-lock.json",
        "README.md",
        "src",
        "tsconfig.json"
    ]
}
```

## See also
* [jo](https://github.com/jpmens/jo)
* [gjo](https://github.com/skanehira/gjo)
* [rjo](https://github.com/dskkato/rjo)
* [njo](https://github.com/hiroppy/njo)
