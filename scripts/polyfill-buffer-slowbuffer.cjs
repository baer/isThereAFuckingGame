const buffer = require("buffer");

if (typeof buffer.SlowBuffer === "undefined") {
  buffer.SlowBuffer = buffer.Buffer;
}

