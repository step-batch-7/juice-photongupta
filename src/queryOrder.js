const sum = function(previousSum, orderDetail) {
  let currentSum = +orderDetail["qty"] + previousSum;
  return currentSum;
};

const getTotalQuantity = function(employeeOrderDetail) {
  let total = employeeOrderDetail.reduce(sum, 0);
  return total;
};

const convertOrderIntoString = function(order) {
  return [order.empId, order.beverage, order.qty, order.date].join(",");
};

const insertEmployeeId = function(empId) {
  return function(employeeOrder) {
    employeeOrder["empId"] = +empId;
    return employeeOrder;
  };
};

const getbeverageRecord = function(orderRecord) {
  allOrderList = [];
  for (let empId in orderRecord) {
    let employeeOrders = orderRecord[empId];
    let orderWithEmpId = employeeOrders.map(insertEmployeeId(empId));
    allOrderList = allOrderList.concat(orderWithEmpId);
  }
  return allOrderList;
};

const getRequiredRecords = function(beverageOption, empIdOption, dateOption) {
  return function(beverageRecord) {
    let empId = empIdOption || beverageRecord.empId;
    let date = dateOption || beverageRecord.date.slice(0, 10);
    let beverage = beverageOption || beverageRecord.beverage;
    const validEmpId = empId == beverageRecord.empId;
    const validBeverage = beverage == beverageRecord.beverage;
    const validDate = date == beverageRecord.date.slice(0, 10);
    return validEmpId && validDate && validBeverage;
  };
};

const formatMessageForQuery = function(requiredRecords, totalQty) {
  let heading = "empId,beverage,qty,date\n";
  let msgForTotal = "\nTotal: " + totalQty + " Juices";
  let orderList = requiredRecords.map(convertOrderIntoString);
  return heading + orderList.join("\n") + msgForTotal;
};

const performQueryCmd = function(orderDetail, orderRecord) {
  let beverageRecords = getbeverageRecord(orderRecord);
  const { beverage, empId, date } = orderDetail;
  const requiredRecords = beverageRecords.filter(
    getRequiredRecords(beverage, empId, date)
  );
  let totalQty = getTotalQuantity(requiredRecords);
  return formatMessageForQuery(requiredRecords, totalQty);
};

exports.performQueryCmd = performQueryCmd;
exports.sum = sum;
exports.getTotalQuantity = getTotalQuantity;
