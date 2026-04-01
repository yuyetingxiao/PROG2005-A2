import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { InventoryService } from '../inventory';
import { InventoryItem, Category, StockStatus } from '../models/inventory-item.model';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './manage.html',
  styleUrls: ['./manage.css']
})
export class ManageComponent {
  
  items: InventoryItem[] = [];
  newItem: Partial<InventoryItem> = {
    itemId: '',
    itemName: '',
    category: 'Electronics',
    quantity: 0,
    price: 0,
    supplier: '',
    isPopular: false
  };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.items = this.inventoryService.getAll();
  }

  addItem(): void {
    if (!this.newItem.itemId || !this.newItem.itemName) return;
    this.inventoryService.add(this.newItem as InventoryItem);
    this.items = this.inventoryService.getAll();
    this.newItem = { itemId: '', itemName: '', category: 'Electronics', quantity: 0, price: 0, supplier: '', isPopular: false };
  }

  deleteItem(itemId: string): void {
    this.inventoryService.delete(itemId);
    this.items = this.inventoryService.getAll();
  }
}
