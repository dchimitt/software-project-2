require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection should be correct now (uses course_management)
const db = mysql.createConnection({
    host: "localhost",
    user: "Jay",
    password: "Jay9077$",
    database: "course_management" // Correct DB
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('✅ Connected to MySQL database');
});

// API to get all students sorted by name
app.get('/students', (req, res) => {
    // Use correct table name 'students' and column 'last_name' (or first_name if preferred)
    db.query('SELECT * FROM students ORDER BY last_name ASC', (err, results) => { // Changed ORDER BY column
        if (err) {
            console.error('Error fetching students:', err); // Add logging
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// API to calculate the average score of all students
app.get('/average-score', (req, res) => {
    // Use correct table name 'students' and column 'course_score'
    db.query('SELECT AVG(course_score) AS average FROM students', (err, results) => { // Changed column name
        if (err) {
            console.error('Error fetching average score:', err); // Add logging
            return res.status(500).send(err);
        }
        // Ensure results[0] and average exist, provide default if not
        const average = results && results.length > 0 && results[0].average !== null ? results[0].average : 0;
        res.json({ average: average }); // Send back object { average: value }
    });
});

// API to add a new student
a// Inside server.js

// API to add a new student
app.post('/students', (req, res) => {
    // Destructuring keys should match frontend payload keys
    const { firstName, middleName, lastName, studentID, courseScore } = req.body;

    // Simple validation (consider more robust validation)
    if (firstName === undefined || lastName === undefined || studentID === undefined || courseScore === undefined ) {
        // Check explicitly for undefined if 0 is a valid value
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // You might add type/range checks here too

    // Use correct table name 'students' and snake_case column names
    // *** Ensure 'student_id' is used in the column list ***
    const query = `INSERT INTO students (StudentID, first_name, middle_name, last_name, course_score)
                   VALUES (?, ?, ?, ?, ?)`; // snake_case columns

    // Ensure parameter order matches VALUES (?,?,?,?,?) and query columns
    // The first parameter corresponds to the first '?' (student_id)
    db.query(query, [studentID, firstName, middleName, lastName, courseScore], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            // Provide more specific error based on err.code if possible (e.g., ER_DUP_ENTRY)
            return res.status(500).json({ message: 'Failed to add student', error: err.code }); // Optionally send code
        }
        res.status(201).json({ message: 'Student added successfully', studentId: results.insertId });
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
