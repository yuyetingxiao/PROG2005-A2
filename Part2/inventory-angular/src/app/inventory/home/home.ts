import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../inventory';
import { InventoryItem } from '../models/inventory-item.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  popularItems: InventoryItem[] = [];
  allItems: InventoryItem[] = [];
  totalItems = 0;
  outOfStockCount = 0;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.allItems = this.inventoryService.getItems();
    this.popularItems = this.inventoryService.getPopularItems();
    this.totalItems = this.allItems.length;
    this.outOfStockCount = this.allItems.filter(i => !i.inStock).length;
  }
}
