// inventory-item.model.ts
/**
 * PROG2005 Assignment 2 Part 2
 * Inventory Item Data Model
 * Defines all required fields and data structure for inventory items
 */
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  supplier: string;
  stockStatus: string;
  popularItem: string;
  comment: string;
}