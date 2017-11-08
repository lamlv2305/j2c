"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeToFile = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _async = require("async");

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var writeToFile = exports.writeToFile = function writeToFile(currentClass, dict, callback) {
  var content = "import Foundation\n";

  content += "struct " + currentClass + ": Codable {\n";

  // write variable
  _underscore2.default.allKeys(dict).forEach(function (key) {
    var _dict$key = dict[key],
        swiftVar = _dict$key.swiftVar,
        swiftType = _dict$key.swiftType;

    content += "\tlet " + swiftVar + ": " + swiftType + "?\n";
  });

  // write enum
  content += "\n\tenum CodingKeys: String, CodingKey {\n";
  _underscore2.default.allKeys(dict).forEach(function (key) {
    var _dict$key2 = dict[key],
        swiftVar = _dict$key2.swiftVar,
        swiftType = _dict$key2.swiftType;

    content += "\t\tcase " + swiftVar + " = \"" + key + "\"\n";
  });
  content += "\t}\n\n";

  // write init
  content += "\tinit(from decoder: Decoder) throws {\n";
  content += "\t\tlet values = try decoder.container(keyedBy: CodingKeys.self)\n";
  _underscore2.default.allKeys(dict).forEach(function (key) {
    var _dict$key3 = dict[key],
        swiftVar = _dict$key3.swiftVar,
        swiftType = _dict$key3.swiftType;

    content += "\t\t" + swiftVar + " = try values.decodeIfPresent(" + swiftType + ".self, forKey: ." + swiftVar + ")\n";
  });
  content += "\t}\n";

  // end file
  content += "}";

  var directory = "./swift";
  if (!_fs2.default.existsSync(directory)) {
    _fs2.default.mkdirSync(directory);
  }

  _fs2.default.writeFile(directory + "/" + currentClass + ".swift", content, callback);
};