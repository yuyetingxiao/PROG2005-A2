/**
 * PROG2005 Assignment 2 Part 2
 * Home Component
 * Dashboard, statistics and app overview
 */
import { Component } from '@angular/core';
import { InventoryService } from '../inventory';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(public inventoryService: InventoryService) {}

  get totalItems(): number {
    return this.inventoryService.getItems().length;
  }

  get inStockItems(): number {
    return this.inventoryService.getItems().filter(i => i.stockStatus === 'In Stock').length;
  }

  get lowStockItems(): number {
    return this.inventoryService.getItems().filter(i => i.stockStatus === 'Low Stock').length;
  }

  get outOfStockItems(): number {
    return this.inventoryService.getItems().filter(i => i.stockStatus === 'Out of Stock').length;
  }

  get popularItems(): number {
    return this.inventoryService.getPopularItems().length;
  }
}
