import { TestBed } from '@angular/core/testing';
import { InventoryService } from './inventory'; 

describe('InventoryService', () => { 
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService] 
    });
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should return inventory items', () => {
    const items = service.getAll();
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].itemId).toBe('ITEM001');
  });


  it('delete should remove item by itemId', () => {
    service.delete('ITEM001');
    const items = service.getAll();
    expect(items.some(i => i.itemId === 'ITEM001')).toBeFalsy();
  });
});
