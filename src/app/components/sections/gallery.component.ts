import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { PageContainerComponent } from '../layout/page-container.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, PageContainerComponent],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  Math = Math;
  quotesImg = 'assets/gallery/quotes.png';
  arrowForwardImg = 'assets/gallery/arrow_forward.png';

  activeIndex = 2;
  vw = typeof window !== 'undefined' ? window.innerWidth : 1200;

  constructor(public lang: LanguageService) {}

  @HostListener('window:resize')
  onResize(): void {
    this.vw = window.innerWidth;
  }

  cards() {
    return [
      { title: this.lang.t('gallery.card1.title'), text: this.lang.t('gallery.card1.text'), sender: this.lang.t('gallery.card1.sender') },
      { title: this.lang.t('gallery.card2.title'), text: this.lang.t('gallery.card2.text'), sender: this.lang.t('gallery.card2.sender') },
      { title: this.lang.t('gallery.card3.title'), text: this.lang.t('gallery.card3.text'), sender: this.lang.t('gallery.card3.sender') },
      { title: this.lang.t('gallery.card4.title'), text: this.lang.t('gallery.card4.text'), sender: this.lang.t('gallery.card4.sender') },
      { title: this.lang.t('gallery.card5.title'), text: this.lang.t('gallery.card5.text'), sender: this.lang.t('gallery.card5.sender') }
    ];
  }

  cardWidth(): number {
    return Math.min(568, Math.floor(this.vw * 0.9));
  }

  cardGap(): number {
    return Math.min(48, Math.floor(this.vw * 0.05));
  }

  cardHeight(): number {
    if (this.vw < 480) return 280;
    if (this.vw < 640) return 260;
    return 240;
  }

  cardTopOffset = 36;

  trackOffset(): number {
    return (this.cardWidth() + this.cardGap()) * this.activeIndex;
  }

  goPrev(): void {
    const total = this.cards().length;
    this.activeIndex = (this.activeIndex - 1 + total) % total;
  }

  goNext(): void {
    const total = this.cards().length;
    this.activeIndex = (this.activeIndex + 1) % total;
  }

  goTo(index: number): void {
    this.activeIndex = index;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
