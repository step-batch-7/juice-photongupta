const fs = require("fs");

const isFileEmpty = function(fileContent) {
  return fileContent == "";
};

const makeEntry = function(lastRecord, orderDetail, date) {
  const employeeOrderDetail = {
    beverage: orderDetail["beverage"],
    qty: orderDetail["qty"],
    date: date
  };
  if (!lastRecord.hasOwnProperty(orderDetail["empId"])) {
    lastRecord[orderDetail["empId"]] = [];
  }
  lastRecord[orderDetail["empId"]].push(employeeOrderDetail);
  return lastRecord;
};

const updateRecord = function(
  orderDetail,
  path,
  reader,
  encoding,
  writer,
  date
) {
  let lastRecord = reader(path, encoding);
  if (isFileEmpty(lastRecord)) {
    lastRecord = "{}";
  }
  lastRecord = JSON.parse(lastRecord);
  let updatedRecord = makeEntry(lastRecord, orderDetail, date);
  const updatedRecordInString = JSON.stringify(updatedRecord);
  writer(path, updatedRecordInString, encoding);
  return updatedRecord;
};

const updateTransaction = function(
  orderDetail,
  path,
  reader,
  encoding,
  writer,
  date
) {
  updateRecord(orderDetail, path, reader, encoding, writer, date);
  let status = "TransectionId:\n";
  let heading = "empId,beverage,qty,date\n";
  let currentRecord = [
    orderDetail["empId"],
    orderDetail["beverage"],
    orderDetail["qty"],
    date.toJSON()
  ].join(",");
  return status + heading + currentRecord;
};

exports.makeEntry = makeEntry;
exports.updateRecord = updateRecord;
exports.isFileEmpty = isFileEmpty;
exports.updateTransaction = updateTransaction;
