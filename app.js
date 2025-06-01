// import { connect, Schema, model } from "mongoose";
// connect("mongodb://localhost/vidly")
//   .then(() => console.log("connection to db succeessfully"))
//   .catch((err) => console.log("cant connect ", err));

// const coursesSchema = new Schema({
//   name: String,
//   author: String,
//   tags: [String],
//   data: { type: Date, default: Date.now },
//   isPublished: Boolean,
// });

// const Course = model("Course", coursesSchema);
// const course = new Course({
//   name: "node js course",
//   author: "ali salhab",
//   tags: ["node", "backend"],
//   isPublished: false,
// });

// const res = await course.save();
// // console.log(res);

// const a = await Course.find();
// console.log(a.length);
