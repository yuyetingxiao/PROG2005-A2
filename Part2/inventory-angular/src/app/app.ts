import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="container">
      <h1>Angular Inventory Management System</h1>
      <nav>
        <a routerLink="/inventory/home" routerLinkActive="active">Home</a>
        <a routerLink="/inventory/manage" routerLinkActive="active">Manage Inventory</a>
        <a routerLink="/inventory/search" routerLinkActive="active">Search & Filter</a>
        <a routerLink="/inventory/privacy" routerLinkActive="active">Privacy & Security</a>
        <a routerLink="/inventory/help" routerLinkActive="active">Help</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.css']
})

export class AppComponent {
  title = 'inventory-angular';
}
