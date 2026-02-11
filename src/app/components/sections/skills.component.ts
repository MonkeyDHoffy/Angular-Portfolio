import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { PageContainerComponent } from '../layout/page-container.component';
import { RoundedCardComponent } from '../ui/rounded-card.component';
import { SkillItemComponent } from '../ui/skill-item.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, PageContainerComponent, RoundedCardComponent, SkillItemComponent],
  templateUrl: './skills.component.html'
})
export class SkillsComponent {
  private router = inject(Router);

  constructor(public lang: LanguageService) {}

  skillItems = [
    { icon: 'assets/skills/html.png', label: 'HTML' },
    { icon: 'assets/skills/css.png', label: 'CSS' },
    { icon: 'assets/skills/javascript.png', label: 'JavaScript' },
    { icon: 'assets/skills/typescript.png', label: 'TypeScript' },
    { icon: 'assets/skills/angular.png', label: 'Angular' },
    { icon: 'assets/skills/react.png', label: 'React' },
    { icon: 'assets/skills/firebase.png', label: 'Firebase' },
    { icon: 'assets/skills/git.png', label: 'Git' },
    { icon: 'assets/skills/api.png', label: 'REST-API' },
    { icon: 'assets/skills/scrum.png', label: 'Scrum' },
    { icon: 'assets/skills/grow.png', label: 'Growth mindset', className: 'text-teal-400 cursor-pointer skill-pulse-scale', tooltip: 'I am learning: Python/Django' }
  ];

  goContact(): void {
    this.router.navigate(['/'], { fragment: 'contact' });
  }
}
