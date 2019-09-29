import commander from 'commander';
import { parseToJSON } from './index';

const pkg = require("../package.json");
commander.version(pkg.version);

const args = commander.parse(process.argv);
console.log(parseToJSON(args.args))