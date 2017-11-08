#!/usr/bin/env node
"use strict";

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _inquirer = require("inquirer");

var _convert = require("./convert");

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var collectArray = function collectArray(val, memo) {
  memo.push(val);
  return memo;
};

_commander2.default.version("0.0.1").description("Convert json file to swift Codable").option("-p, --prefix <prefix>", "Prefix for className").option("-c, --className <className>", "Your class name").option("-j, --jsonFile [jsonFile]", "Your example json.").parse(process.argv);

if (_underscore2.default.isEmpty(_commander2.default.className)) {
  throw new Error("className is not specific");
}

if (_underscore2.default.isEmpty(_commander2.default.jsonFile)) {
  throw new Error("example jsonFile not found");
}

(0, _convert.json2codable)({
  prefix: _commander2.default.prefix || "",
  jsonfile: _commander2.default.jsonFile || "",
  currentClass: _commander2.default.className || ""
});