import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { BodyScrollService } from '../../services/body-scroll.service';
import { PageContainerComponent } from './page-container.component';
import { LanguageToggleComponent } from '../ui/language-toggle.component';
import { NavLinksComponent } from '../ui/nav-links.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, PageContainerComponent, LanguageToggleComponent, NavLinksComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  open = false;

  mobileLogo = 'assets/headerpics/jhicon.png';
  logo = 'assets/headerpics/JHOFF.png';
  menuIcon = 'assets/headerpics/menu.png';

  constructor(public lang: LanguageService, private bodyScroll: BodyScrollService) {}

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) this.closeMenu();
  }

  toggleMenu(): void {
    this.open = !this.open;
    this.syncBodyLock();
  }

  closeMenu(): void {
    this.open = false;
    this.syncBodyLock();
  }

  ngOnDestroy(): void {
    this.bodyScroll.unlock();
  }

  private syncBodyLock(): void {
    if (this.open) {
      this.bodyScroll.lock({ preserveScroll: true });
    } else {
      this.bodyScroll.unlock();
    }
  }
}
