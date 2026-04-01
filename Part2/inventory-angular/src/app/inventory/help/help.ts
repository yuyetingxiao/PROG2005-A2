import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true, // 必须加，Angular 17+ 独立组件核心
  imports: [CommonModule],
  templateUrl: './help.html',
  styleUrls: ['./help.css']
})
export class HelpComponent {
  // 这里写你的首页逻辑
}
