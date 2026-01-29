const express = require("express");
const Student = require("../models/Student"); // must match export

const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find(); // 🔥 This works now
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add student
router.post("/add", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete student
router.delete("/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
