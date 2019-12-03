const timeStamp = function(env) {
  const stubbedDate = new Date(env.NOW);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  const date = hasValidStubbedDate ? stubbedDate : new Date();
  return date;
};

const getDataStorePath = env => env.path || "annaJuiceRecord.json";

module.exports = { timeStamp, getDataStorePath };
