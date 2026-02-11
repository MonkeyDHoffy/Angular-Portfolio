import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

type NavVariant = 'inline' | 'list';

const NAV_ITEMS = [
  { key: 'about', fragment: 'about', labelKey: 'header.about' },
  { key: 'skills', fragment: 'skills', labelKey: 'header.skills' },
  { key: 'projects', fragment: 'projects', labelKey: 'header.projects' }
];

@Component({
  selector: 'app-nav-links',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-links.component.html'
})
export class NavLinksComponent implements OnDestroy {
  @Input() variant: NavVariant = 'inline';
  @Output() navigate = new EventEmitter<void>();

  activeHash: string | null = null;
  private sub: Subscription;
  private router = inject(Router);

  constructor(public lang: LanguageService) {
    this.sub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const fragment = this.router.parseUrl(event.urlAfterRedirects).fragment;
        this.activeHash = fragment ? `#${fragment}` : null;
      });

    const initialFragment = this.router.parseUrl(this.router.url).fragment;
    this.activeHash = initialFragment ? `#${initialFragment}` : null;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelect(fragment: string): void {
    this.activeHash = fragment ? `#${fragment}` : null;
    this.navigate.emit();
  }

  isActive(fragment: string): boolean {
    return this.activeHash === `#${fragment}`;
  }

  navItems(): typeof NAV_ITEMS {
    return NAV_ITEMS;
  }
}
