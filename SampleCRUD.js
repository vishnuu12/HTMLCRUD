
function readAll() {

        // Hide the add and update buttons by default
        document.querySelector(".addUser").style.display = "none";
        document.querySelector(".updateUser").style.display = "none";

        // Initialize an empty array in case there's no data in localStorage
        let studentsDetailsParseData = [];

        // Retrieve the students data from localStorage
        let studentsDetailsVariable = localStorage.getItem("studentsDetails");
        console.log('studentsDetailsVariable', studentsDetailsVariable);

        // Check if data exists in localStorage
        if (studentsDetailsVariable === null || studentsDetailsVariable === "[]") {
                studentsDetailsParseData = []; // No data available, set to empty array
        } else {
                try {
                        // Parse the string into an array or object
                        studentsDetailsParseData = JSON.parse(studentsDetailsVariable);

                        // Check if it's an array
                        if (!Array.isArray(studentsDetailsParseData)) {
                                console.error("Expected an array but got:", typeof (studentsDetailsParseData));
                                studentsDetailsParseData = []; // Default to empty array if it's not an array
                        }
                } catch (error) {
                        console.error("Error parsing the data from localStorage:", error);
                        studentsDetailsParseData = []; // Default to empty array on error
                }
        }

        // Initialize an empty string to store the HTML content
        let element = "";

        // Iterate over the students data if it's an array
        studentsDetailsParseData.forEach(record => {
                element += `
                <tr>
                    <td>${record.id}</td>
                    <td>${record.name}</td>
                    <td>${record.mobile}</td>
                    <td>
                        <button class="jstablee" onclick="editUser(${record.id})">Edit</button>
                        <button class="jstabled" onclick="deleteUser(${record.id})">Delete</button>
                    </td>
                </tr>
            `;
        });

        // Get the table body and set its innerHTML
        let tabledata = document.querySelector(".tableBody");
        tabledata.innerHTML = element;
}


function createUser() {
        // Get input data values
        var newid = document.querySelector(".id").value;
        var newname = document.querySelector(".name").value;
        var newcell = document.querySelector(".cell").value;

        // Create a new student object
        var newStudentsDetails = {
                id: parseInt(newid),
                name: newname,
                mobile: newcell
        };

        // Retrieve existing student data from localStorage
        var studentsDetailsVariable = localStorage.getItem("studentsDetails");

        // Check if studentsDetails is already in localStorage
        var studentsDetailsParseData = [];

        if (studentsDetailsVariable !== null) {
                // Parse existing data if it exists
                studentsDetailsParseData = JSON.parse(studentsDetailsVariable);
        }

        // Push the new student to the array
        studentsDetailsParseData.push(newStudentsDetails);

        // Save the updated array back to localStorage
        localStorage.setItem("studentsDetails", JSON.stringify(studentsDetailsParseData));

        // Refresh the data on the page
        readAll();
}



function deleteUser(id) {
        // Confirm if the user really wants to delete the student record
        const isConfirmed = confirm("Are you sure you want to remove this student?");

        if (!isConfirmed) {
                return; // Exit if the user cancels the deletion
        }

        // Retrieve the student data from localStorage
        let studentsDetailsParseData = JSON.parse(localStorage.getItem("studentsDetails"));

        // If the data exists and it's an array, filter out the student by id
        if (Array.isArray(studentsDetailsParseData)) {
                // Filter out the student with the given id
                let studentsDetailsfilter = studentsDetailsParseData.filter(student => student.id !== id);

                // Save the updated list back to localStorage
                localStorage.setItem("studentsDetails", JSON.stringify(studentsDetailsfilter));

                // Refresh the table to reflect the changes
                readAll();
        } else {
                console.error("Error: No student data found in localStorage or incorrect format.");
        }
}

function editUser(id) {
        console.log('Editing student with ID:', id);

        // Get the students' details from localStorage
        var studentsDetailsParseData = JSON.parse(localStorage.getItem("studentsDetails"));

        // Filter the student with the matching id
        var oldStudentData = studentsDetailsParseData.filter(student => student.id === id);

        // Check if the student data exists
        if (oldStudentData.length === 0) {
                console.error('Student with ID ' + id + ' not found.');
                return; // Exit if no student found
        }

        // Log the found student data for debugging
        console.log("Found student data:", oldStudentData);

        // Populate the form fields with the current student data
        document.querySelector(".uid").value = oldStudentData[0].id;
        document.querySelector(".uname").value = oldStudentData[0].name;
        document.querySelector(".ucell").value = oldStudentData[0].mobile;

        // Show the "Update" button and hide the "Add" button
        document.querySelector(".updateUser").style.display = "block";
        document.querySelector(".addUser").style.display = "none";
}



function updateUser() {
        // Get the values from the form fields
        var id = document.querySelector(".uid").value;
        var name = document.querySelector(".uname").value;
        var cell = document.querySelector(".ucell").value;

        // Create the updated student object
        var studentUpdateDetails = { id: parseInt(id), name: name, mobile: cell };

        // Get the student details from localStorage
        var studentsDetailsVariable = localStorage.getItem("studentsDetails");

        if (!studentsDetailsVariable) {
                console.error("No student data found in localStorage.");
                return;
        }

        var studentsDetailsParseData = JSON.parse(studentsDetailsVariable);

        // Check if studentsDetailsParseData is an array
        if (!Array.isArray(studentsDetailsParseData)) {
                console.error("The data in localStorage is not in the expected format.");
                return;
        }

        // Use map() to update the student data
        var updatedStudentsDetails = studentsDetailsParseData.map(student =>
                student.id === parseInt(id) ? studentUpdateDetails : student
        );

        // Save the updated list back to localStorage
        localStorage.setItem("studentsDetails", JSON.stringify(updatedStudentsDetails));

        // Refresh the UI (display the updated list of students)
        readAll();
}


function addButton() {
        document.querySelector(".addUser").style.display = "block"
        document.querySelector(".updateUser").style.display = "none"


}
function backButton() {
        document.querySelector(".updateUser").style.display = "none"
        document.querySelector(".addUser").style.display = "none"
        readAll()

}






