import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { PageContainerComponent } from '../layout/page-container.component';
import { FormFieldComponent } from '../ui/form-field.component';

const TOAST_DURATION = 4600;

type ToastType = 'success' | 'error';
type FieldName = 'name' | 'email' | 'message' | 'privacy';

interface FormState {
  name: string;
  email: string;
  message: string;
  company: string;
  privacyAccepted: boolean;
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
  submitAttempted = false;
  formErrors: Partial<Record<FieldName, string>> = {};
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(public lang: LanguageService) {}

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private createEmptyFormState(): FormState {
    return { name: '', email: '', message: '', company: '', privacyAccepted: false };
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

  private isValidEmail(email: string): boolean {
    // Strict email validation:
    // - Local part: anything except spaces and @
    // - @ symbol required
    // - Domain: must start with alphanumeric, can contain hyphens in middle
    // - TLD: dot followed by at least 2 letters
    // Rejects: jannik@.de.de, test@de, blabla@.de, test@domain (no TLD)
    return /^[^\s@]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(email);
  }

  onFieldInput(field: FieldName, value: string): void {
    this.formData = { ...this.formData, [field]: value };
    // For email, validate in real-time to show format errors immediately
    if (field === 'email') {
      this.validateField(field);
    } else if (this.submitAttempted || this.formErrors[field]) {
      this.validateField(field);
    }
  }

  onPrivacyChange(value: boolean): void {
    this.formData = { ...this.formData, privacyAccepted: value };
    if (this.submitAttempted || this.formErrors.privacy) {
      this.validateField('privacy');
    }
  }

  validateField(field: FieldName): void {
    const payload = this.buildPayload(this.formData);
    if (field === 'name') {
      this.formErrors.name = payload.name
        ? ''
        : this.lang.t('contact.form.name_required');
      return;
    }
    if (field === 'email') {
      if (!payload.email) {
        this.formErrors.email = this.lang.t('contact.form.email_required');
        return;
      }
      this.formErrors.email = this.isValidEmail(payload.email)
        ? ''
        : this.lang.t('contact.form.email_invalid');
      return;
    }
    if (field === 'message') {
      this.formErrors.message = payload.message
        ? ''
        : this.lang.t('contact.form.message_required');
      return;
    }
    if (field === 'privacy') {
      this.formErrors.privacy = this.formData.privacyAccepted
        ? ''
        : this.lang.t('contact.form.privacy_required');
    }
  }

  private validateAll(): boolean {
    this.validateField('name');
    this.validateField('email');
    this.validateField('message');
    this.validateField('privacy');
    return (
      !this.formErrors.name &&
      !this.formErrors.email &&
      !this.formErrors.message &&
      !this.formErrors.privacy
    );
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.isSubmitting = true;
    this.notification = null;
    this.submitAttempted = true;

    if (this.isHoneypotTriggered(this.formData.company)) {
      this.isSubmitting = false;
      return;
    }

    const payload = this.buildPayload(this.formData);
    const isValid = this.validateAll();

    if (!isValid) {
      this.showNotification('error', this.lang.t('contact.form.form_invalid'));
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
      this.formErrors = {};
      this.submitAttempted = false;
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
