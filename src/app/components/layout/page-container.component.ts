import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12" [ngClass]="className">
      <ng-content></ng-content>
    </div>
  `
})
export class PageContainerComponent {
  @Input() className = '';
}
