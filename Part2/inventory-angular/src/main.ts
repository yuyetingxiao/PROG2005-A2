import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// 👇 导入正确的类名 AppComponent，不是 App
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
