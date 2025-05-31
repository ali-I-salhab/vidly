// path module

const path = require("path");
console.log(__filename);
const pathObject = path.parse(__filename);

console.log(pathObject);
console.log(pathObject.ext);
