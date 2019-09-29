#!/usr/bin/env node
import commander from 'commander';
import { parse, parseKeyValuePairs } from './index';

const pkg = require("../package.json");

function printJSON(obj: any) {
    if (process.stdout.isTTY) {
        console.log(JSON.stringify(obj, null, 4));
    } else {
        console.log(JSON.stringify(obj));
    }
}

commander.version(pkg.version);
commander.description("Inspired by jpmens/jo")
commander.arguments("[items...]");
commander.option("-a, --array", "create a json array")
commander.action((args, cmd) => {
    if (cmd.array) {

        if (args.length) {
            printJSON(args.map((item: string) => parse(item)));

        } else {
            var readline = require('readline');
            var rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout,
              terminal: false
            });

            const lines : Array<string>= [];
            
            rl.on('line', (data: string) => lines.push(data));
            rl.on('close', () => printJSON(lines.map((item: string) => parse(item))));
        }
    } else {
        printJSON(parseKeyValuePairs(args));
    }
});

commander.parse(process.argv);