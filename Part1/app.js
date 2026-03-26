/**
 * PROG2005 Assignment 2 - Part 1
 * Inventory Management System (TypeScript)
 *
 * Student Name: Hong Sitong
 * Student ID:   202300408006
 * Date:         2026-03-26
 * Description:
 * This TypeScript script implements a fully functional inventory management
 * system that supports adding, editing, deleting, searching, and filtering
 * inventory items. It includes validation, stock status auto-update,
 * and UI rendering for a web-based interface.
 */
/**
 * Main inventory array
 */
let inventory = [
    {
        itemId: "ITEM001",
        itemName: "Wireless Headphones",
        category: "Electronics",
        quantity: 50,
        price: 199.99,
        supplierName: "Tech Supplies Inc.",
        stockStatus: "In Stock",
        isPopular: true,
        comment: "Noise-cancelling"
    }
];
/**
 * Add new item with full validation
 */
function addItem(newItem) {
    if (!newItem.itemId || !newItem.itemName || !newItem.category || !newItem.quantity || !newItem.price || !newItem.supplierName) {
        showMessage("Error: All fields except comment are required!", "error");
        return false;
    }
    const isIdUnique = !inventory.some(item => item.itemId === newItem.itemId);
    if (!isIdUnique) {
        showMessage("Error: Item ID must be unique!", "error");
        return false;
    }
    if (newItem.quantity <= 0 || newItem.price <= 0) {
        showMessage("Error: Quantity & price must be positive numbers!", "error");
        return false;
    }
    inventory.push(newItem);
    showMessage("Item added successfully!", "success");
    renderAllItems();
    return true;
}
/**
 * Render all items
 */
function renderAllItems() {
    const allItemsDiv = document.getElementById("all-items");
    allItemsDiv.innerHTML = "<h3>All Inventory Items</h3>";
    if (inventory.length === 0) {
        allItemsDiv.innerHTML += "<p>No items in inventory.</p>";
        return;
    }
    inventory.forEach(item => {
        allItemsDiv.innerHTML += `
      <div class="item-card">
        <p><strong>ID:</strong> ${item.itemId}</p>
        <p><strong>Name:</strong> ${item.itemName}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        <p><strong>Supplier:</strong> ${item.supplierName}</p>
        <p><strong>Stock:</strong> ${item.stockStatus}</p>
        <p><strong>Popular:</strong> ${item.isPopular ? "Yes" : "No"}</p>
        ${item.comment ? `<p><strong>Comment:</strong> ${item.comment}</p>` : ""}
      </div>
    `;
    });
}
/**
 * Render popular items
 */
function renderPopularItems() {
    const popularItemsDiv = document.getElementById("popular-items");
    popularItemsDiv.innerHTML = "<h3>Popular Items</h3>";
    const popularItems = inventory.filter(i => i.isPopular);
    if (popularItems.length === 0) {
        popularItemsDiv.innerHTML += "<p>No popular items.</p>";
        return;
    }
    popularItems.forEach(item => {
        popularItemsDiv.innerHTML += `
      <div class="item-card popular">
        <p><strong>Name:</strong> ${item.itemName}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        <p><strong>Stock:</strong> ${item.stockStatus}</p>
      </div>
    `;
    });
}
/**
 * Show success/error message
 */
function showMessage(text, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = text;
    messageDiv.className = type === "success" ? "success-message" : "error-message";
    setTimeout(() => messageDiv.textContent = "", 3000);
}
/**
 * Edit item by name (HD FIX: can now update name)
 */
function editItem(itemName, updatedData) {
    const itemsToUpdate = inventory.filter(item => item.itemName.toLowerCase() === itemName.toLowerCase());
    if (itemsToUpdate.length === 0) {
        showMessage("Error: Item not found!", "error");
        return false;
    }
    if (itemsToUpdate.length > 1) {
        let idOptions = itemsToUpdate.map(item => `ID: ${item.itemId} - ${item.itemName}`).join("\n");
        const targetId = prompt(`Multiple items found:\n${idOptions}\nEnter Item ID to edit:`);
        if (!targetId)
            return false;
        const targetItem = inventory.find(item => item.itemId === targetId);
        if (!targetItem) {
            showMessage("Error: ID not found!", "error");
            return false;
        }
        Object.assign(targetItem, Object.assign(Object.assign({}, updatedData), { itemId: targetItem.itemId }));
    }
    else {
        Object.assign(itemsToUpdate[0], Object.assign(Object.assign({}, updatedData), { itemId: itemsToUpdate[0].itemId }));
    }
    showMessage("Item updated successfully!", "success");
    renderAllItems();
    renderPopularItems();
    return true;
}
/**
 * Delete item by name
 */
