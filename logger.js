var url = "ali salhab";
const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    //  raise event
    this.emit("logger");
  }
}
module.exports = Logger;
