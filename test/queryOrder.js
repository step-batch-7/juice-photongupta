const queryLib = require("../src/queryOrder.js");
const assert = require("assert");
const date = new Date();

describe("query", function() {
  it("should give undefined when employee had no order", function() {
    let orderDetail = { beverage: "orange", empId: 1111, qty: 1 };
    const reader = function(path, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
      return "{}";
    };
    let actual = queryLib.query(orderDetail, "path", reader, "utf8");
    let expected = undefined;
    assert.deepStrictEqual(actual, expected);
  });

  it("should give nothing when order record is empty", function() {
    let orderDetail = { beverage: "orange", empId: 1111, qty: 1 };
    const reader = function(path, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
      return "";
    };
    let actual = queryLib.query(orderDetail, "path", reader, "utf8");
    let expected = "";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give every order of given employee", function() {
    let orderDetail = { beverage: "orange", empId: 1111, qty: 1 };
    const reader = function(path, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
      return (
        '{"1111":[{"beverage":"orange","qty":1,"date":"' +
        date.toJSON() +
        '"}]}'
      );
    };
    let actual = queryLib.query(orderDetail, "path", reader, "utf8");
    let expected = [{ beverage: "orange", qty: 1, date: date.toJSON() }];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("sum", function() {
  it("should add two integers", function() {
    let actual = queryLib.sum(4, { qty: 5 });
    let expected = 9;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getTotalQuantity", function() {
  it("should and the values of qty of all individual orders", function() {
    let actual = queryLib.getTotalQuantity([{ qty: 5 }, { qty: 4 }]);
    let expected = 9;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("giveQueryResult", function() {
  it("should give all order details of given employee with total juice consumption", function() {
    const reader = function(path, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
      return (
        '{"1111":[{"beverage":"orange","qty":1,"date":"' +
        date.toJSON() +
        '"}]}'
      );
    };
    let actual = queryLib.giveQueryResult(
      {
        beverage: "orange",
        empId: 1111,
        qty: 1
      },
      "path",
      reader,
      "utf8"
    );
    let expected =
      "empId,beverage,qty,date\n1111,orange,1," +
      date.toJSON() +
      "\nTotal: 1 Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give total zero when orter entry file is empty", function() {
    const reader = function(path, encoding) {
      assert.equal("path", path);
      assert.equal("utf8", encoding);
      return "";
    };
    let actual = queryLib.giveQueryResult(
      {
        beverage: "orange",
        empId: 1111,
        qty: 1
      },
      "path",
      reader,
      "utf8"
    );
    let expected = "Total: 0 Juices";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isQueryResultEmpty", function() {
  it("should validate empty query result", function() {
    let actual = queryLib.isQueryResultEmpty("");
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should validate if query result is undefined", function() {
    let actual = queryLib.isQueryResultEmpty(undefined);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should not validate if query result is any object", function() {
    let actual = queryLib.isQueryResultEmpty({ empId: 1111 });
    let expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});
