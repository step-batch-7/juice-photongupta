const fs = require("fs");

const saveRecord = function(orderDetail, date) {
  let lastRecord = fs.readFileSync("./annaJuiceRecord.json", "utf8");
  if (lastRecord == "") {
    lastRecord = "{}";
  }
  lastRecord = JSON.parse(lastRecord);
  let updatedRecord = makeEntry(lastRecord, orderDetail, date);
  const updatedRecordInString = JSON.stringify(updatedRecord);
  fs.writeFileSync("./annaJuiceRecord.json", updatedRecordInString, "utf8");
  return updatedRecordInString;
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
