type ItemCategory = "Electronics" | "Furniture" | "Clothing" | "Tools" | "Miscellaneous";
type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

interface InventoryItem {
  itemId: string;
  itemName: string;
  category: ItemCategory;
  quantity: number;
  price: number;
  supplierName: string; 
  stockStatus: StockStatus; 
  isPopular: boolean; 
  comment?: string; 
}

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

function addItem(newItem: InventoryItem): boolean {
  if (!newItem.itemId || !newItem.itemName || !newItem.category || !newItem.quantity || !newItem.price || !newItem.supplierName || !newItem.stockStatus) {
    showMessage("Error: All fields except comment are required!", "error");
    return false;
  }
  const isIdUnique = !inventory.some(item => item.itemId === newItem.itemId);
  if (!isIdUnique) {
    showMessage("Error: Item ID must be unique!", "error");
    return false;
  }
  if (newItem.quantity <= 0 || newItem.price <= 0) {
    showMessage("Error: Quantity and price must be positive numbers!", "error");
    return false;
  }
  inventory.push(newItem);
  showMessage("Item added successfully!", "success");
  renderAllItems();
  return true;
}

function renderAllItems() {
  const allItemsDiv = document.getElementById("all-items") as HTMLDivElement;
  allItemsDiv.innerHTML = "<h3>All Inventory Items</h3>";

  if (inventory.length === 0) {
    allItemsDiv.innerHTML += "<p>No items in inventory.</p >";
    return;
  }

  inventory.forEach(item => {
    allItemsDiv.innerHTML += `
      <div class="item-card">
        <p><strong>ID:</strong> ${item.itemId}</p >
        <p><strong>Name:</strong> ${item.itemName}</p >
        <p><strong>Category:</strong> ${item.category}</p >
        <p><strong>Quantity:</strong> ${item.quantity}</p >
        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p >
        <p><strong>Supplier:</strong> ${item.supplierName}</p >
        <p><strong>Stock Status:</strong> ${item.stockStatus}</p >
        <p><strong>Popular:</strong> ${item.isPopular ? "Yes" : "No"}</p >
        ${item.comment ? `<p><strong>Comment:</strong> ${item.comment}</p >` : ""}
      </div>
    `;
  });
}

function showMessage(text: string, type: "success" | "error") {
  const messageDiv = document.getElementById("message") as HTMLDivElement;
  messageDiv.textContent = text;
  messageDiv.className = type === "success" ? "success-message" : "error-message";
  setTimeout(() => messageDiv.textContent = "", 3000);
}

function editItem(itemName: string, updatedData: Partial<InventoryItem>): boolean {
  const itemsToUpdate = inventory.filter(item => item.itemName.toLowerCase() === itemName.toLowerCase());
  if (itemsToUpdate.length === 0) {
    showMessage("Error: Item not found!", "error");
    return false;
  }
  if (itemsToUpdate.length > 1) {
    let idOptions = itemsToUpdate.map(item => `ID: ${item.itemId} - ${item.itemName}`).join("\n");
    const targetId = prompt(`Multiple items found:\n${idOptions}\nEnter the Item ID to edit:`);
    if (!targetId) return false;
    const targetItem = inventory.find(item => item.itemId === targetId);
    if (!targetItem) {
      showMessage("Error: Selected Item ID not found!", "error");
      return false;
    }
    Object.assign(targetItem, { ...updatedData, itemId: targetItem.itemId });
  } else {
    Object.assign(itemsToUpdate[0], { ...updatedData, itemId: itemsToUpdate[0].itemId });
  }
  showMessage("Item updated successfully!", "success");
  renderAllItems();
  return true;
}

function deleteItem(itemName: string): boolean {
  const itemsToDelete = inventory.filter(item => item.itemName.toLowerCase() === itemName.toLowerCase());
  if (itemsToDelete.length === 0) {
    showMessage("Error: Item not found!", "error");
    return false;
  }
  if (itemsToDelete.length > 1) {
    let idOptions = itemsToDelete.map(item => `ID: ${item.itemId} - ${item.itemName}`).join("\n");
    const targetId = prompt(`Multiple items found:\n${idOptions}\nEnter the Item ID to delete:`);
    if (!targetId) return false;
    const initialLength = inventory.length;
    inventory = inventory.filter(item => item.itemId !== targetId);
    if (inventory.length === initialLength) {
      showMessage("Error: Selected Item ID not found!", "error");
      return false;
    }
  } else {
    const confirmDelete = confirm(`Are you sure you want to delete ${itemsToDelete[0].itemName}?`);
    if (!confirmDelete) return false;
    inventory = inventory.filter(item => item.itemName.toLowerCase() !== itemName.toLowerCase());
  }
  showMessage("Item deleted successfully!", "success");
  renderAllItems();
  return true;
}