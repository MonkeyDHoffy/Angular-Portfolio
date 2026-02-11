import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tech-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="flex items-center gap-2 px-3 py-1 rounded-full border-white/20 text-sm text-white/90 font-firacode">
      <img *ngIf="iconSrc" [src]="iconSrc" [alt]="label + ' icon'" class="w-5 h-5 object-contain" />
      {{ label }}
    </span>
  `
})
export class TechBadgeComponent {
  @Input() label = '';
  @Input() iconSrc?: string;
}
