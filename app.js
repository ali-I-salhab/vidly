// operating system module (os)

const os = require("os");

console.log(os.type());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.arch());

console.log(`total memory on this device ${os.freemem}`);
// console.log(os.endianness());
