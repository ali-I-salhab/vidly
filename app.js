const http = require("http");

const serve = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("ssssssss");
  }
});

serve.listen(3000);

console.log("listenin on port 300 ...");
