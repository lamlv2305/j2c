import changeCase from "change-case";
import _ from "underscore";
import fs from "fs";
import async from "async";
import { writeToFile } from "./writeToFile";

export const json2codable = obj => {
  const { jsonfile, prefix, currentClass } = obj;
  async.waterfall(
    [
      callback => {
        const data = fs.readFileSync(jsonfile, "utf8");
        let jsonObject = JSON.parse(data);
        callback(null, jsonObject);
      },
      (json, callback) => {
        if (json instanceof Array) {
          parseArray(prefix, currentClass, json);
          return;
        }

        parseObj(prefix, currentClass, json);
      }
    ],
    (err, result) => {
      throw err;
    }
  );
};

const parseObj = (prefix, className, data, callback) => {
  const newClass = `${prefix}${changeCase.pascalCase(className)}`;
  let dictionary = {};

  _.allKeys(data).forEach(key => {
    const value = data[key];
    const swiftVar = changeCase.camelCase(key);
    dictionary[key] = { swiftVar: swiftVar };

    if (_.isString(value)) {
      dictionary[key]["swiftType"] = "String";
      return;
    }

    if (_.isNumber(value)) {
      const type = data[key] % 1 === 0 ? "Int" : "Double";
      dictionary[key]["swiftType"] = type;
      return;
    }

    if (_.isBoolean(value)) {
      dictionary[key]["swiftType"] = "Bool";
      return;
    }

    if (_.isArray(value)) {
      let currentClass = `${prefix}${changeCase.pascalCase(key)}`;
      dictionary[key]["swiftType"] = `[${currentClass}]`;

      parseArray(prefix, changeCase.pascalCase(key), value);
      return;
    }

    if (_.isObject(value)) {
      let currentClass = `${prefix}${changeCase.pascalCase(key)}`;
      dictionary[key]["swiftType"] = currentClass;

      parseObj(prefix, changeCase.pascalCase(key), value);
      return;
    }
  });

  writeToFile(newClass, dictionary);
};

const parseArray = (prefix, className, data) => {
  let obj = {};
  data.forEach(element => {
    _.allKeys(element).forEach(key => {
      obj[key] = element[key];
    });
  });

  parseObj(prefix, className, obj);
};
