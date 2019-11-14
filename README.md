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

### Reading from files

A value that starts with ```@``` will be interpreted as plain text.


```bash
jjo test=@LICENSE
```
```json
{
    "test": "MIT License\r\n\r\nCopyright (c) 2019 Daisuke Kato\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy\r\nof this software and associated documentation files (the \"Software\"), to deal\r\nin the Software without restriction, including without limitation the rights\r\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r\ncopies of the Software, and to permit persons to whom the Software is\r\nfurnished to do so, subject to the following conditions:\r\n\r\nThe above copyright notice and this permission notice shall be included in all\r\ncopies or substantial portions of the Software.\r\n\r\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER\r\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r\nSOFTWARE."
}
```

A value that starts with ```:``` will be interpreted as JSON.

```bash
jjo test=:something.json
```
```json
{
    "test": {
        "somekey": "somevalue",
        "anotherkey": 123
    }
}
```

To pass a string that begins with ```:``` or ```@``` you can escape the outer quotes.

```bash
jjo special_string=\":bar\"
```
```json
{
    "special_string": ":bar"
}
```

## See also
* [jo](https://github.com/jpmens/jo)
* [gjo](https://github.com/skanehira/gjo)
* [rjo](https://github.com/dskkato/rjo)
* [njo](https://github.com/hiroppy/njo)
