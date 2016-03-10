"use strict";

module.exports = function (options) {
  const opts = options || {};

  if (!opts.ext) { throw new Error("Bundle Name: Please provide an extension"); }

  const version = require("../../package.json").version;
  const bundleName = opts.name || require("../../package.json").name;
  return `${version}.${bundleName}.${opts.ext}`;
};
