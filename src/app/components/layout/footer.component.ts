import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageContainerComponent } from './page-container.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, PageContainerComponent],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  logo = 'assets/headerpics/JHOFF.png';

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
