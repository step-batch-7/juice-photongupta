const utils = require("../src/utilities");
const fs = require("fs");
const assert = require("assert");

describe("read", function() {
  it("should read given file and give the content of file", function() {
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "rashmi";
    };
    let fileOperation = {
      path: "path",
      encoding: "utf8",
      reader: read
    };
    let actual = utils.read(fileOperation);
    let expected = "rashmi";
    assert.deepStrictEqual(actual, expected);
  });

  it("should give empty string for empty file", function() {
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "";
    };
    let fileOperation = {
      path: "path",
      encoding: "utf8",
      reader: read
    };
    let actual = utils.read(fileOperation);
    let expected = "";
    assert.deepStrictEqual(actual, expected);
  });
});

describe("isFileExists", function() {
  it("should validate if given file exists", function() {
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    let fileOperation = {
      path: "path",
      encoding: "utf8",
      existsFile: existsFile
    };
    let actual = utils.doesFileExist(fileOperation);
    let expected = true;
    assert.deepStrictEqual(actual, expected);
  });

  it("should validate if given file does not exists", function() {
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    let fileOperation = {
      path: "path",
      encoding: "utf8",
      existsFile: existsFile
    };
    let actual = utils.doesFileExist(fileOperation);
    let expected = false;
    assert.deepStrictEqual(actual, expected);
  });
});

describe("write", function() {
  it("should write the content into the given file", function() {
    let wasWriteCalled = 0;
    const write = function(path, content, encoding) {
      wasWriteCalled = 1;
      assert.strictEqual(path, "path");
      assert.strictEqual(content, "123");
      assert.strictEqual(encoding, "utf8");
      return;
    };
    let fileOperation = {
      path: "path",
      encoding: "utf8",
      writer: write
    };
    let actual = utils.write(fileOperation, "123");
    let expected = undefined;
    assert.deepStrictEqual(actual, expected);
    assert.deepStrictEqual(wasWriteCalled, 1);
  });
});

describe("readFile", function() {
  it("should give the parsed content of file if file exits", function() {
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return '{"1":"John"}';
    };
    let fileOperation = {
      path: "path",
      encoding: "utf8",
      reader: read,
      existsFile: existsFile
    };
    let actual = utils.readFile(fileOperation);
    let expected = { "1": "John" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give the empty object if file  does not exits", function() {
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return false;
    };
    let fileOperation = {
      path: "path",
      encoding: "utf8",
      existsFile: existsFile
    };
    let actual = utils.readFile(fileOperation);
    let expected = {};
    assert.deepStrictEqual(actual, expected);
  });

  it("should give the empty object of file if file is empty", function() {
    const existsFile = function(path) {
      assert.strictEqual(path, "path");
      return true;
    };
    const read = function(path, encoding) {
      assert.strictEqual(path, "path");
      assert.strictEqual(encoding, "utf8");
      return "";
    };
    let fileOperation = {
      path: "path",
      encoding: "utf8",
      reader: read,
      existsFile: existsFile
    };
    let actual = utils.readFile(fileOperation);
    let expected = {};
    assert.deepStrictEqual(actual, expected);
  });
});

describe("getFileOperations", function() {
  it("should give an object that will contain all required tools for file processing.", function() {
    let actual = utils.getFileOperations();
    let expected = {
      path: "./annaJuiceRecord.json",
      encoding: "utf8",
      reader: fs.readFileSync,
      writer: fs.writeFileSync,
      existsFile: fs.existsSync
    };
    assert.deepStrictEqual(actual, expected);
  });
});
