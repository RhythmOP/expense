/* script.js */
document.addEventListener("DOMContentLoaded", () => {
  const transactionForm = document.getElementById("transaction-form");
  const transactionHistory = document.getElementById("transaction-history");
  const viewHistoryBtn = document.getElementById("view-history");
  const transactionTypeButtons = document.querySelectorAll(".transaction-type button");


  let transactionType = "Expense"; // Default transaction type
  let transactions = []; // Array to store transactions


  // Handle transaction type buttons
  transactionTypeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      transactionTypeButtons.forEach((btn) => btn.classList.remove("active"));
      e.target.classList.add("active");
      transactionType = e.target.innerText;
    });
  });


  // Handle form submission
  transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();


    const cost = parseFloat(document.getElementById("cost").value).toFixed(2);
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const recurring = document.getElementById("recurring").checked;


    if (!cost || cost <= 0) {
      alert("Please enter a valid amount.");
      return;
    }


    // Add transaction to the array
    const transaction = {
      type: transactionType,
      cost,
      date,
      description,
      category,
      recurring,
    };
    transactions.push(transaction);


    alert("Transaction added successfully!");


    // Reset form
    transactionForm.reset();
    transactionType = "Expense";
    transactionTypeButtons[0].classList.add("active");
    transactionTypeButtons[1].classList.remove("active");
  });


  // Handle "View History" button
  viewHistoryBtn.addEventListener("click", () => {
    transactionHistory.innerHTML = ""; // Clear existing history
    transactions.forEach((transaction) => {
      const item = document.createElement("div");
      item.classList.add("history-item");
      item.innerHTML = `
        <strong>{transaction.type}</strong>
        <p>Cost: {transaction.cost}</p>
        <p>Date: {transaction.date}</p>
        <p>Description: {transaction.description}</p>
        <p>Category: {transaction.category}</p>
        <p>Recurring: {transaction.recurring ? "Yes" : "No"}</p>
      `;
      transactionHistory.appendChild(item);
    });


    // Toggle visibility of transaction history
    transactionHistory.style.display =
      transactionHistory.style.display === "none" || transactionHistory.style.display === ""
        ? "block"
        : "none";
  });
});
