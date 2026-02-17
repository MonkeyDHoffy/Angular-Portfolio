import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layout/header.component';
import { FooterComponent } from '../../components/layout/footer.component';
import { LanguageService } from '../../services/language.service';

const PRIVACY_SECTION_KEYS = ['responsible', 'general', 'hosting', 'contact', 'googleFonts', 'cookies', 'rights', 'ssl', 'updated'];

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {
  readonly lastUpdated = '12.02.2026';
  sectionKeys = PRIVACY_SECTION_KEYS;

  constructor(public lang: LanguageService) {}
}
