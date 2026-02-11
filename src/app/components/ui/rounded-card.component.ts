import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-[30px] border border-secondary bg-background-greencontainer" [ngClass]="className" [ngStyle]="style">
      <ng-content></ng-content>
    </div>
  `
})
export class RoundedCardComponent {
  @Input() className = '';
  @Input() style?: Record<string, string | number>;
}
