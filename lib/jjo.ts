#!/usr/bin/env node
import commander from "commander";
import { parse, parseKeyValuePairs } from "./index";

import * as pkg from "../package.json";

function printJSON(obj: any) {
    if (process.stdout.isTTY) {
        // tslint:disable-next-line no-console
        console.log(JSON.stringify(obj, null, 4));
    } else {
        // tslint:disable-next-line no-console
        console.log(JSON.stringify(obj));
    }
}

commander.version(pkg.version);
commander.description("a small utility to create JSON objects");
commander.arguments("[items...]");
commander.option("-a, --array", "create a json array");
commander.action((args, cmd) => {
    if (cmd.array) {

        if (args.length) {
            printJSON(args.map((item: string) => parse(item)));

        } else {
            const readline = require("readline");
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

commander.parse(process.argv);
