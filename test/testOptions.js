const assert = require("assert");
const optionsLib = require("../src/options.js");
const entryOrderLib = require("../src/entryOrder.js");
const queryOrderLib = require("../src/queryOrder.js");

describe("getCmdRef", function() {
  it("should return function reference according to the userOptions", function() {
    let actual = optionsLib.getCmdRef(["--save"]);
    let expected = entryOrderLib.updateTransaction;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return function reference according to the userOptions", function() {
    let actual = optionsLib.getCmdRef(["--query"]);
    let expected = queryOrderLib.giveQueryResult;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getNextElement", function() {
  it("should give the next element of the array", function() {
    let actual = optionsLib.getNextElement(["r", "1"], "r");
    let expected = "1";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("parseUserOptions", function() {
  it("should change the array of args to object of args", function() {
    let userOptions = ["--beverage", "orange", "--empId", 1111, "--qty", 1];
    let actual = optionsLib.parseUserOptions(userOptions);
    let expected = { beverage: "orange", empId: 1111, qty: 1 };
    assert.deepStrictEqual(actual, expected);
  });
});
