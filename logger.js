const url = "http://alisalhab.com";

function log(message) {
  console.log(message);
}

module.exports.log = log;
module.exports.endPoint = url;
// we wil not export url to the outside because it is implement details
