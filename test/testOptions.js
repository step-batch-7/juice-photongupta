const assert = require("assert");
const optionsLib = require("../src/options.js");
const entryLib = require("../src/entry.js");
const queryLib = require("../src/query.js");
const isValid = require("../src/isInputValid");

describe("parseOptions", function() {
  it("should parse the options and give the function reference of save record for --save option", function() {
    let userOptions = [
      "node",
      "beverage.js",
      "--save",
      "--beverage",
      "orange",
      "--empId",
      1111,
      "--qty",
      1
    ];
    let actual = optionsLib.parseOptions(userOptions);
    let args = { beverage: "orange", empId: 1111, qty: 1 };
    let expected = { cmdRef: entryLib.performSaveCmd, args: args };
    assert.deepStrictEqual(actual, expected);
  });

  it("should parse the options and give the function reference of error message when options are invalid", function() {
    let userOptions = [
      "node",
      "beverage.js",
      "save",
      "--beverage",
      "orange",
      "--empId",
      1111,
      "--qty",
      1
    ];
    let actual = optionsLib.parseOptions(userOptions);
    let expected = { cmdRef: optionsLib.getErrorMessage };
    assert.deepStrictEqual(actual, expected);
  });

  it("should parse the options and give the function reference of query for --query option", function() {
    let userOptions = ["node", "beverage.js", "--query", "--empId", 1111];
    let actual = optionsLib.parseOptions(userOptions);
    let args = { empId: 1111 };
    let expected = { cmdRef: queryLib.performQueryCmd, args: args };
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

describe("messageForWrongInput", function() {
  it("should give message -> inValid Input", function() {
    let actual = optionsLib.getErrorMessage();
    let expected = "invalid Input";
    assert.deepStrictEqual(actual, expected);
  });
});
