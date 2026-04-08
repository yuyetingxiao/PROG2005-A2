/**
 * PROG2005 Assignment 2 Part 2
 * Root Component
 * Main navigation and layout wrapper
 */
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {
  title = 'Inventory Management System';
}