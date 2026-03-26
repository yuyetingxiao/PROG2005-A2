/**
 * PROG2005 Assignment 2 - Part 1
 * Inventory Management System (TypeScript)
 * Student Name: Hong Sitong
 * Student ID: 202300408006
 * Date:2026-03-24
 * Description:
 * This TypeScript script implements a fully functional inventory management
 * system that supports adding, editing, deleting, searching, and filtering
 * inventory items. It includes validation, stock status auto-update,
 * and UI rendering for a web-based interface.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/**
 * Main inventory array - stores all inventory items
 * Initialized with sample data
 */
var inventory = [
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
 * Adds a new item to inventory after validation
 * @param newItem - The new inventory item to add
 * @returns boolean - true if added successfully, false if validation failed
 */
function addItem(newItem) {
    // Check all required fields are provided
    if (!newItem.itemId || !newItem.itemName || !newItem.category || !newItem.quantity || !newItem.price || !newItem.supplierName || !newItem.stockStatus) {
        showMessage("Error: All fields except comment are required!", "error");
        return false;
    }
    // Ensure item ID is unique
    var isIdUnique = !inventory.some(function (item) { return item.itemId === newItem.itemId; });
    if (!isIdUnique) {
        showMessage("Error: Item ID must be unique!", "error");
        return false;
    }
    // Validate positive quantity and price
    if (newItem.quantity <= 0 || newItem.price <= 0) {
        showMessage("Error: Quantity and price must be positive numbers!", "error");
        return false;
    }
    // Add valid item to inventory
    inventory.push(newItem);
    showMessage("Item added successfully!", "success");
    renderAllItems();
    return true;
}
/**
 * Renders all inventory items to the UI
 * Displays item cards with full details
 */
function renderAllItems() {
    var allItemsDiv = document.getElementById("all-items");
    allItemsDiv.innerHTML = "<h3>All Inventory Items</h3>";
    // Show message if inventory is empty
    if (inventory.length === 0) {
        allItemsDiv.innerHTML += "<p>No items in inventory.</p>";
        return;
    }
    // Loop through inventory and create UI cards
    inventory.forEach(function (item) {
        allItemsDiv.innerHTML += "\n      <div class=\"item-card\">\n        <p><strong>ID:</strong> ".concat(item.itemId, "</p>\n        <p><strong>Name:</strong> ").concat(item.itemName, "</p>\n        <p><strong>Category:</strong> ").concat(item.category, "</p>\n        <p><strong>Quantity:</strong> ").concat(item.quantity, "</p>\n        <p><strong>Price:</strong> $").concat(item.price.toFixed(2), "</p>\n        <p><strong>Supplier:</strong> ").concat(item.supplierName, "</p>\n        <p><strong>Stock Status:</strong> ").concat(item.stockStatus, "</p>\n        <p><strong>Popular:</strong> ").concat(item.isPopular ? "Yes" : "No", "</p>\n        ").concat(item.comment ? "<p><strong>Comment:</strong> ".concat(item.comment, "</p>") : "", "\n      </div>\n    ");
    });
}
/**
 * Renders only popular items in the UI
 * Filters inventory where isPopular = true
 */
function renderPopularItems() {
    var popularItemsDiv = document.getElementById("popular-items");
    popularItemsDiv.innerHTML = "<h3>Popular Items</h3>";
    // Filter popular items
    var popularItems = inventory.filter(function (item) { return item.isPopular; });
    // Show message if no popular items
    if (popularItems.length === 0) {
        popularItemsDiv.innerHTML += "<p>No popular items.</p>";
        return;
    }
    // Display popular items in simplified card format
    popularItems.forEach(function (item) {
        popularItemsDiv.innerHTML += "\n      <div class=\"item-card popular\">\n        <p><strong>Name:</strong> ".concat(item.itemName, "</p>\n        <p><strong>Category:</strong> ").concat(item.category, "</p>\n        <p><strong>Price:</strong> $").concat(item.price.toFixed(2), "</p>\n        <p><strong>Stock Status:</strong> ").concat(item.stockStatus, "</p>\n      </div>\n    ");
    });
}
/**
 * Displays a temporary success/error message on the page
 * @param text - Message content to display
 * @param type - Message style: "success" or "error"
 */
function showMessage(text, type) {
    var messageDiv = document.getElementById("message");
    messageDiv.textContent = text;
    messageDiv.className = type === "success" ? "success-message" : "error-message";
    // Clear message after 3 seconds
    setTimeout(function () { return messageDiv.textContent = ""; }, 3000);
}
/**
 * Edits an existing item by item name
 * Handles duplicate names by prompting for Item ID
 * @param itemName - Name of item to edit
 * @param updatedData - Partial data to update
 * @returns boolean - true if updated successfully
 */
function editItem(itemName, updatedData) {
    // Find all items matching the name (case-insensitive)
    var itemsToUpdate = inventory.filter(function (item) { return item.itemName.toLowerCase() === itemName.toLowerCase(); });
    // No item found
    if (itemsToUpdate.length === 0) {
        showMessage("Error: Item not found!", "error");
        return false;
    }
    // Handle multiple items with same name
    if (itemsToUpdate.length > 1) {
        var idOptions = itemsToUpdate.map(function (item) { return "ID: ".concat(item.itemId, " - ").concat(item.itemName); }).join("\n");
        var targetId_1 = prompt("Multiple items found:\n".concat(idOptions, "\nEnter the Item ID to edit:"));
        if (!targetId_1)
            return false;
        // Find exact item by ID
        var targetItem = inventory.find(function (item) { return item.itemId === targetId_1; });
        if (!targetItem) {
            showMessage("Error: Selected Item ID not found!", "error");
            return false;
        }
        // Update item while preserving original ID
        Object.assign(targetItem, __assign(__assign({}, updatedData), { itemId: targetItem.itemId }));
    }
    else {
        // Single item found - update directly
        Object.assign(itemsToUpdate[0], __assign(__assign({}, updatedData), { itemId: itemsToUpdate[0].itemId }));
    }
    showMessage("Item updated successfully!", "success");
    renderAllItems();
    return true;
}
/**
 * Deletes an item by name
 * Handles duplicates by asking for Item ID
 * Requires user confirmation
 * @param itemName - Name of item to delete
 * @returns boolean - true if deleted
 */
function deleteItem(itemName) {
    // Find items by name
    var itemsToDelete = inventory.filter(function (item) { return item.itemName.toLowerCase() === itemName.toLowerCase(); });
    if (itemsToDelete.length === 0) {
        showMessage("Error: Item not found!", "error");
        return false;
    }
    // Multiple matches → require ID
    if (itemsToDelete.length > 1) {
        var idOptions = itemsToDelete.map(function (item) { return "ID: ".concat(item.itemId, " - ").concat(item.itemName); }).join("\n");
        var targetId_2 = prompt("Multiple items found:\n".concat(idOptions, "\nEnter the Item ID to delete:"));
        if (!targetId_2)
            return false;
        var initialLength = inventory.length;
        inventory = inventory.filter(function (item) { return item.itemId !== targetId_2; });
        // No item removed
        if (inventory.length === initialLength) {
            showMessage("Error: Selected Item ID not found!", "error");
            return false;
        }
    }
    else {
        // Single item → confirm before deletion
        var confirmDelete = confirm("Are you sure you want to delete ".concat(itemsToDelete[0].itemName, "?"));
        if (!confirmDelete)
            return false;
        // Remove item from array
        inventory = inventory.filter(function (item) { return item.itemName.toLowerCase() !== itemName.toLowerCase(); });
    }
    showMessage("Item deleted successfully!", "success");
    renderAllItems();
    return true;
}
/**
 * Searches items by name (case-insensitive, partial match)
 * @param itemName - Search keyword
 * @returns InventoryItem[] - Matching results
 */
function searchItems(itemName) {
    var searchTerm = itemName.toLowerCase().trim();
    if (!searchTerm)
        return [];
    // Return items containing the search term
    return inventory.filter(function (item) { return item.itemName.toLowerCase().includes(searchTerm); });
}
/**
 * Automatically updates stock status based on quantity
 * Out of Stock: 0
 * Low Stock: 1–9
 * In Stock: 10+
 */
function autoUpdateStockStatus() {
    inventory = inventory.map(function (item) {
        var newStatus;
        if (item.quantity <= 0) {
            newStatus = "Out of Stock";
        }
        else if (item.quantity < 10) {
            newStatus = "Low Stock";
        }
        else {
            newStatus = "In Stock";
        }
        return __assign(__assign({}, item), { stockStatus: newStatus });
    });
    renderAllItems();
}
// Filter products by category
function filterByCategory(category) {
    return inventory.filter(function (item) { return item.category === category; });
}
// Search result rendering
function renderSearchResults(results) {
    var searchResultsDiv = document.getElementById("search-results");
    searchResultsDiv.innerHTML = "<h3>Search Results</h3>";
    if (results.length === 0) {
        searchResultsDiv.innerHTML += "<p>No matching items found.</p>";
        return;
    }
    results.forEach(function (item) {
        searchResultsDiv.innerHTML += "\n      <div class=\"item-card\">\n        <p><strong>ID:</strong> ".concat(item.itemId, "</p>\n        <p><strong>Name:</strong> ").concat(item.itemName, "</p>\n        <p><strong>Category:</strong> ").concat(item.category, "</p>\n        <p><strong>Quantity:</strong> ").concat(item.quantity, "</p>\n        <p><strong>Price:</strong> $").concat(item.price.toFixed(2), "</p>\n        <p><strong>Stock:</strong> ").concat(item.stockStatus, "</p>\n      </div>\n    ");
    });
}
// Automatically render during page loading
window.onload = function () {
    autoUpdateStockStatus();
    renderAllItems();
    renderPopularItems();
};
