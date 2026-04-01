
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory-routing').then(m => m.INVENTORY_ROUTES)
  },
  { path: '**', redirectTo: 'inventory/home' }
];
