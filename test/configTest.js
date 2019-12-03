const config = require("../src/config");
const assert = require("assert");
const { timeStamp, getDataStorePath } = config;

describe("", function() {
  it("should pick the path from the env variable", function() {
    const env = { path: "./appTests/saveFile.json" };
    assert.strictEqual(getDataStorePath(env), "./appTests/saveFile.json");
  });
  it("should give default path when not configured", function() {
    const env = {};
    assert.strictEqual(getDataStorePath(env), "annaJuiceRecord.json");
  });
});

describe("timeStamp", function() {
  it("should give current time by default", function() {
    assert.deepStrictEqual(timeStamp({}), new Date());
  });

  it("should give stubbed time from env variable", function() {
    const stubbedDate = new Date("2019-01-01");
    const env = { NOW: stubbedDate };
    assert.deepStrictEqual(timeStamp(env), stubbedDate);
  });
});
