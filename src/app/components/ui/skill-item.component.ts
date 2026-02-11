import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skill-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skill-item group relative flex flex-col items-center text-center hover:scale-110 transition-transform" [ngClass]="className">
      <div *ngIf="tooltip" class="skill-tooltip">{{ tooltip }}</div>
      <img [src]="icon" class="w-12 h-12 mb-2" [alt]="label" />
      <span>{{ label }}</span>
    </div>
  `
})
export class SkillItemComponent {
  @Input() icon = '';
  @Input() label = '';
  @Input() className = '';
  @Input() tooltip?: string;
}
