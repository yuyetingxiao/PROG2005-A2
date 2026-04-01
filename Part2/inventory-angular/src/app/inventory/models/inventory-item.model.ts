// inventory-item.model.ts
export interface InventoryItem {
  id: number;
  itemId: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  isPopular: boolean;
  inStock: boolean;
  comment: string; 
}