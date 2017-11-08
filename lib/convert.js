"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.json2codable = undefined;

var _changeCase = require("change-case");

var _changeCase2 = _interopRequireDefault(_changeCase);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

var _writeToFile = require("./writeToFile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var json2codable = exports.json2codable = function json2codable(obj) {
  var jsonfile = obj.jsonfile,
      prefix = obj.prefix,
      currentClass = obj.currentClass;

  _async2.default.waterfall([function (callback) {
    var data = _fs2.default.readFileSync(jsonfile, "utf8");
    var jsonObject = JSON.parse(data);
    callback(null, jsonObject);
  }, function (json, callback) {
    if (json instanceof Array) {
      parseArray(prefix, currentClass, json);
      return;
    }

    parseObj(prefix, currentClass, json);
  }], function (err, result) {
    throw err;
  });
};

var parseObj = function parseObj(prefix, className, data, callback) {
  var newClass = "" + prefix + _changeCase2.default.pascalCase(className);
  var dictionary = {};

  _underscore2.default.allKeys(data).forEach(function (key) {
    var value = data[key];
    var swiftVar = _changeCase2.default.camelCase(key);
    dictionary[key] = { swiftVar: swiftVar };

    if (_underscore2.default.isString(value)) {
      dictionary[key]["swiftType"] = "String";
      return;
    }

    if (_underscore2.default.isNumber(value)) {
      var type = data[key] % 1 === 0 ? "Int" : "Double";
      dictionary[key]["swiftType"] = type;
      return;
    }

    if (_underscore2.default.isBoolean(value)) {
      dictionary[key]["swiftType"] = "Bool";
      return;
    }

    if (_underscore2.default.isArray(value)) {
      var currentClass = "" + prefix + _changeCase2.default.pascalCase(key);
      dictionary[key]["swiftType"] = "[" + currentClass + "]";

      parseArray(prefix, _changeCase2.default.pascalCase(key), value);
      return;
    }

    if (_underscore2.default.isObject(value)) {
      var _currentClass = "" + prefix + _changeCase2.default.pascalCase(key);
      dictionary[key]["swiftType"] = _currentClass;

      parseObj(prefix, _changeCase2.default.pascalCase(key), value);
      return;
    }
  });

  (0, _writeToFile.writeToFile)(newClass, dictionary);
};

var parseArray = function parseArray(prefix, className, data) {
  var obj = {};
  data.forEach(function (element) {
    _underscore2.default.allKeys(element).forEach(function (key) {
      obj[key] = element[key];
    });
  });

  parseObj(prefix, className, obj);
};