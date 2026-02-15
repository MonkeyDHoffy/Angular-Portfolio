import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glow-background',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./glow-background.component.scss'],
  template: `
    <div class="relative">
      <div
        class="glow-background__orb absolute left-0 top-1/2 -translate-y-1/2 w-[800px] h-[1200px] pointer-events-none"
        data-aos="glow-slide"
        data-aos-offset="120"
        data-aos-once="true"
      ></div>
      <div class="relative z-10">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class GlowBackgroundComponent {}
