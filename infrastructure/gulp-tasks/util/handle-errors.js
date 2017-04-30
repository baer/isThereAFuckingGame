"use strict";

const notify = require("gulp-notify");

module.exports = function (errorObject) {
  const formattedError = errorObject
    .toString()
    .split(": ")
    .join(":\n");

  notify.onError(formattedError).apply(this, arguments);

  // Keep gulp from hanging on this task
  if (typeof this.emit === "function") { this.emit("end"); }
};
