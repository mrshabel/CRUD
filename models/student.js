const mongoose = require("mongoose");

// create student schema
const studentSchema = new mongoose.Schema({
  name: String,
  studentID: { type: String, unique: true },
  level: String,
  gender: String,
});

const Student = mongoose.model("students", studentSchema);

module.exports = Student;
