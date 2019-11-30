const fs = require("fs");

const read = function(fileOperation) {
  let content = fileOperation.reader(
    fileOperation.path,
    fileOperation.encoding
  );
  return content;
};

const doesFileExist = function(fileOperation) {
  return fileOperation.existsFile(fileOperation.path);
};

const write = function(fileOperations, content) {
  fileOperations.writer(fileOperations.path, content, fileOperations.encoding);
};

const readFile = function(fileOperation) {
  let beverageRecords = "{}";
  if (doesFileExist(fileOperation)) {
    const fileContent = read(fileOperation);
    beverageRecords = fileContent == "" ? beverageRecords : fileContent;
  }
  beverageRecords = JSON.parse(beverageRecords);
  return beverageRecords;
};

const getFileOperations = function(envPath) {
  let fileOperations = {
    path: envPath || "./annaJuiceRecord.json",
    encoding: "utf8",
    reader: fs.readFileSync,
    writer: fs.writeFileSync,
    existsFile: fs.existsSync
  };
  return fileOperations;
};

exports.readFile = readFile;
exports.read = read;
exports.doesFileExist = doesFileExist;
exports.write = write;
exports.getFileOperations = getFileOperations;
