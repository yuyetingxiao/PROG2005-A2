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
    // 统一方法名：getItems() 替代 getAll()
    this.allItems = this.inventoryService.getItems();
    // 统一方法名：getPopularItems() 替代 getPopular()
    this.popularItems = this.inventoryService.getPopularItems();
    this.totalItems = this.allItems.length;
    // 修复：用正确的inStock字段替代不存在的status
    this.outOfStockCount = this.allItems.filter(i => !i.inStock).length;
  }
}
