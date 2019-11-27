const queryLib = require("../src/queryOrder.js");
const assert = require("assert");
const date = new Date();

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

describe("isQueryResultEmpty", function() {
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

describe("giveQueryResult", function() {
  it("should give all order details of given employee with total juice consumption", function() {
    let actual = queryLib.giveQueryResult(
      {
        empId: 1111
      },
      { 1111: [{ beverage: "orange", qty: 1, date: date }] }
    );
    let expected =
      "empId,beverage,qty,date\n1111,orange,1," + date + "\nTotal: 1 Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give total zero when orter entry file is empty", function() {
    let actual = queryLib.giveQueryResult(
      {
        empId: 1111
      },
      {}
    );
    let expected = "empId,beverage,qty,date\n\nTotal: 0 Juices";
    assert.deepStrictEqual(actual, expected);
  });
});
