import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { PageContainerComponent } from '../layout/page-container.component';
import { FormFieldComponent } from '../ui/form-field.component';

const TOAST_DURATION = 4600;

type ToastType = 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  message: string;
  company: string;
}

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PageContainerComponent, FormFieldComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent implements OnDestroy {
  formData: FormState = this.createEmptyFormState();
  isSubmitting = false;
  notification: Toast | null = null;
  toastDuration = TOAST_DURATION;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(public lang: LanguageService) {}

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private createEmptyFormState(): FormState {
    return { name: '', email: '', message: '', company: '' };
  }

  private buildPayload(data: FormState) {
    return {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      company: ''
    };
  }

  private isHoneypotTriggered(company: string): boolean {
    return company.trim().length > 0;
  }

  private hasAllRequired(payload: { name: string; email: string; message: string }): boolean {
    return Boolean(payload.name && payload.email && payload.message);
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.isSubmitting = true;
    this.notification = null;

    if (this.isHoneypotTriggered(this.formData.company)) {
      this.isSubmitting = false;
      return;
    }

    const payload = this.buildPayload(this.formData);

    if (!this.hasAllRequired(payload)) {
      this.showNotification('error', this.lang.t('contact.form.error'));
      this.isSubmitting = false;
      return;
    }

    try {
      const response = await fetch('https://api.hoffja.de/api/send-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Request failed');
      this.showNotification('success', this.lang.t('contact.form.success'));
      this.formData = this.createEmptyFormState();
    } catch (err) {
      console.error('Contact form submission failed', err);
      this.showNotification('error', this.lang.t('contact.form.error'));
    } finally {
      this.isSubmitting = false;
    }
  }

  private showNotification(type: ToastType, message: string): void {
    this.notification = { id: Date.now(), type, message };
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => (this.notification = null), TOAST_DURATION);
  }

  dismiss(): void {
    this.notification = null;
    if (this.timer) clearTimeout(this.timer);
  }
}
