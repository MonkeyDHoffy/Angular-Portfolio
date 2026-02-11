import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

const DEFAULT_CURSOR_SIZE = 220;
const POINTER_CURSOR_SIZE = 320;

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('layoutRoot', { static: true }) layoutRef?: ElementRef<HTMLDivElement>;

  debugLayout = false;
  private activeTouchId: number | null = null;
  private pointerMode = false;
  private touchStartHandler?: (event: TouchEvent) => void;
  private touchMoveHandler?: (event: TouchEvent) => void;
  private touchEndHandler?: (event: TouchEvent) => void;

  ngAfterViewInit(): void {
    this.setCursorSize(DEFAULT_CURSOR_SIZE);

    const layoutEl = this.layoutRef?.nativeElement;
    if (!layoutEl) return;

    const prefersFinePointer = window.matchMedia
      ? window.matchMedia('(pointer: fine)').matches
      : true;

    layoutEl.style.setProperty('--cursor-opacity', prefersFinePointer ? '1' : '0');

    this.touchStartHandler = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      this.activeTouchId = touch.identifier;
      this.updateCursorFromTouch(touch);
    };

    this.touchMoveHandler = (event: TouchEvent) => {
      const tracked = this.getTrackedTouch(event.touches);
      if (!tracked) return;
      this.updateCursorFromTouch(tracked);
    };

    this.touchEndHandler = (event: TouchEvent) => {
      const touches = event.changedTouches;
      for (let i = 0; i < touches.length; i += 1) {
        if (touches[i].identifier === this.activeTouchId) {
          this.activeTouchId = null;
          this.setCursorVisibility(false);
          break;
        }
      }
    };

    window.addEventListener('touchstart', this.touchStartHandler, { passive: true });
    window.addEventListener('touchmove', this.touchMoveHandler, { passive: true });
    window.addEventListener('touchend', this.touchEndHandler, { passive: true });
    window.addEventListener('touchcancel', this.touchEndHandler, { passive: true });
  }

  ngOnDestroy(): void {
    window.removeEventListener('touchstart', this.touchStartHandler as EventListener);
    window.removeEventListener('touchmove', this.touchMoveHandler as EventListener);
    window.removeEventListener('touchend', this.touchEndHandler as EventListener);
    window.removeEventListener('touchcancel', this.touchEndHandler as EventListener);
  }

  onPointerMove(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.updatePointerModeFromTarget(event.target);
    this.updateCursorPosition(event.clientX, event.clientY);
    this.setCursorVisibility(true);
  }

  onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.updatePointerModeFromTarget(event.target);
    this.updateCursorPosition(event.clientX, event.clientY);
    this.setCursorVisibility(true);
  }

  onPointerUp(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.setCursorVisibility(false);
  }

  onPointerLeave(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.setPointerMode(false);
    this.setCursorVisibility(false);
  }

  private setCursorVisibility(visible: boolean): void {
    if (!this.layoutRef?.nativeElement) return;
    this.layoutRef.nativeElement.style.setProperty('--cursor-opacity', visible ? '1' : '0');
  }

  private setCursorSize(sizePx: number): void {
    if (!this.layoutRef?.nativeElement) return;
    this.layoutRef.nativeElement.style.setProperty('--cursor-size', `${sizePx}px`);
  }

  private setPointerMode(isPointer: boolean): void {
    if (this.pointerMode === isPointer) return;
    this.pointerMode = isPointer;
    this.setCursorSize(isPointer ? POINTER_CURSOR_SIZE : DEFAULT_CURSOR_SIZE);
  }

  private updatePointerModeFromTarget(target: EventTarget | null): void {
    if (typeof window === 'undefined') return;
    if (!(target instanceof Element)) {
      this.setPointerMode(false);
      return;
    }
    const cursorValue = window.getComputedStyle(target).cursor || '';
    this.setPointerMode(cursorValue.includes('pointer'));
  }

  private updateCursorPosition(x: number, y: number): void {
    if (!this.layoutRef?.nativeElement) return;
    this.layoutRef.nativeElement.style.setProperty('--x', `${x}px`);
    this.layoutRef.nativeElement.style.setProperty('--y', `${y}px`);
  }

  private updateCursorFromTouch(touch: Touch): void {
    this.updateCursorPosition(touch.clientX, touch.clientY);
    this.setCursorVisibility(true);
  }

  private getTrackedTouch(touchList: TouchList): Touch | null {
    if (!touchList || touchList.length === 0) return null;
    if (this.activeTouchId == null) return touchList[0];

    for (let i = 0; i < touchList.length; i += 1) {
      const touch = touchList[i];
      if (touch.identifier === this.activeTouchId) return touch;
    }
    return touchList[0];
  }
}
