# njo
Njo is a small utility to create JSON objects that was inspired by [jpmens/jo](https://github.com/jpmens/jo) and [skanehira/gjo](https://github.com/skanehira/gjo).

The original Jo was written in C. This is the Node.js port.

## How to install

```bash
npm install -g njo
```

## Usage

```
Usage: njo [options] [items...]

Inspired by jpmens/jo

Options:
  -V, --version  output the version number
  -a, --array    create a json array
  -h, --help     output usage information
  ```

## Examples

### Create Object
```bash
njo number=123 float=123.12 string="this is a string" otherstring=foobar object={\"a\":true} array=[1,2,3] boolean=true
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
njo -a 123 "foor bar" {\"a\":123} false
```
```json
[
    123,
    "foor bar",
    {
        "a": 123
    },
    true
]
```

### Nesting
```bash
njo somekey=false array=$(njo -a *)
```
```json
{
    "somekey": true,
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
