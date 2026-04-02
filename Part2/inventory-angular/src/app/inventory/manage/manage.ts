// manage.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory';
import { InventoryItem } from '../models/inventory-item.model';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage.html',
  styleUrls: ['./manage.css']
})
export class ManageComponent implements OnInit {
  items: InventoryItem[] = [];
  newItem: Partial<InventoryItem> = {
    id: 0,
    name: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier: '',
    isPopular: false,
    comment: ''
  };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.items = this.inventoryService.getItems();
  }

  // Add item
  addItem(): void {
    if (!this.newItem.id || !this.newItem.name) return;
    const success = this.inventoryService.addItem(this.newItem as InventoryItem);
    if (success) {
      this.items = this.inventoryService.getItems();
      this.resetForm();
    }
  }

  // Delete by Name
  deleteItemByName(name: string): void {
    if (confirm('Confirm delete?')) {
      this.inventoryService.deleteItemByName(name);
      this.items = this.inventoryService.getItems();
    }
  }

  // Edit function
  editItem(name: string): void {
    const item = this.items.find(i => i.name === name);
    if (item) this.newItem = { ...item };
  }

  resetForm(): void {
    this.newItem = {
      id: 0, name: '', category: 'Electronics', quantity: 0,
      price: 0, supplier: '', isPopular: false, comment: ''
    };
  }
}