function deleteItem(itemName) {
    const itemsToDelete = inventory.filter(item => item.itemName.toLowerCase() === itemName.toLowerCase());
    if (itemsToDelete.length === 0) {
        showMessage("Error: Item not found!", "error");
        return false;
    }
    if (itemsToDelete.length > 1) {
        let idOptions = itemsToDelete.map(item => `ID: ${item.itemId} - ${item.itemName}`).join("\n");
        const targetId = prompt(`Multiple items found:\n${idOptions}\nEnter Item ID to delete:`);
        if (!targetId)
            return false;
        const len = inventory.length;
        inventory = inventory.filter(item => item.itemId !== targetId);
        if (inventory.length === len) {
            showMessage("Error: ID not found!", "error");
            return false;
        }
    }
    else {
        inventory = inventory.filter(item => item.itemName.toLowerCase() !== itemName.toLowerCase());
    }
    showMessage("Item deleted successfully!", "success");
    renderAllItems();
    renderPopularItems();
    return true;
}
/**
 * Search items by name
 */
function searchItems(itemName) {
    const term = itemName.toLowerCase().trim();
    if (!term)
        return [];
    return inventory.filter(i => i.itemName.toLowerCase().includes(term));
}
/**
 * Auto update stock status
 */
function autoUpdateStockStatus() {
    inventory = inventory.map(item => {
        let status;
        if (item.quantity <= 0)
            status = "Out of Stock";
        else if (item.quantity < 10)
            status = "Low Stock";
        else
            status = "In Stock";
        return Object.assign(Object.assign({}, item), { stockStatus: status });
    });
    renderAllItems();
}
/**
 * Filter by category
 */
function filterByCategory(category) {
    return inventory.filter(i => i.category === category);
}
/**
 * Render search results
 */
function renderSearchResults(results) {
    const div = document.getElementById("search-results");
    div.innerHTML = "<h3>Search Results</h3>";
    if (results.length === 0) {
        div.innerHTML += "<p>No matching items.</p>";
        return;
    }
    results.forEach(item => {
        div.innerHTML += `
      <div class="item-card">
        <p><strong>ID:</strong> ${item.itemId}</p>
        <p><strong>Name:</strong> ${item.itemName}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
      </div>
    `;
    });
}
/**
 * Button Handler Functions
 */
function handleAddItem() {
    const itemId = document.getElementById("itemId").value;
    const itemName = document.getElementById("itemName").value;
    const category = document.getElementById("category").value;
    const quantity = Number(document.getElementById("quantity").value);
    const price = Number(document.getElementById("price").value);
    const supplierName = document.getElementById("supplierName").value;
    const stockStatus = document.getElementById("stockStatus").value;
    const isPopular = document.getElementById("isPopular").checked;
    const comment = document.getElementById("comment").value;
    if (isNaN(quantity) || isNaN(price)) {
        showMessage("Error: Quantity & Price must be numbers!", "error");
        return;
    }
    const newItem = {
        itemId, itemName, category, quantity, price, supplierName, stockStatus, isPopular, comment
    };
    const success = addItem(newItem);
    if (success) {
        autoUpdateStockStatus();
        renderPopularItems();
    }
}
function handleSearch() {
    const term = document.getElementById("searchInput").value;
    const results = searchItems(term);
    renderSearchResults(results);
}
//Edit now CAN CHANGE item name!
function handleEdit() {
    const oldName = document.getElementById("editName").value;
    if (!oldName) {
        showMessage("Please enter item name to edit!", "error");
        return;
    }
    const newName = prompt("Enter new item name:");
    if (!newName)
        return;
    editItem(oldName, { itemName: newName });
}
function handleDelete() {
    const name = document.getElementById("deleteName").value;
    if (!name) {
        showMessage("Please enter item name to delete!", "error");
        return;
    }
    deleteItem(name);
}
// Page load
window.onload = () => {
    autoUpdateStockStatus();
    renderAllItems();
    renderPopularItems();
};
