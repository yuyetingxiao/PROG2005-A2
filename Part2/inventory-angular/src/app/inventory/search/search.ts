import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../inventory';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  keyword = '';
  result: any[] = [];

  constructor(private service: InventoryService) {}

  doSearch() {
    this.result = this.service.search(this.keyword);
  }
}
