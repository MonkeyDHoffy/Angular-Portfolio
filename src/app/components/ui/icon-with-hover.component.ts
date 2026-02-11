import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-with-hover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="className"
      [style.position]="'relative'"
      (mouseenter)="isHovered = true"
      (mouseleave)="isHovered = false"
    >
      <img [src]="isHovered ? hoverSrc : baseSrc" [alt]="alt" />
    </div>
  `
})
export class IconWithHoverComponent {
  @Input() baseSrc = '';
  @Input() hoverSrc = '';
  @Input() alt = '';
  @Input() className = '';
  isHovered = false;
}
