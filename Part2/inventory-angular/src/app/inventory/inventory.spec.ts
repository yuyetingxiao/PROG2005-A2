/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory';
import { InventoryItem } from './models/inventory-item.model';

describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(() => {
    const storage: Record<string, string> = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => storage[key] || null);
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      storage[key] = value;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete storage[key];
    });

    TestBed.configureTestingModule({
      providers: [InventoryService]
    });
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all inventory items', () => {
    const items = service.getItems();
    expect(items.length).toBe(3); // 默认3个示例商品
  });

  it('should find an item by valid ID', () => {
    const item = service.getItemById('ITEM001');
    expect(item).toBeTruthy();
    expect(item?.name).toBe('Laptop Pro 16');
  });

  it('should return undefined for invalid ID', () => {
    const item = service.getItemById('INVALID_ID');
    expect(item).toBeUndefined();
  });

  it('should add a new valid item successfully', () => {
    const newItem: InventoryItem = {
      id: 'TEST001',
      name: 'Test Item',
      category: 'Electronics',
      quantity: 10,
      price: 99.99,
      supplier: 'Test Supplier',
      stockStatus: 'In Stock',
      popularItem: 'Yes',
      comment: 'Test comment'
    };

    const result = service.addItem(newItem);
    expect(result).toBeTrue();
    expect(service.getItems().length).toBe(4);
  });

  it('should NOT add item with duplicate ID', () => {
    const duplicateItem: InventoryItem = {
      id: 'ITEM001',
      name: 'Duplicate',
      category: 'Electronics',
      quantity: 1,
      price: 1,
      supplier: 'Test',
      stockStatus: 'In Stock',
      popularItem: 'No',
      comment: ''
    };

    const result = service.addItem(duplicateItem);
    expect(result).toBeFalse();
    expect(service.getItems().length).toBe(3);
  });

  it('should update an existing item successfully', () => {
    const updatedItem: InventoryItem = {
      id: 'ITEM001',
      name: 'Updated Laptop',
      category: 'Electronics',
      quantity: 20,
      price: 1999.99,
      supplier: 'TechGlobal Pty Ltd',
      stockStatus: 'In Stock',
      popularItem: 'Yes',
      comment: 'Updated'
    };

    const result = service.updateItem(updatedItem);
    expect(result).toBeTrue();
    
    const item = service.getItemById('ITEM001');
    expect(item?.name).toBe('Updated Laptop');
  });

  it('should delete an item by ID successfully', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const result = service.deleteItem('ITEM001');
    expect(result).toBeTrue();
    expect(service.getItems().length).toBe(2);
  });

  it('should search items by name (case-insensitive)', () => {
    const results = service.searchItemsByName('laptop');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('ITEM001');
  });

  it('should filter items by category', () => {
    const results = service.filterItemsByCategory('Furniture');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Office Chair');
  });

  it('should return only popular items', () => {
    const popular = service.getPopularItems();
    expect(popular.length).toBe(2);
  });
});