const sum = function(previousSum, orderDetail) {
  let currentSum = +orderDetail.qty + previousSum;
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
    employeeOrder.empId = +empId;
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
    const validDate = isTransactionOfTheDay(date, beverageRecord);
    return validEmpId && validDate && validBeverage;
  };
};

const isTransactionOfTheDay = function(date, beverageRecord) {
  let userDate = new Date(date);
  let transactionDate = new Date(beverageRecord.date);
  let isMonthEqual = userDate.getMonth() == transactionDate.getMonth();
  let isYearEqual = userDate.getYear() == transactionDate.getYear();
  let isDateEqual = userDate.getDate() == transactionDate.getDate();
  return isDateEqual && isMonthEqual && isYearEqual;
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
exports.isTransactionOfTheDay = isTransactionOfTheDay;
exports.getRequiredRecords = getRequiredRecords;
