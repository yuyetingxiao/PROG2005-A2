import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true, // 必须加，Angular 17+ 独立组件核心
  imports: [CommonModule],
  templateUrl: './privacy.html',
  styleUrls: ['./privacy.css']
})
export class PrivacyComponent {
  // 这里写你的首页逻辑
}
