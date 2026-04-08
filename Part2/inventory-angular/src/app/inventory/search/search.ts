// search.ts
/**
 * PROG2005 Assignment 2 Part 2
 * Search & Filter Component
 * Search by name, filter by category, filter popular items
 */
import { Component } from '@angular/core';
import { InventoryService } from '../inventory';
import { InventoryItem } from '../models/inventory-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchComponent {
  searchResults: InventoryItem[] = [];
  searchKeyword = '';
  selectedCategory = '';
  showPopularOnly = false;

  categories = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Other'];

  constructor(public inventoryService: InventoryService) {
    this.searchResults = this.inventoryService.getItems();
  }

  /**
   * Trigger search by name
   */
  onSearch(): void {
    this.applyFilters();
  }

  /**
   * Trigger filter by category
   */
  onCategoryChange(): void {
    this.applyFilters();
  }

  /**
   * Trigger popular item filter
   */
  onPopularFilterChange(): void {
    this.applyFilters();
  }

  /**
   * Apply all active filters
   */
  private applyFilters(): void {
    let results = this.inventoryService.getItems();

    if (this.searchKeyword.trim()) {
      results = this.inventoryService.searchItemsByName(this.searchKeyword);
    }

    if (this.selectedCategory) {
      results = results.filter(item => item.category === this.selectedCategory);
    }

    if (this.showPopularOnly) {
      results = this.inventoryService.getPopularItems();
    }

    this.searchResults = results;
  }

  /**
   * Reset all filters
   */
  resetFilters(): void {
    this.searchKeyword = '';
    this.selectedCategory = '';
    this.showPopularOnly = false;
    this.searchResults = this.inventoryService.getItems();
  }
}