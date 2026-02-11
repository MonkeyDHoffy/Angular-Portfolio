import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { PageContainerComponent } from '../layout/page-container.component';
import { RoundedCardComponent } from '../ui/rounded-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, PageContainerComponent, RoundedCardComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('portrait') imgRef?: ElementRef<HTMLImageElement>;

  devImg = 'assets/aboutme/thedeveloper.jpg';
  locationIcon = 'assets/aboutme/location_on.png';
  cognitionIcon = 'assets/aboutme/cognition.png';
  newReleasesIcon = 'assets/aboutme/new_releases.png';

  private observer: IntersectionObserver | null = null;
  private mq?: MediaQueryList;
  private mqListener?: () => void;

  constructor(public lang: LanguageService) {}

  ngAfterViewInit(): void {
    const el = this.imgRef?.nativeElement;
    if (!el) return;

    const buildThresholds = () => Array.from({ length: 101 }, (_, i) => i / 100);

    const updateRevealProgress = (element: HTMLElement, ratio: number) => {
      element.style.setProperty('--reveal-progress', String(ratio));
    };

    const createObserver = (element: HTMLElement, thresholds: number[]) => new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        updateRevealProgress(element, entry.intersectionRatio);
      },
      { root: null, threshold: thresholds }
    );

    const enableReveal = () => {
      if (this.observer) return;
      el.classList.add('js-reveal');
      this.observer = createObserver(el, buildThresholds());
      this.observer.observe(el);
    };

    const disableReveal = () => {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      el.classList.remove('js-reveal');
      el.style.removeProperty('--reveal-progress');
    };

    this.mq = window.matchMedia('(max-width: 1024px)');

    const applyResponsiveReveal = () => {
      if (!el) return;
      if (this.mq?.matches) {
        disableReveal();
      } else {
        enableReveal();
      }
    };

    applyResponsiveReveal();
    this.mqListener = () => applyResponsiveReveal();
    this.mq.addEventListener('change', this.mqListener);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.mq && this.mqListener) {
      this.mq.removeEventListener('change', this.mqListener);
    }
  }
}
