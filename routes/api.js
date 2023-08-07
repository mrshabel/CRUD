const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// retrieve all students data
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    if (!students) res.status(404).json({ message: "No data available" });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Couldn't fetch students" });
  }
});

// create new student data
router.post("/students", async (req, res) => {
  const { name, studentID, gender, level } = req.body;

  try {
    const existingStudent = await Student.findOne({ studentID });
    if (existingStudent)
      res.status(400).json({ message: "Student already exists" });
    const student = new Student({ name, studentID, gender, level });
    const data = await student.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//  updating student data
router.patch("/students/:id", async (req, res) => {
  const id = req.params.id;
  const updatedInfo = req.body;
  options = { new: true };

  try {
    const student = await Student.findByIdAndUpdate(id, updatedInfo, options);
    if (!student) res.status(404).json({ message: "Student not found" });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// delete student data
router.delete("/students/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
