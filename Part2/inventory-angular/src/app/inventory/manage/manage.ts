import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage',
  standalone: true, // 必须加，Angular 17+ 独立组件核心
  imports: [CommonModule],
  templateUrl: './manage.html',
  styleUrls: ['./manage.css']
})
export class ManageComponent {
  // 这里写你的首页逻辑
}
