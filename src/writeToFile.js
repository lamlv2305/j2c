import fs from "fs";
import _ from "underscore";
import async from "async";

export const writeToFile = (currentClass, dict, callback) => {
  let content = "import Foundation\n";

  content += `struct ${currentClass}: Codable {\n`;

  // write variable
  _.allKeys(dict).forEach(key => {
    const { swiftVar, swiftType } = dict[key];
    content += `\tlet ${swiftVar}: ${swiftType}?\n`;
  });

  // write enum
  content += "\n\tenum CodingKeys: String, CodingKey {\n";
  _.allKeys(dict).forEach(key => {
    const { swiftVar, swiftType } = dict[key];
    content += `\t\tcase ${swiftVar} = "${key}"\n`;
  });
  content += "\t}\n\n";

  // write init
  content += "\tinit(from decoder: Decoder) throws {\n";
  content +=
    "\t\tlet values = try decoder.container(keyedBy: CodingKeys.self)\n";
  _.allKeys(dict).forEach(key => {
    const { swiftVar, swiftType } = dict[key];
    content += `\t\t${swiftVar} = try values.decodeIfPresent(${swiftType}.self, forKey: .${swiftVar})\n`;
  });
  content += "\t}\n";

  // end file
  content += "}";

  const directory = "./swift";
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  fs.writeFile(`${directory}/${currentClass}.swift`, content, callback);
};
