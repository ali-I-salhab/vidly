// event module
const Logger = require("./logger");

const logger = new Logger();

logger.on("logger", () => {
  console.log("loger listerner ");
});

logger.log("sss");
