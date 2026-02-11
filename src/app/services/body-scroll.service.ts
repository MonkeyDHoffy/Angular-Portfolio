import { Injectable } from '@angular/core';

interface LockOptions {
  preserveScroll?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BodyScrollService {
  private lockCount = 0;
  private preserveScroll = false;
  private scrollY = 0;
  private prevStyles: Partial<CSSStyleDeclaration> = {};

  lock(options: LockOptions = {}): void {
    this.lockCount += 1;
    if (this.lockCount > 1) return;

    this.preserveScroll = !!options.preserveScroll;
    this.scrollY = window.scrollY || window.pageYOffset || 0;
    const body = document.body;

    this.prevStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow
    };

    if (this.preserveScroll) {
      body.style.position = 'fixed';
      body.style.top = `-${this.scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'hidden';
    }
  }

  unlock(): void {
    if (this.lockCount === 0) return;
    this.lockCount -= 1;
    if (this.lockCount > 0) return;

    const body = document.body;
    body.style.position = this.prevStyles.position ?? '';
    body.style.top = this.prevStyles.top ?? '';
    body.style.left = this.prevStyles.left ?? '';
    body.style.right = this.prevStyles.right ?? '';
    body.style.width = this.prevStyles.width ?? '';
    body.style.overflow = this.prevStyles.overflow ?? '';

    if (this.preserveScroll) {
      const docEl = document.documentElement;
      const prevBehavior = docEl.style.scrollBehavior;
      try {
        docEl.style.scrollBehavior = 'auto';
      } catch {
        /* noop */
      }
      try {
        window.scrollTo({ top: this.scrollY, left: 0, behavior: 'auto' });
      } catch {
        window.scrollTo(0, this.scrollY);
      }
      try {
        docEl.style.scrollBehavior = prevBehavior || '';
      } catch {
        /* noop */
      }
    }
  }
}
