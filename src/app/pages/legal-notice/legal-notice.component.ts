import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layout/header.component';
import { LanguageService } from '../../services/language.service';

const INFO_SECTION_KEYS = ['acceptance', 'scope', 'ownership', 'usage', 'external', 'disclaimer'];

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './legal-notice.component.html'
})
export class LegalNoticeComponent {
  readonly lastUpdated = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());

  infoKeys = INFO_SECTION_KEYS;

  constructor(public lang: LanguageService) {}
}
