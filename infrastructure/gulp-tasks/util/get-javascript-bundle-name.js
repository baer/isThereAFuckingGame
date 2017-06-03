"use strict";

const fs = require("fs");
const path = require("path");

module.exports = () => {
  const pathToJSAssets = path.join(process.cwd(), "/dist-dev/js/");
  return fs.readdirSync(pathToJSAssets)
    .filter((assetName) => assetName.match(".*\.js$"))
    .shift();
};
