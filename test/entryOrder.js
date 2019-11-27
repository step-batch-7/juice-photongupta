const assert = require("assert");
const entryOrderLib = require("../src/entryOrder.js");
const date = new Date();
const utils = require("../src/utilities");

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

describe("updateRecord", function() {
  it("should write every new entry in the file when file is empty", function() {
    let orderDetail = { beverage: "orange", empId: 1111, qty: 1 };
    const write = function(path, content, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
    };
    let allRecord = {};
    let fileOperations = {
      path: "path",
      encoding: "utf8",
      writer: write
    };
    let actual = entryOrderLib.updateRecord(
      orderDetail,
      allRecord,
      date,
      fileOperations
    );
    let expected = undefined;
    assert.deepStrictEqual(actual, expected);
  });

  it("should write new entry in the file when file when file have some content", function() {
    let orderDetail = { beverage: "orange", empId: 1111, qty: 1 };
    const write = function(path, content, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
    };
    let allRecord = { 1112: [{ beverage: "mango", qty: 3, date: date }] };
    let fileOperations = {
      path: "path",
      encoding: "utf8",
      writer: write
    };
    let actual = entryOrderLib.updateRecord(
      orderDetail,
      allRecord,
      date,
      fileOperations
    );
    let expected = undefined;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("performSaveCmd", function() {
  it("should update record and give the status", function() {
    const write = function(path, content, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
    };
    let orderDetail = { beverage: "orange", empId: 1111, qty: 1 };
    let allRecord = {};
    let fileOperations = {
      writer: write,
      path: "path",
      encoding: "utf8"
    };

    let actual = entryOrderLib.performSaveCmd(
      orderDetail,
      allRecord,
      date,
      fileOperations
    );
    let expected =
      "TransectionId:\nempId,beverage,qty,date\n1111,orange,1," + date.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getSaveConfirmationMsg", function() {
  it("should give confirmation message will show the transaction is recorded", function() {
    let orderDetails = { empId: 1111, beverage: "mango", qty: 1 };
    let actual = entryOrderLib.getSaveConfirmationMsg(orderDetails, date);
    let expected =
      "TransectionId:\nempId,beverage,qty,date\n1111,mango,1," + date.toJSON();
    assert.deepStrictEqual(actual, expected);
  });
});
