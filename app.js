// file system module

const fs = require("fs");

// const files = fs.readdirSync("./");

// console.log(files);

// we pass callback function
fs.readdir("./df", (err, res) => {
  err ? console.log(err) : console.log("no error");
  console.log(res);
});
