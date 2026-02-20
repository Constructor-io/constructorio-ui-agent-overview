import "@testing-library/jest-dom";
import failOnConsole from "jest-fail-on-console";

if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

failOnConsole();
