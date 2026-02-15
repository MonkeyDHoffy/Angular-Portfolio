import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <label class="font-firacode block text-secondary text-sm mb-2" [attr.for]="inputId">{{ label }}</label>
      <ng-container *ngIf="textarea; else inputField">
        <textarea
          [rows]="rows"
          class="font-karla w-full bg-transparent border-b outline-none py-2 text-white placeholder-gray-500 hover:placeholder-white transition-colors resize-none"
          [ngClass]="invalid ? 'border-red-400 focus:border-red-400' : 'border-secondary focus:border-secondary'"
          [name]="name"
          [placeholder]="placeholder"
          [required]="required"
          [ngModel]="model"
          (ngModelChange)="onModelChange($event)"
          (blur)="fieldBlur.emit()"
          [id]="inputId"
          [attr.aria-invalid]="invalid"
          [attr.aria-describedby]="describedBy"
          [attr.autocomplete]="autocomplete"
        ></textarea>
      </ng-container>
      <ng-template #inputField>
        <input
          [type]="type"
          class="font-karla w-full bg-transparent border-b outline-none py-2 text-white placeholder-gray-500 hover:placeholder-white transition-colors"
          [ngClass]="invalid ? 'border-red-400 focus:border-red-400' : 'border-secondary focus:border-secondary'"
          [name]="name"
          [placeholder]="placeholder"
          [required]="required"
          [ngModel]="model"
          (ngModelChange)="onModelChange($event)"
          (blur)="fieldBlur.emit()"
          [id]="inputId"
          [attr.aria-invalid]="invalid"
          [attr.aria-describedby]="describedBy"
          [attr.autocomplete]="autocomplete"
        />
      </ng-template>
    </div>
  `
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() type = 'text';
  @Input() textarea = false;
  @Input() rows = 3;
  @Input() name = '';
  @Input() inputId = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() autocomplete?: string;
  @Input() invalid = false;
  @Input() describedBy: string | null = null;
  @Input() model = '';

  @Output() modelChange = new EventEmitter<string>();
  @Output() fieldBlur = new EventEmitter<void>();

  onModelChange(value: string): void {
    this.model = value;
    this.modelChange.emit(value);
  }
}
