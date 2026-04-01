import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ManageComponent } from './manage/manage';
import { SearchComponent } from './search/search';
import { PrivacyComponent } from './privacy/privacy';
import { HelpComponent } from './help/help';

export const INVENTORY_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'help', component: HelpComponent },
];