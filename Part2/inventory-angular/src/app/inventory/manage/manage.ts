// manage.ts
/**
 * PROG2005 Assignment 2 Part 2
 * Inventory Management Component
 * Add, edit, delete inventory items
 */
import { Component } from '@angular/core';
import { InventoryService } from '../inventory';
import { InventoryItem } from '../models/inventory-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.html',
  styleUrls: ['./manage.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ManageComponent {
  newItem: InventoryItem = {
    id: '',
    name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier: '',
    stockStatus: 'In Stock',
    popularItem: 'Yes',
    comment: ''
  };
  isEditing = false;

  constructor(public inventoryService: InventoryService) {}

  /**
   * Add new item to inventory
   */
  addItem(): void {
    if (this.inventoryService.addItem(this.newItem)) {
      this.resetForm();
      alert('Item added successfully!');
    }
  }

  /**
   * Load selected item into form for editing
   * @param item item to edit
   */
  loadItem(item: InventoryItem): void {
    this.newItem = { ...item };
    this.isEditing = true;
  }

  /**
   * Save edited item
   */
  saveEdit(): void {
    if (this.inventoryService.updateItem(this.newItem)) {
      this.resetForm();
      this.isEditing = false;
      alert('Item updated successfully!');
    }
  }

  /**
   * Delete item by ID
   * @param id item ID
   */
  deleteItem(id: string): void {
    if (this.inventoryService.deleteItem(id)) {
      if (this.newItem.id === id) {
        this.resetForm();
        this.isEditing = false;
      }
      alert('Item deleted successfully!');
    }
  }

  /**
   * Reset form to default state
   */
  resetForm(): void {
    this.newItem = {
      id: '',
      name: '',
      category: 'Electronics',
      quantity: 0,
      price: 0,
      supplier: '',
      stockStatus: 'In Stock',
      popularItem: 'Yes',
      comment: ''
    };
  }
}