import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlowBackgroundComponent } from '../../components/layout/glow-background.component';
import { FooterComponent } from '../../components/layout/footer.component';
import { HeroComponent } from '../../components/sections/hero.component';
import { AboutComponent } from '../../components/sections/about.component';
import { SkillsComponent } from '../../components/sections/skills.component';
import { ProjectsComponent } from '../../components/sections/projects.component';
import { GalleryComponent } from '../../components/sections/gallery.component';
import { ContactComponent } from '../../components/sections/contact.component';
import { RunnerComponent } from '../../components/sections/runner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, GlowBackgroundComponent, AboutComponent, SkillsComponent, ProjectsComponent, GalleryComponent, ContactComponent, RunnerComponent, FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
