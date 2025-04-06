import React, { useState, useEffect } from "react";
import axios from "axios";
// Import icons from lucide-react
import {
  Users,
  UserPlus,
  BookOpen,     // Keep for logo/title
  PlusSquare,   // Keep for Add button in header
  Target,        // Icon for Average Score Card
  Check,         // Icon for Submit Button
  Palette        // Icon for Student Card Color Variety
} from 'lucide-react';

// --- Helper Function for Card Colors ---
const cardColors = [
  'bg-blue-100 border-blue-200 text-blue-800',
  'bg-purple-100 border-purple-200 text-purple-800',
  'bg-yellow-100 border-yellow-200 text-yellow-800',
  'bg-red-100 border-red-200 text-red-800',
  'bg-green-100 border-green-200 text-green-800',
  'bg-indigo-100 border-indigo-200 text-indigo-800',
];

const getColorByIndex = (index) => cardColors[index % cardColors.length];

// --- Reusable Components ---

// Sidebar Navigation Component - Simplified
const Sidebar = ({ activeView, setActiveView }) => {
  // Only include Add and View options
  const navItems = [
    { id: 'add', label: 'Add Student', icon: UserPlus },
    { id: 'view', label: 'View Students', icon: Users },
  ];

  return (
      // Removed fixed positioning classes for simplicity unless needed for specific mobile strategy
      <div className="w-64 bg-white border-r border-slate-200 p-4 flex flex-col h-full"> {/* Ensure full height */}
        {/* Logo/Course Title */}
        <div className="flex items-center gap-2 px-2 py-4 mb-6">
          <BookOpen className="text-blue-600" size={24} />
          <span className="font-bold text-lg text-slate-800">Course Mgmt</span>
        </div>

        {/* Navigation */}
        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => (
                <li key={item.id} className="mb-2">
                  <button
                      onClick={() => setActiveView(item.id)} // Directly call setActiveView
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                          activeView === item.id
                              ? 'bg-blue-100 text-blue-700' // Active style
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' // Inactive style
                      }`}
                  >
                    <item.icon size={18} strokeWidth={activeView === item.id ? 2.5 : 2} />
                    {item.label}
                  </button>
                </li>
            ))}
          </ul>
        </nav>
      </div>
  );
};

// Header Component (within Main Content) - Simplified
// Added setActiveView prop
const Header = ({ currentViewLabel, setActiveView }) => {
  return (
      <div className="flex justify-between items-center mb-8">
        {/* Left side: Title and Date */}
        <div>
          <h2 className="text-xl font-semibold text-slate-800">{currentViewLabel}</h2>
          <p className="text-xs text-slate-500">Updated: {new Date().toLocaleDateString()}</p>
        </div>
        {/* Right side: Only the Add button */}
        <div className="flex items-center gap-4">
          {/* Add Button - Navigates to 'add' view */}
          <button
              onClick={() => setActiveView('add')} // Set view to 'add' on click
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              aria-label="Add new student" // Accessibility label
          >
            <PlusSquare size={20} />
          </button>
        </div>
      </div>
  );
};

// Add Student Form Component (No changes needed from previous version)
const AddStudentForm = ({ onSubmit, formState, setFormState }) => {
  const { firstName, middleName, lastName, studentID, score } = formState;
  const { setFirstName, setMiddleName, setLastName, setStudentID, setScore } = setFormState;

  return (
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-700 mb-6 text-center">Enter New Student Details</h3>
        <form onSubmit={onSubmit} className="space-y-5 max-w-lg mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-600 mb-1">First Name</label>
              <input id="firstName" type="text" placeholder="E.g., John" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm text-sm" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-600 mb-1">Last Name</label>
              <input id="lastName" type="text" placeholder="E.g., Doe" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm text-sm" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>
          <div>
            <label htmlFor="middleName" className="block text-sm font-medium text-slate-600 mb-1">Middle Name <span className="text-slate-400">(Optional)</span></label>
            <input id="middleName" type="text" placeholder="E.g., M." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm text-sm" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="studentID" className="block text-sm font-medium text-slate-600 mb-1">Student ID (1-10)</label>
              <input id="studentID" type="number" placeholder="Enter ID" min="1" max="10" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm text-sm" value={studentID} onChange={(e) => setStudentID(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="score" className="block text-sm font-medium text-slate-600 mb-1">Score (0-100)</label>
              <input id="score" type="number" placeholder="Enter score" min="0" max="100" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm text-sm" value={score} onChange={(e) => setScore(e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <Check size={18} /> Add Student Record
          </button>
        </form>
      </div>
  );
};

// Average Score Display Component (No changes needed from previous version)
const AverageScoreCard = ({ avgScore }) => {
  return (
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8 flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Target size={24} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-0.5">Class Average Score</h3>
          <p className="font-bold text-2xl text-slate-800">
            {(typeof avgScore === 'number' ? avgScore : Number(avgScore) || 0).toFixed(2)}
          </p>
        </div>
      </div>
  );
};

// Student List Component (No changes needed from previous version)
const StudentList = ({ students }) => {
  return (
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-slate-700">Student Records</h3>
          <span className="text-sm text-slate-500">{students.length} student(s)</span>
        </div>
        <ul className="space-y-4">
          {students.length > 0 ? (
              students
                  .slice()
                  .sort((a, b) => (a.last_name || '').localeCompare(b.last_name || ''))
                  .map((student, index) => {
                    const colorClasses = getColorByIndex(index); // Get color based on index
                    return (
                        <li
                            key={student.studentID}
                            className={`p-4 rounded-xl border shadow-sm transition hover:shadow-md flex items-center gap-4 ${colorClasses}`}
                        >
                          {/* Icon Placeholder */}
                          <div className={`p-2 rounded-lg ${colorClasses.split(' ')[0].replace('100', '200')}`}> {/* Slightly darker bg for icon */}
                            <Palette size={20} className="opacity-70" />
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold text-sm">
                              {student.first_name} {student.middle_name} {student.last_name}
                            </p>
                            <p className="text-xs opacity-80">
                              ID: {student.studentID}
                            </p>
                          </div>
                          <span className={`text-sm font-bold px-3 py-1 rounded-full ${colorClasses.split(' ')[0].replace('100', '600')} text-white shadow`}>
                     {student.course_score}
                  </span>
                        </li>
                    );
                  })
          ) : (
              <p className="text-center text-slate-500 italic py-6">No student records found.</p>
          )}
        </ul>
      </div>
  );
};


// --- Main App Component ---
function App() {
  // State (Keep all existing state)
  const [students, setStudents] = useState([]);
  const [avgScore, setAvgScore] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [score, setScore] = useState("");
  const [activeView, setActiveView] = useState('add'); // Default view
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Keep for mobile

  // Data Fetching Effect (Keep as is)
  useEffect(() => {
    fetchStudents();
    fetchAverageScore();
  }, []);

  // API Calls (Keep as is)
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching students:", error); setStudents([]);
    }
  };

  const fetchAverageScore = async () => {
    try {
      const res = await axios.get("http://localhost:5000/average-score");
      setAvgScore(res.data?.average ?? 0);
    } catch (error) {
      console.error("Error fetching average score:", error); setAvgScore(0);
    }
  };

  // Form Submit Handler (Keep as is)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = parseInt(studentID);
    const scr = parseInt(score);
    if (isNaN(id) || isNaN(scr) || id < 1 || id > 10 || scr < 0 || scr > 100) {
      alert("Please enter valid Student ID (1-10) and Score (0-100)."); return;
    }
    const newStudent = {
      firstName: firstName.trim(), middleName: middleName.trim(), lastName: lastName.trim(),
      studentID: id, courseScore: scr,
    };
    try {
      await axios.post("http://localhost:5000/students", newStudent);
      setFirstName(""); setMiddleName(""); setLastName(""); setStudentID(""); setScore("");
      fetchStudents(); fetchAverageScore();
      setActiveView('view'); // Switch to view tab after adding
      alert("Student added successfully!");
    } catch (error) {
      console.error("Submit Error:", error.response?.data || error.message);
      alert(`Failed to add student. ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  // Determine Header Label (Simplified)
  const viewLabels = { add: 'Add New Student', view: 'Student Overview' };
  const currentViewLabel = viewLabels[activeView] || 'Student Management'; // Fallback title

  // Props for form state management (Keep as is)
  const formState = { firstName, middleName, lastName, studentID, score };
  const setFormState = { setFirstName, setMiddleName, setLastName, setStudentID, setScore };

  return (
      // Main layout container
      <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">

        {/* Mobile Sidebar Toggle Button (Keep for responsiveness) */}
        <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow text-slate-600"
            aria-label="Toggle sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Overlay for mobile sidebar (Keep for responsiveness) */}
        {isSidebarOpen && (
            <div
                className="lg:hidden fixed inset-0 bg-black/30 z-10"
                onClick={() => setIsSidebarOpen(false)}
            ></div>
        )}


        {/* Sidebar Container (Keep for responsiveness) */}
        {/* Apply transition and conditional translate based on isSidebarOpen */}
        <div className={`fixed inset-y-0 left-0 z-20 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex-shrink-0`}>
          <Sidebar activeView={activeView} setActiveView={(view) => { setActiveView(view); setIsSidebarOpen(false); }} />
        </div>


        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Header - Pass setActiveView down */}
          <Header currentViewLabel={currentViewLabel} setActiveView={setActiveView} />

          {/* Conditional Content */}
          {activeView === 'add' && (
              <AddStudentForm onSubmit={handleSubmit} formState={formState} setFormState={setFormState} />
          )}
          {activeView === 'view' && (
              <>
                <AverageScoreCard avgScore={avgScore} />
                <StudentList students={students} />
              </>
          )}
        </main>
      </div>
  );
}

export default App;

