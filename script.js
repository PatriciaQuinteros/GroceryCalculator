// script.js

// Array to store grocery items
let groceryItems = [];

// Function to add a new item to the list
function addItem() {
  // Get input values
  const itemName = document.getElementById('item').value.trim(); // Get the name of the item. Trim() reduces whitespace
  const quantity = parseInt(document.getElementById('quantity').value) || 0; // Get the quantity of the item
  const price = parseFloat(document.getElementById('price').value) || 0.0; // Get the price of the item

  // Check if input values are valid
  if (itemName !== '' && quantity > 0 && price > 0.0) {
    // Create a new item object
    const newItem = { id: Date.now(), name: itemName, quantity, price }; // Object representing a grocery item
    // Add the new item to the groceryItems array
    groceryItems.push(newItem);
    // Update the list on the webpage
    updateList();
    // Clear input fields
    clearInputs();
  }
}

// Function to delete an item from the list
function deleteItem(itemId) {
  // Filter out the item with the specified id
  groceryItems = groceryItems.filter(item => item.id !== itemId);
  // Update the list on the webpage
  updateList();
}

// Function to update the name of an item
function updateItem(itemId) {
  // Prompt the user for a new name
  const newName = prompt('Enter new name:');
  // Check if the user entered a new name
  if (newName !== null) {
    // Find the item with the specified id
    const itemToUpdate = groceryItems.find(item => item.id === itemId);
    // Check if the item was found
    if (itemToUpdate) {
      // Update the name of the item
      itemToUpdate.name = newName;
      // Update the list on the webpage
      updateList();
    }
  }
}

// Function to clear all items from the list
function clearItems() {
  // Empty the groceryItems array
  groceryItems = [];
  // Update the list on the webpage
  updateList();
}

// Function to update the list on the webpage
function updateList() {
  // Get references to the HTML elements
  const itemList = document.getElementById('item-list'); // The list element to display grocery items
  const totalAmountSpan = document.getElementById('total-amount'); // The span element to display the total amount

  // Clear the current content of the list
  itemList.innerHTML = '';
  // Initialize total amount
  let totalAmount = 0.0;

  // Loop through each item in the groceryItems array
  groceryItems.forEach(item => {
    // Create a new list item element
    const listItem = document.createElement('li');
    // Set the class name for styling
    listItem.className = 'list-item';

    // Set the inner HTML for the list item using a template literal
    listItem.innerHTML = `
      <span>${item.quantity} x ${item.name} - $${(item.quantity * item.price).toFixed(2)}</span>
      <button id="delete" onclick="deleteItem(${item.id})">Delete</button>
      <button id="update" onclick="updateItem(${item.id})">Update</button>`;

    // Update the total amount
    totalAmount += item.quantity * item.price;

    // Append the list item to the list
    itemList.appendChild(listItem);
  });

  // Update the total amount on the webpage
  totalAmountSpan.textContent = totalAmount.toFixed(2);
}

// Function to clear input fields
function clearInputs() {
  document.getElementById('item').value = '';
  document.getElementById('quantity').value = '';
  document.getElementById('price').value = '';
}
