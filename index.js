const express = require("express");
const log = require("./logger");
const Joi = require("joi");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

// this also a middleware
app.use(express.json()); // if there a json object in the body ofthe request it parse it to json
app.use(log); // we call this function to install middleware function in the request processing pipeline

// app.use(function (req, res, next) {
//   console.log("authentication .....");
//   next();
// });
app.use(express.urlencoded()); //we can recieve data from form encode in postman
app.use(express.static("public")); //acces files from public
app.use(helmet());
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  //   console.log("mogran enabled in development environment");
  startupDebugger("mogran enabled in development environment");
}

console.log(` app : ${app.get("env")}`);
console.log(` NODE_ENV  :  ${process.env.NODE_ENV}`);
const courses = [
  { title: "course 1 ", id: 1 },
  { title: "course 2 ", id: 2 },
  { title: "course 3 ", id: 3 },
  { title: "course 4 ", id: 4 },
];
// configuration
console.log("application name", config.get("name"));
console.log("mail server name", config.get("mail.host"));
console.log("mail server password", config.get("mail.password"));
dbDebugger("connected to data base ");
app.get("/", (req, res) => {
  res.render("index", { title: "from pug file ", message: " hello" });
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((ele) => {
    // console.log(ele.id);
    // console.log(req.params.id);
    // console.log(ele.id === parseInt(req.params.id));
    return ele.id === parseInt(req.params.id);
  });

  if (!course) {
    res.status(404).send("the course with the given id is not gived");
  }
  res.send(course);
});
app.post("/api/courses", (req, res) => {
  const { error, result } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    title: req.body.title,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  // look up the course
  const course = courses.find((ele) => {
    return ele.id === parseInt(req.params.id);
  });

  console.log(course);

  // not exist
  if (!course) {
    res.status(404).send("course with the given id not found");
    return;
  }
  // validate

  const { error, result } = validateCourse(req.body);
  // if not valid return 400 bad request
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // update the course
  course.title = req.body.title;

  // return the updated course
  res.send(course);
});

//PORT

const port = process.env.PORT || 3000;
console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`listenting on port ${port} ....`);
});

// nodemon -> node monitor

function validateCourse(course) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(12).required(),
  });

  return schema.validate(course);
}
// every route handler function is s middleware function
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((ele) => {
    return ele.id === parseInt(req.params.id);
  });

  console.log(course);

  // not exist
  if (!course) {
    res.status(404).send("course with the given id not found");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});
