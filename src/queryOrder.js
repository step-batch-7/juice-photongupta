const fs = require("fs");
const utils = require("./utilities");

const sum = function(previousSum, orderDetail) {
  let currentSum = +orderDetail["qty"] + previousSum;
  return currentSum;
};

const getTotalQuantity = function(employeeOrderDetail) {
  let total = employeeOrderDetail.reduce(sum, 0);
  return total;
};

const isQueryResultEmpty = function(queryResult) {
  return queryResult == undefined;
};

const convertOrderIntoString = function(empId) {
  return function(order) {
    return [empId, order["beverage"], order["qty"], order["date"]].join(",");
  };
};

const giveQueryResult = function(orderDetail, orderRecord) {
  let heading = "empId,beverage,qty,date\n";
  let queryResult = orderRecord[orderDetail["empId"]];
  if (isQueryResultEmpty(queryResult)) {
    queryResult = [];
  }
  let totalQty = getTotalQuantity(queryResult);
  let orderList = queryResult.map(convertOrderIntoString(orderDetail["empId"]));
  let msgForTotal = "\nTotal: " + totalQty + " Juices";
  return heading + orderList.join("\n") + msgForTotal;
};

exports.giveQueryResult = giveQueryResult;
exports.sum = sum;
exports.getTotalQuantity = getTotalQuantity;
exports.isQueryResultEmpty = isQueryResultEmpty;
