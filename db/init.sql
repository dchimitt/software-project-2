CREATE DATABASE IF NOT EXISTS StudentDB;

USE StudentDB;

CREATE TABLE IF NOT EXISTS Student (
    StudentID INT NOT NULL UNIQUE CHECK (StudentID BETWEEN 1 AND 10),
    FirstName VARCHAR(50) NOT NULL,
    MiddleName VARCHAR(50),
    LastName VARCHAR(50) NOT NULL,
    CourseScore INT CHECK (CourseScore BETWEEN 0 AND 100),
    PRIMARY KEY (StudentID)
);

-- Sample Data
INSERT INTO Student (StudentID, FirstName, MiddleName, LastName, CourseScore) VALUES
(1, 'John', 'Michael', 'Doe', 85),
(2, 'Jane', 'Marie', 'Smith', 92),
(3, 'Chris', 'William', 'Johnson', 74),
(4, 'Amanda', 'Grace', 'Lee', 89),
(5, 'David', 'Paul', 'Brown', 65),
(6, 'Sophia', 'Lynn', 'Miller', 78),
(7, 'Michael', 'Thomas', 'Wilson', 88),
(8, 'Olivia', 'Jane', 'Davis', 91),
(9, 'Ethan', 'Luke', 'Martinez', 77),
(10, 'Emma', 'Rose', 'Garcia', 94);

