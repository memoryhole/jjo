#!/usr/bin/env node
import { program } from "commander";
import * as fs from "fs";
import * as path from "path";
import { parse, parseKeyValuePairs } from "./index";
import readline from "readline"

function printJSON(obj: unknown) {
    if (process.stdout.isTTY) {
        // tslint:disable-next-line no-console
        console.log(JSON.stringify(obj, null, 4));
    } else {
        // tslint:disable-next-line no-console
        console.log(JSON.stringify(obj));
    }
}

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json")).toString());
program.version(pkg.version);
program.description("a small utility to create JSON objects");
program.arguments("[items...]");
program.option("-a, --array", "create a json array");
program.action((args, cmd) => {
    if (cmd.array) {

        if (args.length) {
            printJSON(args.map((item: string) => parse(item)));

        } else {
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout,
              terminal: false,
            });

            const lines: string[] = [];

            rl.on("line", (data: string) => lines.push(data));
            rl.on("close", () => printJSON(lines.map((item: string) => parse(item))));
        }
    } else {
        printJSON(parseKeyValuePairs(args));
    }
});

program.parse(process.argv);
