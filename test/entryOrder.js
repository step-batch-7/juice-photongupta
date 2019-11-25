const assert = require("assert");
const entryOrderLib = require("../src/entryOrder.js");
const date = new Date();

describe("makeEntry", function() {
  it("should record order when file is empty", function() {
    let actual = entryOrderLib.makeEntry(
      {},
      ["-save", "-beverage", "orange", "-empID", "23333", "-qty", "1"],
      date
    );
    let expected = {
      "23333": {
        orders: [{ bevrage: "orange", qty: "1", date: date }],
        total: 1
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update record for every order of different employee", function() {
    let actual = entryOrderLib.makeEntry(
      {
        "23333": {
          orders: [{ bevrage: "orange", qty: "1", date: date }],
          total: 1
        }
      },
      ["-save", "-beverage", "orange", "-empID", "23335", "-qty", "2"],
      date
    );
    let expected = {
      "23333": {
        orders: [{ bevrage: "orange", qty: "1", date: date }],
        total: 1
      },
      "23335": {
        orders: [{ bevrage: "orange", qty: "2", date: date }],
        total: 2
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should update record for every order of same employee", function() {
    let actual = entryOrderLib.makeEntry(
      {
        "23333": {
          orders: [{ bevrage: "orange", qty: "1", date: date }],
          total: 1
        },
        "23335": {
          orders: [{ bevrage: "orange", qty: "1", date: date }],
          total: 1
        }
      },
      ["-save", "-beverage", "mango", "-empID", "23333", "-qty", "2"],
      date
    );
    let expected = {
      "23333": {
        orders: [
          { bevrage: "orange", qty: "1", date: date },
          { bevrage: "mango", qty: "2", date: date }
        ],
        total: 3
      },
      "23335": {
        orders: [{ bevrage: "orange", qty: "1", date: date }],
        total: 1
      }
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

describe("saveRecord", function() {
  it("should write every new entry in the file", function() {
    let orderDetail = [
      "-save",
      "-beverage",
      "orange",
      "-empID",
      "1111",
      "-qty",
      "1"
    ];
    const reader = function(path, incoding) {
      assert.equal("path", path);
      assert.equal("utf8", incoding);
      return "{}";
    };
    let actual = entryOrderLib.saveRecord(orderDetail, date, "path", reader);
    let expected = {
      "1111": {
        orders: [{ bevrage: "orange", qty: "1", date: date }],
        total: 1
      }
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should write new entry in the file when file is empty", function() {
    let orderDetail = [
      "-save",
      "-beverage",
      "orange",
      "-empID",
      "1111",
      "-qty",
      "1"
    ];
    const reader = function(path, incoding) {
      assert.equal("path", path);
      assert.equal("utf8", incoding);
      return "";
    };
    let actual = entryOrderLib.saveRecord(orderDetail, date, "path", reader);
    let expected = {
      "1111": {
        orders: [{ bevrage: "orange", qty: "1", date: date }],
        total: 1
      }
    };
    assert.deepStrictEqual(actual, expected);
  });
});
