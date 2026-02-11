import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glow-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <div
        class="absolute left-0 top-1/2 -translate-y-1/2 w-[800px] h-[1200px] pointer-events-none"
        [style.background]="'radial-gradient(circle at left, #3DCFB680 0%, transparent 60%)'"
        [style.transform]="'translateX(-20%) translateY(-50%)'"
        [style.filter]="'blur(80px)'"
      ></div>
      <div class="relative z-10">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class GlowBackgroundComponent {}
