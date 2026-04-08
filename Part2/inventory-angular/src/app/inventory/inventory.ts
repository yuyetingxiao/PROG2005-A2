// inventory.ts
/**
 * PROG2005 Assignment 2 Part 2
 * Inventory Service
 * Core business logic for inventory management: add, edit, delete, search, filter
 */
import { Injectable } from '@angular/core';
import { InventoryItem } from './models/inventory-item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private items: InventoryItem[] = [
    {
      id: 'ITEM001',
      name: 'Laptop Pro 16',
      category: 'Electronics',
      quantity: 15,
      price: 1999.99,
      supplier: 'TechGlobal Pty Ltd',
      stockStatus: 'In Stock',
      popularItem: 'Yes',
      comment: 'High-performance laptop for professionals'
    },
    {
      id: 'ITEM002',
      name: 'Office Chair',
      category: 'Furniture',
      quantity: 8,
      price: 299.99,
      supplier: 'OfficeWorks',
      stockStatus: 'Low Stock',
      popularItem: 'Yes',
      comment: 'Ergonomic office chair'
    },
    {
      id: 'ITEM003',
      name: 'Cotton T-Shirt',
      category: 'Clothing',
      quantity: 50,
      price: 19.99,
      supplier: 'FashionHub',
      stockStatus: 'In Stock',
      popularItem: 'No',
      comment: '100% cotton, size M'
    }
  ];

  constructor() {
    const saved = localStorage.getItem('inventoryItems');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  /**
   * Get all inventory items
   * @returns InventoryItem[]
   */
  getItems(): InventoryItem[] {
    return [...this.items];
  }

  /**
   * Get item by ID
   * @param id item ID
   * @returns InventoryItem | undefined
   */
  getItemById(id: string): InventoryItem | undefined {
    return this.items.find(item => item.id === id);
  }

  /**
   * Add new item with validation
   * @param item new inventory item
   * @returns boolean success status
   */
  addItem(item: InventoryItem): boolean {
    if (!this.validateItem(item)) return false;

    if (this.items.some(i => i.id === item.id)) {
      alert('Error: Item ID already exists!');
      return false;
    }

    this.items.push({ ...item });
    this.saveToLocalStorage();
    return true;
  }

  /**
   * Update existing item
   * @param updatedItem updated item data
   * @returns boolean success status
   */
  updateItem(updatedItem: InventoryItem): boolean {
    if (!this.validateItem(updatedItem)) return false;

    const index = this.items.findIndex(i => i.id === updatedItem.id);
    if (index === -1) return false;

    this.items[index] = { ...updatedItem };
    this.saveToLocalStorage();
    return true;
  }

  /**
   * Delete item by ID
   * @param id item ID to delete
   * @returns boolean success status
   */
  deleteItem(id: string): boolean {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return false;

    const itemName = this.items[index].name;
    if (confirm(`Are you sure you want to delete: ${itemName}?`)) {
      this.items.splice(index, 1);
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  /**
   * Search items by name (case-insensitive)
   * @param name search keyword
   * @returns InventoryItem[]
   */
  searchItemsByName(name: string): InventoryItem[] {
    if (!name.trim()) return this.getItems();
    const keyword = name.toLowerCase().trim();
    return this.items.filter(item =>
      item.name.toLowerCase().includes(keyword)
    );
  }

  /**
   * Filter items by category
   * @param category category name
   * @returns InventoryItem[]
   */
  filterItemsByCategory(category: string): InventoryItem[] {
    if (!category) return this.getItems();
    return this.items.filter(item => item.category === category);
  }

  /**
   * Get all popular items
   * @returns InventoryItem[]
   */
  getPopularItems(): InventoryItem[] {
    return this.items.filter(item => item.popularItem === 'Yes');
  }

  /**
   * Validate all required fields and data rules
   * @param item item to validate
   * @returns boolean valid or not
   */
  private validateItem(item: InventoryItem): boolean {
    if (!item.id || !item.name || !item.category || !item.supplier) {
      alert('Error: All required fields must be filled!');
      return false;
    }

    if (item.quantity < 0 || item.price < 0) {
      alert('Error: Quantity and Price cannot be negative!');
      return false;
    }

    const validCategories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Other'];
    if (!validCategories.includes(item.category)) {
      alert('Error: Invalid category selected!');
      return false;
    }

    const validStatus = ['In Stock', 'Low Stock', 'Out of Stock'];
    if (!validStatus.includes(item.stockStatus)) {
      alert('Error: Invalid stock status!');
      return false;
    }

    if (!['Yes', 'No'].includes(item.popularItem)) {
      alert('Error: Popular Item must be Yes or No!');
      return false;
    }

    return true;
  }

  /**
   * Save data to localStorage for persistence
   */
  private saveToLocalStorage(): void {
    localStorage.setItem('inventoryItems', JSON.stringify(this.items));
  }
}