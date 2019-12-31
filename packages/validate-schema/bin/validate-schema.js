#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require("fs");
const Ajv = require("ajv");
const ajv = new Ajv();
const program = require("commander");

const packageJson = require("../package");

program
  .version(`${packageJson.name} ${packageJson.version}`)
  .requiredOption("--input", "input json path")
  .requiredOption("--schema", "schema json path");

program.on("--help", () => {
  console.log("");
  console.log("Examples:");
  console.log("  $ validate-schema --input /path/to/input.json --schema /path/to/schema.json");
});

program.parse(process.argv);

const storyboard = program.input;
const schema = program.schema;

const chalk = require("chalk");

const valid = ajv.validate(schema, JSON.parse(fs.readFileSync(storyboard, "utf8")));
if (!valid) {
  console.log(chalk.bgKeyword("red")(JSON.stringify(ajv.errors)));
}
