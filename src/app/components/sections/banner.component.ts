import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.css']
})
export class BannerComponent {
  @Input() repeat = 12;
  constructor(public lang: LanguageService) {}

  items(): number[] {
    return Array.from({ length: this.repeat }, (_, i) => i);
  }
}
