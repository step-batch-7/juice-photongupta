const queryLib = require("../src/queryOrder.js");
const assert = require("assert");
const date = new Date().toJSON();

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
    let actual = queryLib.performQueryCmd(
      {
        empId: 1111
      },
      {
        1111: [
          { beverage: "orange", qty: 1, date: date },
          { beverage: "mango", qty: 1, date: date }
        ]
      }
    );
    let expected =
      "empId,beverage,qty,date\n1111,orange,1," +
      date +
      "\n1111,mango,1," +
      date +
      "\nTotal: 2 Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give all order details of given date with total juice consumption", function() {
    let actual = queryLib.performQueryCmd(
      {
        date: date.slice(0, 10)
      },
      { 1111: [{ beverage: "orange", qty: 1, date: date }] }
    );
    let expected =
      "empId,beverage,qty,date\n1111,orange,1," + date + "\nTotal: 1 Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give all order details of given beverage with total juice consumption", function() {
    let actual = queryLib.performQueryCmd(
      {
        beverage: "orange"
      },
      {
        1111: [
          { beverage: "orange", qty: 1, date: date },
          { beverage: "mango", qty: 1, date: date }
        ]
      }
    );
    let expected =
      "empId,beverage,qty,date\n1111,orange,1," + date + "\nTotal: 1 Juices";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give total zero when orter entry file is empty", function() {
    let actual = queryLib.performQueryCmd(
      {
        empId: 1111
      },
      {}
    );
    let expected = "empId,beverage,qty,date\n\nTotal: 0 Juices";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isTransactionOfTheDay", function() {
  it("should validate if the transaction date and user date are same ", function() {
    let date = "2019-11-26";
    let transaction = { date: "2019-11-26" };
    let actual = queryLib.isTransactionOfTheDay(date, transaction);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return false if the transaction date and user date are different  ", function() {
    let date = "2019-11-26";
    let transaction = { date: "2019-11-27" };
    let actual = queryLib.isTransactionOfTheDay(date, transaction);
    let expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getRequiredRecords", function() {
  it("should return true if record date is same as user date", function() {
    let beverageRecord = {
      empId: 1111,
      beverage: "orange",
      qty: 1,
      date: "2019-11-29"
    };
    let time = "2019-11-29";
    let actual = queryLib.getRequiredRecords(
      undefined,
      undefined,
      time
    )(beverageRecord);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true if record date is not same as user date", function() {
    let beverageRecord = {
      empId: 1111,
      beverage: "orange",
      qty: 1,
      date: "2019-11-29"
    };
    let time = "2019-11-28";
    let actual = queryLib.getRequiredRecords(
      undefined,
      undefined,
      time
    )(beverageRecord);
    let expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should return true if record's date and beverage are same as user's date and beverage", function() {
    let beverageRecord = {
      empId: 1111,
      beverage: "orange",
      qty: 1,
      date: "2019-11-29"
    };
    let time = "2019-11-29";
    let beverage = "orange";
    let actual = queryLib.getRequiredRecords(
      beverage,
      undefined,
      time
    )(beverageRecord);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should give false if any of the record's option is not equal to the user options", function() {
    let beverageRecord = {
      empId: 1111,
      beverage: "orange",
      qty: 1,
      date: "2019-11-29"
    };
    let time = "2019-11-29";
    let beverage = "orange";
    let empId = 1212;
    let actual = queryLib.getRequiredRecords(
      beverage,
      empId,
      time
    )(beverageRecord);
    let expected = false;
    assert.deepStrictEqual(actual, expected);
  });

  it("should give true if all the record's options same as the user options", function() {
    let beverageRecord = {
      empId: 1111,
      beverage: "orange",
      qty: 1,
      date: "2019-11-29"
    };
    let time = "2019-11-29";
    let beverage = "orange";
    let empId = 1111;
    let actual = queryLib.getRequiredRecords(
      beverage,
      empId,
      time
    )(beverageRecord);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });
});
