import { Injectable } from '@angular/core';
import { InventoryItem, Category } from './models/inventory-item.model'; 

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private items: InventoryItem[] = [
    {
      itemId: 'ITEM001',
      itemName: 'Laptop',
      category: 'Electronics',
      quantity: 15,
      price: 1200,
      supplier: 'Tech Supplier',
      status: 'In Stock',
      isPopular: true
    },
    {
      itemId: 'ITEM002',
      itemName: 'Office Chair',
      category: 'Furniture',
      quantity: 8,
      price: 180,
      supplier: 'Furniture Co',
      status: 'Low Stock',
      isPopular: true
    },
    {
      itemId: 'ITEM003',
      itemName: 'Cordless Drill',
      category: 'Tools',
      quantity: 0,
      price: 99,
      supplier: 'Tool World',
      status: 'Out of Stock',
      isPopular: false
    }
  ];


  getAll(): InventoryItem[] { 
    return [...this.items]; 
  }


  getPopular(): InventoryItem[] { 
    return this.items.filter(i => i.isPopular); 
  }


  add(item: InventoryItem): boolean {
    if (this.items.some(i => i.itemId === item.itemId)) return false;
    if (item.quantity > 10) item.status = 'In Stock';
    else if (item.quantity > 0) item.status = 'Low Stock';
    else item.status = 'Out of Stock';
    
    this.items.push(item);
    return true;
  }

  delete(itemId: string): void {
    this.items = this.items.filter(i => i.itemId !== itemId);
  }

  search(name: string): InventoryItem[] {
    return this.items.filter(i =>
      i.itemName.toLowerCase().includes(name.toLowerCase())
    );
  }

  filterByCategory(cat: Category): InventoryItem[] {
    return this.items.filter(i => i.category === cat);
  }

  update(updatedItem: InventoryItem): boolean {
    const index = this.items.findIndex(i => i.itemId === updatedItem.itemId);
    if (index === -1) return false;
    
    if (updatedItem.quantity > 10) updatedItem.status = 'In Stock';
    else if (updatedItem.quantity > 0) updatedItem.status = 'Low Stock';
    else updatedItem.status = 'Out of Stock';

    this.items[index] = updatedItem;
    return true;
  }

  getById(itemId: string): InventoryItem | undefined {
    return this.items.find(i => i.itemId === itemId);
  }
}
