let form = document.getElementById("resultForm");
let message = document.getElementById("message");
let result = document.getElementById("result");
// Get saved students from local storage
let savedData = localStorage.getItem("students");
let students = [];
if (savedData !== null) {
    students = JSON.parse(savedData);
}
// Function to show a message
function showMessage(text) {
    message.textContent = text;
}
// Function to display all students
function displayStudents() {
    result.innerHTML = "<h2>Student Results</h2>";
    for (let i = 0; i < students.length; i++) {
        let student = students[i];

        let card = document.createElement("div");
        card.className = "student-card";

        let name = document.createElement("p");
        name.innerHTML = "Student Name: <strong></strong>";

        name.querySelector("strong").textContent = student.name;
        let total = document.createElement("p");
        total.innerHTML = "Total Marks: <strong></strong>";

        total.querySelector("strong").textContent = student.totalMarks;
        let obtained = document.createElement("p");

        obtained.innerHTML = "Obtained Marks: <strong></strong>";
        obtained.querySelector("strong").textContent = student.obtainedMarks;

        let percentage = document.createElement("p");
        percentage.innerHTML = "Percentage: <strong></strong>";
        percentage.querySelector("strong").textContent =
            student.percentage.toFixed(2) + "%";
            
        let grade = document.createElement("p");
        grade.innerHTML = "Grade: <strong></strong>";
        grade.querySelector("strong").textContent = student.grade;

        let status = document.createElement("p");
        status.append("Status: ");

        let statusText = document.createElement("strong");
        statusText.textContent = student.status;

        if (student.status === "Pass") {
            statusText.className = "pass";
        } else {
            statusText.className = "fail";
        }
        status.appendChild(statusText);
        card.append(name, total, obtained, percentage, grade, status);
        result.appendChild(card);
    }
    result.style.display = "block";
}
// Show saved students when page opens
if (students.length > 0) {
    displayStudents();
}
// Form submit hone par code chalega
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("studentName").value.trim();
    let englishInput = document.getElementById("english").value;
    let mathInput = document.getElementById("math").value;
    let computerInput = document.getElementById("computer").value;
    let urduInput = document.getElementById("urdu").value;
    let scienceInput = document.getElementById("science").value;
    let islamiatInput = document.getElementById("islamiat").value;
    // Store marks in an array
    let marksInput = [
        englishInput,
        mathInput,
        computerInput,
        urduInput,
        scienceInput,
        islamiatInput
    ];
    // Check empty fields
    if (name === "" || marksInput.includes("")) {
        showMessage("Please fill in all fields.");
        result.style.display = "none";
        return;
    }
    // Convert marks into numbers
    let english = Number(englishInput);
    let math = Number(mathInput);
    let computer = Number(computerInput);
    let urdu = Number(urduInput);
    let science = Number(scienceInput);
    let islamiat = Number(islamiatInput);
    // Store numeric marks in an array
    let marks = [english, math, computer, urdu, science, islamiat];
    // Check that marks are whole numbers
    for (let i = 0; i < marks.length; i++) {
        if (!Number.isInteger(marks[i])) {
            showMessage("Please enter whole-number marks.");
            result.style.display = "none";
            return;
        }
    }
    // Check that marks are between 0 and 100
    for (let i = 0; i < marks.length; i++) {
        if (marks[i] < 0 || marks[i] > 100) {
            showMessage("Marks must be between 0 and 100.");
            result.style.display = "none";
            return;
        }
    }
    // Calculate total and obtained marks
    let totalMarks = 600;
    let obtainedMarks = 0;
    for (let i = 0; i < marks.length; i++) {
        obtainedMarks = obtainedMarks + marks[i];
    }
    // Calculate percentage
    let percentage = (obtainedMarks / totalMarks) * 100;
    let grade;
    if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }
    // Check Pass or Fail
    let status;
    if (
        english < 40 ||
        math < 40 ||
        computer < 40 ||
        urdu < 40 ||
        science < 40 ||
        islamiat < 40
    ) {
        status = "Fail";
    } else {
        status = "Pass";
    }
    // Create student object
    let student = {
        name: name,
        totalMarks: totalMarks,
        obtainedMarks: obtainedMarks,
        percentage: percentage,
        grade: grade,
        status: status
    };
    // Add student to array
    students.push(student);
    // Save all students in local storage
    localStorage.setItem("students", JSON.stringify(students));
    // Display all student results
    displayStudents();
    // Clear form and message
    form.reset();
    message.textContent = "";
});