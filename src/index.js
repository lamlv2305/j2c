#!/usr/bin/env node

import program from "commander";
import { prompt } from "inquirer";
import { json2codable } from "./convert";
import _ from "underscore";

const collectArray = (val, memo) => {
  memo.push(val);
  return memo;
};

program
  .version("0.0.1")
  .description("Convert json file to swift Codable")
  .option("-p, --prefix <prefix>", "Prefix for className")
  .option("-c, --className <className>", "Your class name")
  .option("-j, --jsonFile [jsonFile]", "Your example json.")
  .parse(process.argv);

if (_.isEmpty(program.className)) {
  throw new Error("className is not specific");
}

if (_.isEmpty(program.jsonFile)) {
  throw new Error("example jsonFile not found");
}

json2codable({
  prefix: program.prefix || "",
  jsonfile: program.jsonFile || "",
  currentClass: program.className || ""
});
