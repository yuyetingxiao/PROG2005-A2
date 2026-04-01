import { Routes } from '@angular/router';
// 👇 正确相对路径：./ 代表当前目录（inventory文件夹）
import { HomeComponent } from './home/home';
import { ManageComponent } from './manage/manage';
import { SearchComponent } from './search/search';
import { PrivacyComponent } from './privacy/privacy';
import { HelpComponent } from './help/help';

export const INVENTORY_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // 默认跳首页
  { path: 'home', component: HomeComponent },
  { path: 'manage', component: ManageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'help', component: HelpComponent },
];