// inventory.ts
import { Injectable } from '@angular/core';
import { InventoryItem } from './models/inventory-item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  // Initialize example data
  private items: InventoryItem[] = [
    {
      id: 1,
      itemId: 'ITEM001',
      name: 'Laptop',
      category: 'Electronics',
      quantity: 15,
      price: 1200,
      supplier: 'Tech Corp',
      isPopular: true,
      inStock: true,
      comment: 'High-performance business laptop'
    },
    {
      id: 2,
      itemId: 'ITEM002',
      name: 'Office Chair',
      category: 'Furniture',
      quantity: 8,
      price: 180,
      supplier: 'Office Supplies Ltd',
      isPopular: true,
      inStock: true,
      comment: 'Ergonomic design for long hours'
    },
    {
      id: 3,
      itemId: 'ITEM003',
      name: 'Cordless Drill',
      category: 'Tools',
      quantity: 0,
      price: 99,
      supplier: 'Hardware Store',
      isPopular: false,
      inStock: false,
      comment: 'Out of stock, restock next week'
    }
  ];

    getAll(): InventoryItem[] {
    return this.getItems();
  }

  // The delete() method for compatibility testing
  delete(itemId: string): void {
    this.items = this.items.filter(item => item.itemId !== itemId);
  }

  // Get all items
  getItems(): InventoryItem[] {
    return [...this.items];
  }

  // Get popular items
  getPopularItems(): InventoryItem[] {
    return this.items.filter(item => item.isPopular);
  }

  // Get out of stock quantity
  getOutOfStockCount(): number {
    return this.items.filter(item => !item.inStock).length;
  }

  // Add item
  addItem(item: Omit<InventoryItem, 'inStock'>): boolean {
    // Verify ID uniqueness
    if (this.items.some(existing => existing.id === item.id)) {
      return false;
    }
    // Automatically calculate inventory status
    const newItem: InventoryItem = {
      ...item,
      inStock: item.quantity > 0
    };
    this.items.push(newItem);
    return true;
  }

  // Delete items by name
  deleteItemByName(name: string): boolean {
    const index = this.items.findIndex(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  // Search for items by name
  searchItemsByName(name: string): InventoryItem[] {
    const searchTerm = name.toLowerCase().trim();
    return this.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  // Filter items by category
  filterItemsByCategory(category: string): InventoryItem[] {
    if (!category || category.trim() === '') {
      return this.getItems();
    }
    return this.items.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Edit items by name
  updateItemByName(
    oldName: string,
    updates: Partial<Omit<InventoryItem, 'id' | 'inStock'>>
  ): boolean {
    const item = this.items.find(
      i => i.name.toLowerCase() === oldName.toLowerCase()
    );
    if (!item) return false;

    // Merge update
    Object.assign(item, updates);
    // Automatically update inventory status
    item.inStock = item.quantity > 0;
    return true;
  }
}
