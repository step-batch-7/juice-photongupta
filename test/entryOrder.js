const assert = require("assert");
const entryOrderLib = require("../src/entryOrder.js");
const date = new Date();

describe("makeEntry", function() {
  it("should record order when file is empty", function() {
    let actual = entryOrderLib.makeEntry(
      {},
      { beverage: "orange", empId: 1111, qty: 1 },
      date
    );
    let expected = {
      1111: [{ beverage: "orange", qty: 1, date: date }]
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update record for every order of different employee", function() {
    let actual = entryOrderLib.makeEntry(
      {
        1111: [{ beverage: "orange", qty: 1, date: date }]
      },
      { beverage: "orange", empId: 1112, qty: 2 },
      date
    );
    let expected = {
      1111: [{ beverage: "orange", qty: 1, date: date }],
      1112: [{ beverage: "orange", qty: 2, date: date }]
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update record for every order of same employee", function() {
    let actual = entryOrderLib.makeEntry(
      {
        23333: [{ beverage: "orange", qty: 1, date: date }],
        23335: [{ beverage: "mango", qty: 1, date: date }]
      },
      { beverage: "orange", empId: 23333, qty: 2 },
      date
    );
    let expected = {
      23333: [
        { beverage: "orange", qty: 1, date: date },
        { beverage: "orange", qty: 2, date: date }
      ],
      23335: [{ beverage: "mango", qty: 1, date: date }]
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isFileEmpty", function() {
  it("should validate if given file is empty.", function() {
    let actual = entryOrderLib.isFileEmpty("");
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should not validate if given file is not empty.", function() {
    let actual = entryOrderLib.isFileEmpty("rashmi");
    let expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("updateRecord", function() {
  it("should write every new entry in the file", function() {
    let orderDetail = { beverage: "orange", empId: 1111, qty: 1 };
    let content = '{"1111": [{ beverage: "orange", qty: 1, date: date }]}';
    const reader = function(path, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
      return "{}";
    };
    const writer = function(path, content, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
    };
    let actual = entryOrderLib.updateRecord(
      orderDetail,
      "path",
      reader,
      "utf8",
      writer,
      date
    );
    let expected = {
      "1111": [{ beverage: "orange", qty: 1, date: date }]
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should write new entry in the file when file is empty", function() {
    let orderDetail = { beverage: "orange", empId: 1111, qty: 1 };
    let content = '{"1111": [{ beverage: "orange", qty: 1, date: date }]}';
    const reader = function(path, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
      return "";
    };
    const writer = function(path, content, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
    };
    let actual = entryOrderLib.updateRecord(
      orderDetail,
      "path",
      reader,
      "utf8",
      writer,
      date
    );
    let expected = {
      "1111": [{ beverage: "orange", qty: 1, date: date }]
    };
    assert.deepStrictEqual(actual, expected);
  });
});
