import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TechBadgeComponent } from '../ui/tech-badge.component';

const PROJECT_ICONS: Record<string, string> = {
  angular: 'assets/projects/Angular.png',
  typescript: 'assets/projects/TypeScript.png',
  javascript: 'assets/projects/Javascript.png',
  html: 'assets/projects/HTML.png',
  css: 'assets/projects/CSS.png',
  firebase: 'assets/projects/Firebase.png'
};

@Component({
  selector: 'app-project-slide',
  standalone: true,
  imports: [CommonModule, TechBadgeComponent],
  templateUrl: './project-slide.component.html',
  styleUrls: ['./project-slide.component.scss']
})
export class ProjectSlideComponent {
  @Input() index = '';
  @Input() titleKey = '';
  @Input() questionKey = '';
  @Input() descriptionKey = '';
  @Input() techStack: string[] = [];
  @Input() imageSrc = '';
  @Input() imageAlt = '';
  @Input() primaryActions: Array<{ label: string; href?: string; variant?: 'primary' | 'secondary' } > = [];
  @Input() nextLabel = '';
  @Output() next = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  isCloseHover = false;
  arrowForward = 'assets/projects/arrow_forward.png';
  arrowOutward = 'assets/projects/arrow_outward.png';
  closeSmall = 'assets/projects/close_small.png';
  closeHover = 'assets/projects/close.png';

  constructor(public lang: LanguageService) {}

  localized(key: string): string {
    return key ? this.lang.t(key) : key;
  }

  iconFor(tech: string): string | undefined {
    const key = tech.toLowerCase();
    return PROJECT_ICONS[key];
  }
}
