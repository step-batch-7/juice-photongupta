const assert = require("assert");
const optionsLib = require("../src/options.js");
const entryOrderLib = require("../src/entryOrder.js");

describe("parseOptions", function() {
  it("should return function reference according to the userOptions", function() {
    let actual = optionsLib.parseOptions(["--save"]);
    let expected = entryOrderLib.saveRecord;
    assert.deepStrictEqual(actual, expected);
  });
});
