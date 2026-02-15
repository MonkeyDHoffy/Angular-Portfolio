import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import AOS from 'aos';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  // styleUrls entfernt, da keine CSS-Datei vorhanden
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private routerSub = new Subscription();

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    AOS.init({
      duration: 700,
      easing: 'ease-out',
      once: true,
      offset: 80,
      disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });

    this.routerSub.add(
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
        setTimeout(() => AOS.refreshHard(), 50);
      })
    );

    setTimeout(() => AOS.refreshHard(), 50);
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }
}
