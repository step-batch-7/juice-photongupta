const sum = function(previousSum, orderDetail) {
  let currentSum = +orderDetail["qty"] + previousSum;
  return currentSum;
};

const getTotalQuantity = function(employeeOrderDetail) {
  let total = employeeOrderDetail.reduce(sum, 0);
  return total;
};

const query = function(orderDetail, path, reader, encoding) {
  let orderRecord = reader(path, encoding);
  let employeeOrderDetail = "";
  if (orderRecord != "") {
    orderRecord = JSON.parse(orderRecord);
    employeeOrderDetail = orderRecord[orderDetail["empId"]];
  }
  return employeeOrderDetail;
};

const isQueryResultEmpty = function(queryResult) {
  return queryResult == "" || queryResult == undefined;
};

const convertOrderIntoString = function(empId) {
  return function(order) {
    return [empId, order["beverage"], order["qty"], order["date"]].join(",");
  };
};

const giveQueryResult = function(orderDetail, path, reader, encoding) {
  let heading = "empId,beverage,qty,date\n";
  let queryResult = query(orderDetail, path, reader, encoding);
  if (isQueryResultEmpty(queryResult)) {
    return "Total: 0 Juices";
  }
  let totalQty = getTotalQuantity(queryResult);
  let orderList = queryResult.map(convertOrderIntoString(orderDetail["empId"]));
  let msgForTotal = "\nTotal: " + totalQty + " Juices";
  return heading + orderList.join("\n") + msgForTotal;
};

exports.query = query;
exports.giveQueryResult = giveQueryResult;
exports.sum = sum;
exports.getTotalQuantity = getTotalQuantity;
exports.isQueryResultEmpty = isQueryResultEmpty;
