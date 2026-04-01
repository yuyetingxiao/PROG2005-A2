// search.ts - HD 完整组件
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { InventoryService } from '../inventory';
import { CommonModule } from '@angular/common';
import { InventoryItem } from '../models/inventory-item.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent implements OnInit {
  results: InventoryItem[] = [];
  @ViewChild('msg') msg!: ElementRef<HTMLDivElement>;

  constructor(private invService: InventoryService) {}

  ngOnInit(): void {
    // 初始化显示全部物品
    this.results = this.invService.getItems();
    this.updateResultMessage();
  }

  // 搜索方法
  onSearch(searchInput: HTMLInputElement): void {
    this.results = this.invService.searchItemsByName(searchInput.value);
    this.updateResultMessage();
  }

  // 分类筛选方法
  onFilter(categorySelect: HTMLSelectElement): void {
    this.results = this.invService.filterItemsByCategory(categorySelect.value);
    this.updateResultMessage();
  }

  // 统一更新结果提示
  private updateResultMessage(): void {
    if (this.msg?.nativeElement) {
      this.msg.nativeElement.textContent = `Found ${this.results.length} item(s)`;
    }
  }
}