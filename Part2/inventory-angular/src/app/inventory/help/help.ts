/**
 * PROG2005 Assignment 2 Part 2
 * Help & FAQ Component
 * User guide and troubleshooting
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  templateUrl: './help.html',
  styleUrls: ['./help.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HelpComponent {
  // Static content page, no logic required
}