
const express = require('express');
const app = express();
const PORT = 5000;
app.use(express.json());

let students = [
    {
        id:201,
        rollNumber: "CSE2401",
        name: "Aarav Sharma",
        branch: "CSE",
        semester: 3,
        email: "aarav@example.com"
    },
    {
        id:202,
        rollNumber: "ECE2402",
        name: "Diya Verma",
        branch: "ECE",
        semester: 3,
        email: "diya@example.com"
    },
    {
        id:203,
        rollNumber: "CSE2403",
        name: "Kabir Singh",
        branch: "CSE",
        semester: 3,
        email: "kabir@example.com"
    }
];

app.get("/api/students",(req,res) => {
    res.json(students);
});

app.post("/api/students",(req,res) => {
    console.log(req.headers['content-type']);
    console.log(req.body);
    const newStudent = {
        id: students[students.length - 1].id + 1,
        rollNumber: req.body.rollNumber,
        name: req.body.name,
        branch: req.body.branch,
        semester: req.body.semester,
        email: req.body.email
    };

    if(!newStudent.rollNumber || !newStudent.name || !newStudent.branch || typeof newStudent.semester !== "number" || !newStudent.email){
        return res.status(400).json({message: "Invalid data"});
    }

    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.get("/api/students/filter",(req,res) => {
    let branch = req.query.branch;
    let result = students.filter(student => student.branch.toLowerCase() === (branch || "").toLowerCase());

    res.json(result);
});

app.get("/api/students/:id",(req,res) => {
    let id = Number(req.params.id);
    let student = students.find(student => student.id === id);

    if(!student){
        return res.status(404).json({message: "Student not found"});
    }

    res.json(student);
});

app.put("/api/students/:id",(req,res) => {
    let id = Number(req.params.id);
    let student = students.find(student => student.id === id);

    if(!student){
        return res.status(404).json({message: "Student not found"});
    }

    if(!req.body.rollNumber || !req.body.name || !req.body.branch || typeof req.body.semester !== "number" || !req.body.email){
        return res.status(400).json({message: "Invalid data"});
    }

    student.rollNumber = req.body.rollNumber;
    student.name = req.body.name;
    student.branch = req.body.branch;
    student.semester = req.body.semester;
    student.email = req.body.email;

    res.json(student);
});

app.delete("/api/students/:id",(req,res) => {
    let id = Number(req.params.id);
    let index = students.findIndex(student => student.id === id);

    if(index === -1){
        return res.status(404).json({message: "Student not found"});
    }

    students.splice(index,1);
    res.json({message: "Student deleted successfully"});
});

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
});
