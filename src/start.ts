#!/usr/bin/env node
"use strict";
import minimist from "minimist";
import { main } from "./main";
const args = minimist(process.argv.slice(2));
console.log(args);
main().then(() => console.log("\nProgramm Started 🚬..."));
