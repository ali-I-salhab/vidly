const express = require("express");

const Joi = require("joi");
const app = express();
app.use(express.json());

const courses = [
  { title: "course 1 ", id: 1 },
  { title: "course 2 ", id: 2 },
  { title: "course 3 ", id: 3 },
  { title: "course 4 ", id: 4 },
];

app.get("/", (req, res) => {
  res.send("hello world !!!");
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
