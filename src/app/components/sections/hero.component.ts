import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../layout/header.component';
import { LanguageService } from '../../services/language.service';
import { BannerComponent } from './banner.component';
import { IconWithHoverComponent } from '../ui/icon-with-hover.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, IconWithHoverComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./ultrastylischelinien.css']
})
export class HeroComponent {
  activeContact: string | null = null;

  movingArrow = 'assets/heropics/movingarrow.png';
  mailIcon = 'assets/heropics/mailHover.png';
  mailIconHover = 'assets/heropics/mail.png';
  gitIcon = 'assets/heropics/giticon.png';
  gitIconHover = 'assets/heropics/giticonHover.png';
  linkedinIcon = 'assets/heropics/linkedinicon.png';
  linkedinIconHover = 'assets/heropics/linkediniconHover.png';

  constructor(public lang: LanguageService) {}

  selectContact(id: string): void {
    this.activeContact = id;
  }

  indicatorClasses(id: string): Record<string, boolean> {
    const base = {
      'hero-contact-indicator pointer-events-none absolute left-full ml-2 h-2 w-2 rounded-full bg-secondary transition-all duration-200 ease-out': true,
      'group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100': true
    } as Record<string, boolean>;
    base['opacity-100'] = this.activeContact === id;
    base['scale-100'] = this.activeContact === id;
    base['opacity-0'] = this.activeContact !== id;
    base['scale-75'] = this.activeContact !== id;
    return base;
  }
}
