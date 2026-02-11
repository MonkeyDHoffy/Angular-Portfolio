import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: '**', redirectTo: '' }
];
