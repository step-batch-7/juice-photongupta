const fs = require("fs");

const isFileEmpty = function(fileContent) {
  return fileContent == "";
};

const saveRecord = function(orderDetail, date, path, reader) {
  let lastRecord = reader(path, "utf8");
  if (isFileEmpty(lastRecord)) {
    lastRecord = "{}";
  }
  lastRecord = JSON.parse(lastRecord);
  let updatedRecord = makeEntry(lastRecord, orderDetail, date);
  const updatedRecordInString = JSON.stringify(updatedRecord);
  fs.writeFileSync(path, updatedRecordInString, "utf8");
  return updatedRecord;
};

const makeEntry = function(lastRecord, orderDetail, date) {
  const beverage = orderDetail[2];
  const empID = orderDetail[4];
  const quant = orderDetail[6];
  const employeeOrderDetail = { bevrage: beverage, qty: quant, date: date };
  if (!lastRecord.hasOwnProperty(empID)) {
    lastRecord[empID] = { orders: [], total: 0 };
  }
  lastRecord[empID]["orders"].push(employeeOrderDetail);
  lastRecord[empID]["total"] = lastRecord[empID]["total"] + +quant;
  return lastRecord;
};

exports.makeEntry = makeEntry;
exports.saveRecord = saveRecord;
exports.isFileEmpty = isFileEmpty;
