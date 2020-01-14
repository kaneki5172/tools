#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const Ajv = require("ajv");
const ajv = new Ajv();

const packageRoot = process.cwd();
let validateSchema = {
  storyboard: path.join(packageRoot, "storyboard.json"),
  schema: require("@tinytot/kit/.schema/storyboard.json")
};

if (fs.existsSync(path.join(packageRoot, ".validate-schema.js"))) {
  validateSchema = require(path.join(packageRoot, ".validate-schema.js"));
}

const storyboard = validateSchema.storyboard;
const schema = {};
for (const [key, value] of Object.entries(validateSchema.schema)) {
  if (key !== "$schema") {
    schema[key] = value;
  }
}

const chalk = require("chalk");

const valid = ajv.validate(schema, JSON.parse(fs.readFileSync(storyboard, "utf8")));
if (!valid) {
  console.log(chalk.red(JSON.stringify(ajv.errors)));
  process.exitCode = 1;
}
