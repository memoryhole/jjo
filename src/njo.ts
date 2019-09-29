import commander from 'commander';
import { parse, parseKeyValuePairs } from './index';

const pkg = require("../package.json");

commander.version(pkg.version);
commander.description("Inspired by jpmens/jo")
commander.arguments("[items...]");
commander.option("-a, --array", "create a json array")
commander.action((args, cmd) => {
    if (cmd.array) {

        if (args.length) {
            console.log(args.map((item: string) => parse(item)));

        } else {
            var readline = require('readline');
            var rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout,
              terminal: false
            });

            const lines : Array<string>= [];
            
            rl.on('line', (data: string) => lines.push(data));
            rl.on('close', () => console.log(lines.map((item: string) => parse(item))))
        }
    } else {
        console.log(parseKeyValuePairs(args))
    }
});

commander.parse(process.argv);