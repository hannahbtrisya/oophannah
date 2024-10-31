let checklist = JSON.parse(localStorage.getItem('checklist')) || [];

// Function to display the checklist
function displayChecklist() {
  const checklistHtml = checklist.map((item, index) => `
    <li>
      <input type="checkbox" id="item-${index}" ${item.checked ? 'checked' : ''} onclick="toggleItem(${index})">
      <label for="item-${index}" class="${item.checked ? 'checked-label' : ''}">${item.name}</label>
      <button onclick="removeItem(${index})" class="small-button">Remove</button>
      <button onclick="startEdit(${index})" class="small-button">Edit</button>
      <input type="text" id="edit-item-${index}" class="edit-input" placeholder="Edit item" style="display:none;">
      <button onclick="saveEdit(${index})" class="small-button" id="save-btn-${index}" style="display:none;">Save</button>
    </li>
  `).join('');
  document.getElementById('checklist').innerHTML = `<ul>${checklistHtml}</ul>`;
}

// Function to editing an item
function startEdit(index) {
  const editInput = document.getElementById(`edit-item-${index}`);
  const saveBtn = document.getElementById(`save-btn-${index}`);
  editInput.value = checklist[index].name; // Set the current item name
  editInput.style.display = 'inline'; // Show the input field
  saveBtn.style.display = 'inline'; // Show the save button
}

// Function to save the edited item
function saveEdit(index) {
  const updatedItem = document.getElementById(`edit-item-${index}`).value;
  if (updatedItem && !checklist.some(item => item.name === updatedItem)) {
    checklist[index].name = updatedItem; // Update name
    localStorage.setItem('checklist', JSON.stringify(checklist));
    displayChecklist();
    displayMessage('Item updated in checklist!'); // Show message
  } else if (checklist.some(item => item.name === updatedItem)) {
    displayMessage('Item already exists in checklist.'); // Show message if item exists
  }
}

// Function to display messages in the modal
function displayMessage(msg) {
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.innerText = msg;
  document.getElementById('messageModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
  document.getElementById('messageModal').style.display = 'none'; // Hide 
}

// Function to add a custom item to the checklist
function addCustomChecklistItem() {
  const newItem = document.getElementById('new-item').value;
  if (newItem && !checklist.some(item => item.name === newItem)) {
    checklist.push({ name: newItem, checked: false }); // Store item as an object
    localStorage.setItem('checklist', JSON.stringify(checklist));
    displayChecklist();
    displayMessage('Item added to checklist!'); // Show message
    document.getElementById('new-item').value = ""; // Clear input
  } else if (checklist.some(item => item.name === newItem)) {
    displayMessage('Item already exists in checklist.'); // Show message if item exists
  }
}

// Function to remove an item from the checklist
function removeItem(index) {
  checklist.splice(index, 1);
  localStorage.setItem('checklist', JSON.stringify(checklist));
  displayChecklist();
  displayMessage('Item removed from checklist!'); // Show message
}

// Function to toggle the checked status of an item
function toggleItem(index) {
  checklist[index].checked = !checklist[index].checked; // Toggle checked status
  localStorage.setItem('checklist', JSON.stringify(checklist));
}

// Function to go back to the main page
function goBack() {
  window.location.href = 'index.html';
}

// Initial display of the checklist
displayChecklist();
