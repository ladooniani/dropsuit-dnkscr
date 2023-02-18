//#region Info

/**
 * @file <h3>DropSuit</h3>
 * <p>
 *   DropSuit is a JavaScript(ES6) and Node.js(v14.x) module library
 *   created by Lado Oniani that offers a diverse collection of functions
 *   for natural language processing (NLP) and data manipulation.
 *   It provides a curated collection of original and classic techniques and methods
 *   for tasks such as text analysis, language understanding and generation,
 *   as well as for data manipulation tasks. Additionally,
 *   it includes unique tools and features for chatbot dialog flow logic
 *   and other specific use cases.
 *   The library is open-source and available under the Apache License 2.0.
 *   Whether you're a researcher, developer, or data scientist,
 *   DropSuit offers a range of tools to enhance your work,
 *   with a focus on diversity and experimentation.
 * </p>
 * @author Lado Oniani
 * {@link https://github.com/ladooniani GitHub}
 * @see mailto:ladooniani@gmail.com
 * @version 1.0.0
 * @see https://github.com/ladooniani/DropSuit#readme
 * @copyright 2016-2023 Lado Oniani - DropSuit. All Rights Reserved.
 * @license Apache License 2.0
 */

//#endregion

//#region Include required usage import

const fs = require("fs");

//#endregion

//#region  json load

function jsonRootKeyStrct(path) {
  var data = fs.readFileSync(path, "utf8");
  const file = JSON.parse(data);
  let values = Object.values(file).flatMap((x) => x.flatMap(Object.values)); // let valueNames = Object.values(pnmppt).flatMap((x) => x.flatMap(Object.keys));  /// let valueNames = Object.keys(pnmppt.rootkeys_pnmppt[0]);
  const obj = {
    count: values.length,
    positive: values[0],
    negative: values[1],
    maternal: values[2],
    paternal: values[3],
    material: values[4],
    immaterial: values[5],
    animate: values[6],
    inanimate: values[7],
    sensitive: values[8],
    insensitive: values[9],
    rational: values[10],
    irrational: values[11],
  };
  return obj;
}

//#endregion

//#region Modules

module.exports = {
  jsonRootKeyStrct,
};

//#endregion
