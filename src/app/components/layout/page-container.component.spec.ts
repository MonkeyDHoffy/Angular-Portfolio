// Test für Page-Container-Komponente
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageContainerComponent } from './page-container.component';

describe('PageContainerComponent', () => {
  let component: PageContainerComponent;
  let fixture: ComponentFixture<PageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageContainerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
// Temporär entfernt, da keine Test-Runner-Typen installiert sind.
// Test-Datei geleert, um TS2593 zu vermeiden.
