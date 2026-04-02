// search.ts
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
    // Initialize display of all items
    this.results = this.invService.getItems();
    this.updateResultMessage();
  }

  // Search method
  onSearch(searchInput: HTMLInputElement): void {
    this.results = this.invService.searchItemsByName(searchInput.value);
    this.updateResultMessage();
  }

  // Classification filtering method
  onFilter(categorySelect: HTMLSelectElement): void {
    this.results = this.invService.filterItemsByCategory(categorySelect.value);
    this.updateResultMessage();
  }

  // Unified update result prompt
  private updateResultMessage(): void {
    if (this.msg?.nativeElement) {
      this.msg.nativeElement.textContent = `Found ${this.results.length} item(s)`;
    }
  }
}