import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LanguageService } from '../../services/language.service';

type ToggleSize = 'default';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-toggle.component.html'
})
export class LanguageToggleComponent {
  @Input() size: ToggleSize = 'default';
  isHover = false;

  constructor(public lang: LanguageService) {}

  toggleLang(): void {
    this.lang.toggle();
  }

  imgSrc(): string {
    if (this.lang.current() === 'en') {
      return this.isHover ? 'assets/headerpics/englishHover.png' : 'assets/headerpics/english.png';
    }
    return this.isHover ? 'assets/headerpics/germanHover.png' : 'assets/headerpics/german.png';
  }

  ariaLabel(): string {
    return this.lang.current() === 'en' ? 'Language: English' : 'Language: Deutsch';
  }
}
