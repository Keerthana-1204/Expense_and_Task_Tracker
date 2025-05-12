// This script handles the functionality of an expense tracker and a task tracker.
// It allows users to add, delete, and view expenses and tasks, as well as calculate total expenses and task counts.

// Expense Tracker

// Array to hold expense objects
let expenses = [];

// Event listener for the expense form submission
// When the form is submitted, it prevents the default action, retrieves the values from the input fields,
document
  .getElementById("expense-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the values from the input fields
    // Trim the name to remove any leading or trailing whitespace
    const name = document.getElementById("expense-name").value.trim();

    // Parse the amount as a float
    const amount = parseFloat(document.getElementById("expense-amount").value);

    // Check if the name is empty or if the amount is not a number or less than or equal to 0
    // If any of these conditions are true, return early and do not add the expense
    // This prevents invalid data from being added to the expenses array
    // If the name is empty or the amount is not a valid number, do not proceed
    if (!name || isNaN(amount) || amount <= 0) return;

    // Push the new expense object into the expenses array
    expenses.push({ name, amount });

    // Call the updateTable function to refresh the displayed table of expenses
    // Call the updateTotal function to refresh the displayed total amount of expenses
    updateTable();
    updateTotal();

    // Reset the form fields to empty after submission
    this.reset();
  });

// Function to update the expense table

function updateTable() {
  // Get the table body element by its ID
  const tbody = document.getElementById("expense-table-body");

  // Clear the existing rows in the table body
  tbody.innerHTML = "";

  // Loop through each expense in the expenses array
  expenses.forEach((expense, index) => {
    // Create a new table row element
    const row = document.createElement("tr");

    // Set the inner HTML of the row to include the expense name, amount, and a delete button
    row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td><button onclick="deleteExpense(${index})">Delete</button></td>
        `;

    // Append the new row to the table body
    tbody.appendChild(row);
  });
}

// Function to update the total amount of expenses
function updateTotal() {
  // Get the total amount by reducing the expenses array
  // The reduce function iterates through each expense and sums up the amounts
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("total-amount").textContent = total.toFixed(2);
}

// Function to delete an expense by its index
function deleteExpense(index) {
  // Remove the expense at the specified index from the expenses array
  // The splice method changes the contents of an array by removing or replacing existing elements
  expenses.splice(index, 1);
  updateTable();
  updateTotal();
}

//Task Tracker
// Array to hold task objects
let tasks = [];

// Event listener for the task form submission
// When the form is submitted, it prevents the default action, retrieves the values from the input fields,
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Trim the name to remove any leading or trailing whitespace
  // Get the task name and deadline from the input fields
  const taskName = document.getElementById("task-name").value.trim();
  const taskDate = document.getElementById("task-deadline").value;

  // Check if the task name or date is empty
  // If any of these conditions are true, return early and do not add the task
  // This prevents invalid data from being added to the tasks array
  // If the task name or date is empty, do not proceed
  if (!taskName || !taskDate) return;

  // Push the new task object into the tasks array
  // The task object includes the name, date, and a default status of 'Pending'
  tasks.push({ name: taskName, date: taskDate });

  // Call the updateTaskTable function to refresh the displayed table of tasks
  updateTaskTable();

  // Reset the form fields to empty after submission
  this.reset();
});

// Function to update the task table
function updateTaskTable() {
  // Get the table body element by its ID
  const tbody = document.getElementById("task-table-body");
  // Clear the existing rows in the table body
  tbody.innerHTML = "";

  // Loop through each task in the tasks array
  tasks.forEach((task, index) => {
    // Create a new table row element
    // The row includes the task name, date, a dropdown for status, and a delete button
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.date}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option ${
                      task.status === "Pending" ? "selected" : ""
                    }>Pending</option>
                    <option ${
                      task.status === "Completed" ? "selected" : ""
                    }>Completed</option>
                </select>
            </td>
            <td><button onclick="deleteTask(${index})">Delete</button></td>
        `;

    // Set the background color of the row based on the task status
    row.style.backgroundColor =
      task.status === "Completed" ? "lightgreen" : "white";

    // Append the new row to the table body
    tbody.appendChild(row);
  });

  // Update the task counts (total and completed tasks)
  updateTaskCounts();
}

// Function to update the status of a task
function updateStatus(index, newStatus) {
  // Update the status of the task at the specified index in the tasks array
  // The status is set to the new value selected from the dropdown
  tasks[index].status = newStatus;

  // Update the task table to reflect the changes
  updateTaskTable();
}

// Function to delete a task by its index
// The splice method changes the contents of an array by removing or replacing existing elements
function deleteTask(index) {
  tasks.splice(index, 1);

  // Update the task table to reflect the changes
  updateTaskTable();
}

// Function to update the task counts (total and completed tasks)
function updateTaskCounts() {
  // Get the total number of tasks and the number of completed tasks
  // The filter method creates a new array with all elements that pass the test implemented by the provided function
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;

  // Update the displayed total and completed task counts
  document.getElementById("total-tasks").textContent = total;
  document.getElementById("completed-tasks").textContent = completed;
}
