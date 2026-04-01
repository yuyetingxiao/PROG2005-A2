// inventory.ts - HD 完整服务
import { Injectable } from '@angular/core';
import { InventoryItem } from './models/inventory-item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  // 初始化示例数据（包含所有必填字段）
  private items: InventoryItem[] = [
    {
      id: 1,
      itemId: 'ITEM001',
      name: 'Laptop',
      category: 'Electronics',
      quantity: 15,
      price: 1200,
      supplier: 'Tech Corp',
      isPopular: true,
      inStock: true,
      comment: 'High-performance business laptop'
    },
    {
      id: 2,
      itemId: 'ITEM002',
      name: 'Office Chair',
      category: 'Furniture',
      quantity: 8,
      price: 180,
      supplier: 'Office Supplies Ltd',
      isPopular: true,
      inStock: true,
      comment: 'Ergonomic design for long hours'
    },
    {
      id: 3,
      itemId: 'ITEM003',
      name: 'Cordless Drill',
      category: 'Tools',
      quantity: 0,
      price: 99,
      supplier: 'Hardware Store',
      isPopular: false,
      inStock: false,
      comment: 'Out of stock, restock next week'
    }
  ];

    getAll(): InventoryItem[] {
    return this.getItems();
  }

  // 兼容测试的 delete() 方法（按 itemId 删除）
  delete(itemId: string): void {
    this.items = this.items.filter(item => item.itemId !== itemId);
  }

  // 获取全部物品
  getItems(): InventoryItem[] {
    return [...this.items];
  }

  // 获取热门物品
  getPopularItems(): InventoryItem[] {
    return this.items.filter(item => item.isPopular);
  }

  // 获取缺货数量
  getOutOfStockCount(): number {
    return this.items.filter(item => !item.inStock).length;
  }

  // 添加物品（含完整校验）
  addItem(item: Omit<InventoryItem, 'inStock'>): boolean {
    // 校验ID唯一性
    if (this.items.some(existing => existing.id === item.id)) {
      return false;
    }
    // 自动计算库存状态
    const newItem: InventoryItem = {
      ...item,
      inStock: item.quantity > 0
    };
    this.items.push(newItem);
    return true;
  }

  // 按名称删除物品
  deleteItemByName(name: string): boolean {
    const index = this.items.findIndex(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }

  // 按名称搜索物品
  searchItemsByName(name: string): InventoryItem[] {
    const searchTerm = name.toLowerCase().trim();
    return this.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  // 按分类筛选物品（HD 要求）
  filterItemsByCategory(category: string): InventoryItem[] {
    if (!category || category.trim() === '') {
      return this.getItems();
    }
    return this.items.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // 按名称编辑物品（HD 要求）
  updateItemByName(
    oldName: string,
    updates: Partial<Omit<InventoryItem, 'id' | 'inStock'>>
  ): boolean {
    const item = this.items.find(
      i => i.name.toLowerCase() === oldName.toLowerCase()
    );
    if (!item) return false;

    // 合并更新
    Object.assign(item, updates);
    // 自动更新库存状态
    item.inStock = item.quantity > 0;
    return true;
  }
}
