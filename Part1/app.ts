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

/**
 * Category type definition for inventory items
 * Restricts items to 5 valid categories
 */
type ItemCategory = "Electronics" | "Furniture" | "Clothing" | "Tools" | "Miscellaneous";

/**
 * Stock status type based on quantity levels
 * Used for automatic stock condition updates
 */
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

/**
 * Inventory Item Interface
 * Defines the structure and data types for all inventory items
 * All fields are required except comment (optional)
 */
interface InventoryItem {
  itemId: string;          // Unique identifier for the item
  itemName: string;        // Name of the product
  category: ItemCategory;  // Product category
  quantity: number;         // Current stock quantity
  price: number;           // Product price (positive number)
  supplierName: string;     // Name of the supplier
  stockStatus: StockStatus;// Stock availability status
  isPopular: boolean;      // Marks if item is popular
  comment?: string;        // Optional additional notes
}

/**
 * Main inventory array - stores all inventory items
 * Initialized with sample data
 */
let inventory: InventoryItem[] = [
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
function addItem(newItem: InventoryItem): boolean {
  // Check all required fields are provided
  if (!newItem.itemId || !newItem.itemName || !newItem.category || !newItem.quantity || !newItem.price || !newItem.supplierName || !newItem.stockStatus) {
    showMessage("Error: All fields except comment are required!", "error");
    return false;
  }

  // Ensure item ID is unique
  const isIdUnique = !inventory.some(item => item.itemId === newItem.itemId);
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
  const allItemsDiv = document.getElementById("all-items") as HTMLDivElement;
  allItemsDiv.innerHTML = "<h3>All Inventory Items</h3>";

  // Show message if inventory is empty
  if (inventory.length === 0) {
    allItemsDiv.innerHTML += "<p>No items in inventory.</p>";
    return;
  }

  // Loop through inventory and create UI cards
  inventory.forEach(item => {
    allItemsDiv.innerHTML += `
      <div class="item-card">
        <p><strong>ID:</strong> ${item.itemId}</p>
        <p><strong>Name:</strong> ${item.itemName}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        <p><strong>Supplier:</strong> ${item.supplierName}</p>
        <p><strong>Stock Status:</strong> ${item.stockStatus}</p>
        <p><strong>Popular:</strong> ${item.isPopular ? "Yes" : "No"}</p>
        ${item.comment ? `<p><strong>Comment:</strong> ${item.comment}</p>` : ""}
      </div>
    `;
  });
}

/**
 * Renders only popular items in the UI
 * Filters inventory where isPopular = true
 */
function renderPopularItems() {
  const popularItemsDiv = document.getElementById("popular-items") as HTMLDivElement;
  popularItemsDiv.innerHTML = "<h3>Popular Items</h3>";
  
  // Filter popular items
  const popularItems = inventory.filter(item => item.isPopular);

  // Show message if no popular items
  if (popularItems.length === 0) {
    popularItemsDiv.innerHTML += "<p>No popular items.</p>";
    return;
  }

  // Display popular items in simplified card format
  popularItems.forEach(item => {
    popularItemsDiv.innerHTML += `
      <div class="item-card popular">
        <p><strong>Name:</strong> ${item.itemName}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        <p><strong>Stock Status:</strong> ${item.stockStatus}</p>
      </div>
    `;
  });
}

/**
 * Displays a temporary success/error message on the page
 * @param text - Message content to display
 * @param type - Message style: "success" or "error"
 */
function showMessage(text: string, type: "success" | "error") {
  const messageDiv = document.getElementById("message") as HTMLDivElement;
  messageDiv.textContent = text;
  messageDiv.className = type === "success" ? "success-message" : "error-message";
  
  // Clear message after 3 seconds
  setTimeout(() => messageDiv.textContent = "", 3000);
}

/**
 * Edits an existing item by item name
 * Handles duplicate names by prompting for Item ID
 * @param itemName - Name of item to edit
 * @param updatedData - Partial data to update
 * @returns boolean - true if updated successfully
 */
function editItem(itemName: string, updatedData: Partial<InventoryItem>): boolean {
  // Find all items matching the name (case-insensitive)
  const itemsToUpdate = inventory.filter(item => item.itemName.toLowerCase() === itemName.toLowerCase());

  // No item found
  if (itemsToUpdate.length === 0) {
    showMessage("Error: Item not found!", "error");
    return false;
  }

  // Handle multiple items with same name
  if (itemsToUpdate.length > 1) {
    let idOptions = itemsToUpdate.map(item => `ID: ${item.itemId} - ${item.itemName}`).join("\n");
    const targetId = prompt(`Multiple items found:\n${idOptions}\nEnter the Item ID to edit:`);
    
    if (!targetId) return false;

    // Find exact item by ID
    const targetItem = inventory.find(item => item.itemId === targetId);
    if (!targetItem) {
      showMessage("Error: Selected Item ID not found!", "error");
      return false;
    }

    // Update item while preserving original ID
    Object.assign(targetItem, { ...updatedData, itemId: targetItem.itemId });
  } else {
    // Single item found - update directly
    Object.assign(itemsToUpdate[0], { ...updatedData, itemId: itemsToUpdate[0].itemId });
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
function deleteItem(itemName: string): boolean {
  // Find items by name
  const itemsToDelete = inventory.filter(item => item.itemName.toLowerCase() === itemName.toLowerCase());

  if (itemsToDelete.length === 0) {
    showMessage("Error: Item not found!", "error");
    return false;
  }

  // Multiple matches → require ID
  if (itemsToDelete.length > 1) {
    let idOptions = itemsToDelete.map(item => `ID: ${item.itemId} - ${item.itemName}`).join("\n");
    const targetId = prompt(`Multiple items found:\n${idOptions}\nEnter the Item ID to delete:`);
    
    if (!targetId) return false;

    const initialLength = inventory.length;
    inventory = inventory.filter(item => item.itemId !== targetId);

    // No item removed
    if (inventory.length === initialLength) {
      showMessage("Error: Selected Item ID not found!", "error");
      return false;
    }
  } else {
    // Single item → confirm before deletion
    const confirmDelete = confirm(`Are you sure you want to delete ${itemsToDelete[0].itemName}?`);
    if (!confirmDelete) return false;

    // Remove item from array
    inventory = inventory.filter(item => item.itemName.toLowerCase() !== itemName.toLowerCase());
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
function searchItems(itemName: string): InventoryItem[] {
  const searchTerm = itemName.toLowerCase().trim();
  if (!searchTerm) return [];

  // Return items containing the search term
  return inventory.filter(item => item.itemName.toLowerCase().includes(searchTerm));
}

/**
 * Automatically updates stock status based on quantity
 * Out of Stock: 0
 * Low Stock: 1–9
 * In Stock: 10+
 */
function autoUpdateStockStatus(): void {
  inventory = inventory.map(item => {
    let newStatus: StockStatus;

    if (item.quantity <= 0) {
      newStatus = "Out of Stock";
    } else if (item.quantity < 10) {
      newStatus = "Low Stock";
    } else {
      newStatus = "In Stock";
    }

    return { ...item, stockStatus: newStatus };
  });

  renderAllItems();
}

// Filter products by category
function filterByCategory(category: ItemCategory): InventoryItem[] {
  return inventory.filter(item => item.category === category);
}

// Search result rendering
function renderSearchResults(results: InventoryItem[]): void {
  const searchResultsDiv = document.getElementById("search-results") as HTMLDivElement;
  searchResultsDiv.innerHTML = "<h3>Search Results</h3>";

  if (results.length === 0) {
    searchResultsDiv.innerHTML += "<p>No matching items found.</p>";
    return;
  }

  results.forEach(item => {
    searchResultsDiv.innerHTML += `
      <div class="item-card">
        <p><strong>ID:</strong> ${item.itemId}</p>
        <p><strong>Name:</strong> ${item.itemName}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
        <p><strong>Stock:</strong> ${item.stockStatus}</p>
      </div>
    `;
  });
}

// Automatically render during page loading
window.onload = () => {
  autoUpdateStockStatus();
  renderAllItems();
  renderPopularItems();
};