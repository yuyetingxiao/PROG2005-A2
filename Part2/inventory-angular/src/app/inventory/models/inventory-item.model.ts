export type Category = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Other';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface InventoryItem {
  itemId: string;
  itemName: string;
  category: Category;
  quantity: number;
  price: number;
  supplier: string;
  status: StockStatus;
  isPopular: boolean;
}