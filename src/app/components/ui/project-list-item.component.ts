import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactPopupComponent } from './contact-popup.component';

@Component({
  selector: 'app-project-list-item',
  standalone: true,
  imports: [CommonModule, ContactPopupComponent],
  template: `
    <div class="relative group">
      <div
        class="flex flex-col md:flex-row gap-2 md:gap-0 font-firacode items-start md:items-center justify-between px-8 py-10 border-b border-secondary hover:bg-background-greencontainer cursor-pointer transition-colors duration-300"
        [ngClass]="className"
        (click)="onClick.emit()"
      >
        <h3 class="text-xl font-semibold tracking-wide">{{ title }}</h3>
        <span class="text-sm text-primary mt-2 md:mt-0">
          <ng-container *ngFor="let seg of stackSegments; let i = index">
            <span *ngIf="i > 0" class="text-secondary">|</span>
            {{ ' ' + seg + ' ' }}
          </ng-container>
        </span>
      </div>
      <div class="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <app-contact-popup [img]="previewImg" [alt]="previewAlt"></app-contact-popup>
      </div>
    </div>
  `
})
export class ProjectListItemComponent {
  @Input() className = '';
  @Input() title = '';
  @Input() stackSegments: string[] = [];
  @Input() previewImg?: string;
  @Input() previewAlt: string = '';
  @Output() onClick = new EventEmitter<void>();
}
