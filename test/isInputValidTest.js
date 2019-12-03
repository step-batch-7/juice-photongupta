const isValid = require("../src/isInputValid");
const assert = require("assert");

describe("isInputValid", function() {
  it("should validate if input is valid", function() {
    const args = [
      "node",
      "beverage.js",
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "123",
      "--qty",
      "1"
    ];
    let actual = isValid.isInputValid(args);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should validate if input is valid", function() {
    const args = ["node", "beverage.js", "--query", "--beverage", "orange"];
    let actual = isValid.isInputValid(args);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should validate if input is valid", function() {
    const args = ["node", "beverage.js", "--query", "beverage", "orange"];
    let actual = isValid.isInputValid(args);
    let expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should  give false if input is Invalid", function() {
    const args = [
      "node",
      "beverage.js",
      "-save",
      "--beverage",
      "orange",
      "--empId",
      "123",
      "--qty",
      "1"
    ];
    let actual = isValid.isInputValid(args);
    let expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isWholeNumber", function() {
  it("should validate if given no is positive whole number", function() {
    assert.ok(isValid.isWholeNumber(3));
  });

  it("should give false if given arg is not a number", function() {
    assert.ok(!isValid.isWholeNumber("abc"));
  });
});
