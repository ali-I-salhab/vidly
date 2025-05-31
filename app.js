// node module system

// console.log(""); //global object
// global.setTimeout(() => {
//   console.log("after 2 seconds delay");
// }, 2000);
// setTimeout(() => {
//   console.log("ali salhab");
// }, 12);

// clearTimeout();
// setInterval(() => {

// }, 12);
// clearInterval();

// all this method are global and can be call from any file (module)
//

// var message = "";
// console.log(global.message);

// in browser all methos and variables are available in the window object

// how to solve this problem ?/

// this all about global object next we will intersection about node module syste m in node js

var sayhello = function () {
  console.log("hello world");
};

sayhello();

// in browser we can acces it via window.sayhellow();
// any new defintion will override any old defination with the same name

// NODE MODULE SYSTEM

// module
//
