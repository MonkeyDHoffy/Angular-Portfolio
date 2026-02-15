import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { BodyScrollService } from '../../services/body-scroll.service';
import { PageContainerComponent } from '../layout/page-container.component';
import { ProjectListItemComponent } from '../ui/project-list-item.component';
import { ProjectSlideComponent } from './project-slide.component';

interface ProjectConfig {
  index: string;
  titleKey: string;
  questionKey: string;
  descriptionKey: string;
  techStack: string[];
  imageSrc: string;
  imageAlt: string;
  primaryActions: Array<{ label: string; href: string; variant: 'primary' | 'secondary' } >;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, PageContainerComponent, ProjectListItemComponent, ProjectSlideComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {
  active: keyof typeof this.projectsMap | null = null;

  projectsMap: Record<string, ProjectConfig> = {
    join: {
      index: '01',
      titleKey: 'projectDetails.p1.title',
      questionKey: 'projectDetails.p1.question',
      descriptionKey: 'projectDetails.p1.description',
      techStack: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      imageSrc: 'assets/projects/join.png',
      imageAlt: 'Join project screenshot',
      primaryActions: [
        { label: 'projects.liveDemo', href: 'https://join.hoffja.de', variant: 'primary' },
        { label: 'projects.github', href: 'https://github.com/MonkeyDHoffy/Join-a-project-management-tool', variant: 'secondary' }
      ]
    },
    pollo: {
      index: '02',
      titleKey: 'projectDetails.p2.title',
      questionKey: 'projectDetails.p2.question',
      descriptionKey: 'projectDetails.p2.description',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      imageSrc: 'assets/projects/pollo.png',
      imageAlt: 'El Pollo Loco game screenshot',
      primaryActions: [
        { label: 'projects.liveDemo', href: 'https://pollo.hoffja.de', variant: 'primary' },
        { label: 'projects.github', href: 'https://github.com/MonkeyDHoffy/El-Pollo-Loco', variant: 'secondary' }
      ]
    },
    // bubble: {
    //   index: '03',
    //   titleKey: 'projectDetails.p3.title',
    //   questionKey: 'projectDetails.p3.question',
    //   descriptionKey: 'projectDetails.p3.description',
    //   techStack: ['JavaScript', 'HTML', 'CSS'],
    //   imageSrc: 'assets/projects/bubble.png',
    //   imageAlt: 'DA Bubble chat app screenshot',
    //   primaryActions: [
    //     { label: 'projects.liveDemo', href: 'https://pokedex.hoffja.de', variant: 'primary' },
    //     { label: 'projects.github', href: 'https://github.com/MonkeyDHoffy/Pok-dex', variant: 'secondary' }
    //   ]
    // }
  };

  order: Array<keyof typeof this.projectsMap> = ['join', 'pollo' /*, 'bubble'*/];

  constructor(public lang: LanguageService, private bodyScroll: BodyScrollService) {}

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.active) this.closeProject();
  }

  openProject(key: keyof typeof this.projectsMap): void {
    this.active = key;
    this.bodyScroll.lock({ preserveScroll: true });
  }

  closeProject(): void {
    this.active = null;
    this.bodyScroll.unlock();
  }

  goNext(): void {
    if (!this.active) return;
    const i = this.order.indexOf(this.active);
    const next = this.order[(i + 1) % this.order.length];
    this.active = next;
  }
}
