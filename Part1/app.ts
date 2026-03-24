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