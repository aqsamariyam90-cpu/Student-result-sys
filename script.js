let form = document.getElementById("resultForm");
let message = document.getElementById("message");
let result = document.getElementById("result");
// Function to show a message
function showMessage(text) {
    message.textContent = text;
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
    // Display student result
        document.getElementById("showName").innerHTML =
        'Student Name: <strong>' + name + '</strong>';

        document.getElementById("showTotal").innerHTML =
       'Total Marks: <strong>' + totalMarks + '</strong>';

        document.getElementById("showObtained").innerHTML =
        'Obtained Marks: <strong>' + obtainedMarks + '</strong>';

        document.getElementById("showPercentage").innerHTML =
        'Percentage: <strong>' + percentage.toFixed(2) + '%</strong>';

        document.getElementById("showGrade").innerHTML =
        'Grade: <strong>' + grade + '</strong>';
let showStatus = document.getElementById("showStatus");
if (status === "Pass") {
    showStatus.innerHTML = 'Status: <strong class="pass">Pass</strong>';
} else {
    showStatus.innerHTML = 'Status: <strong class="fail">Fail</strong>';
}
    // Clear message and show result
    message.textContent = "";
    result.style.display = "block";
});