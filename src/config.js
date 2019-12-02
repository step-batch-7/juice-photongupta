const timeStamp = function(env) {
  const stubbedDate = new Date(env.NOW);
  const hasValidStubbedDate = !isNaN(stubbedDate.getTime());
  const date = hasValidStubbedDate ? stubbedDate : new Date();
  return date;
};

exports.timeStamp = timeStamp;
