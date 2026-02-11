import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup relative w-[296px] h-[192px] rounded-[30px] overflow-visible">
      <div class="diagonalShadowPopup translate-x-5 translate-y-2"></div>
      <img
        class="relative z-10 w-[296px] h-[192px] rounded-[30px] object-cover"
        [src]="img || defaultImg"
        [alt]="alt"
      />
    </div>
  `
})
export class ContactPopupComponent {
  @Input() img?: string;
  @Input() alt = 'Project preview';

  defaultImg = 'assets/aboutme/thedeveloper.jpg';
}
