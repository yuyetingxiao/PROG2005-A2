/**
 * PROG2005 Assignment 2 Part 2
 * Routing Configuration
 * Defines all 5 required pages for the assignment
 */
import { Routes } from '@angular/router';
import { HomeComponent } from './inventory/home/home';
import { ManageComponent } from './inventory/manage/manage';
import { SearchComponent } from './inventory/search/search';
import { PrivacyComponent } from './inventory/privacy/privacy';
import { HelpComponent } from './inventory/help/help';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'inventory', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'help', component: HelpComponent }
];