const utils = require("./utilities");

const makeEntry = function(lastRecord, orderDetail, date) {
  const employeeOrderDetail = {
    beverage: orderDetail.beverage,
    qty: orderDetail.qty,
    date: date
  };
  if (!lastRecord.hasOwnProperty(orderDetail.empId)) {
    lastRecord[orderDetail.empId] = [];
  }
  lastRecord[orderDetail.empId].push(employeeOrderDetail);
  return lastRecord;
};

const updateRecord = function(orderDetail, allRecord, date, fileOperations) {
  let updatedRecord = makeEntry(allRecord, orderDetail, date);
  const updatedRecordInString = JSON.stringify(updatedRecord);
  utils.write(fileOperations, updatedRecordInString);
};

const getSaveConfirmationMsg = function(orderDetails, date) {
  let status = "Transaction Recorded:\n";
  let heading = "Employee ID,Beverage,Quantity,Date\n";
  let currentRecord = [
    orderDetails.empId,
    orderDetails.beverage,
    orderDetails.qty,
    date.toJSON()
  ].join(",");
  return status + heading + currentRecord;
};

const performSaveCmd = function(orderDetail, allRecord, date, fileOperations) {
  updateRecord(orderDetail, allRecord, date, fileOperations);
  let saveConfirmationMsg = getSaveConfirmationMsg(orderDetail, date);
  return saveConfirmationMsg;
};

exports.makeEntry = makeEntry;
exports.updateRecord = updateRecord;
exports.performSaveCmd = performSaveCmd;
exports.getSaveConfirmationMsg = getSaveConfirmationMsg;
