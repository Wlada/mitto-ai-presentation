import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { describe, it, expect, beforeEach } from 'vitest';

import { SlideLayout } from './slide-layout';
import { SlideService } from '../slide.service';

describe('SlideLayout', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideLayout],
      providers: [provideRouter([]), provideAnimationsAsync()],
    }).compileComponents();
  });

  it('instantiates', () => {
    const fixture = TestBed.createComponent(SlideLayout);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the brand and slide counter', async () => {
    const fixture = TestBed.createComponent(SlideLayout);
    const slides = TestBed.inject(SlideService);
    slides.currentIndex.set(0);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.brand img')?.getAttribute('alt')).toBe('Mitto');
    expect(el.querySelector('.counter')?.textContent).toMatch(/^1\s*\/\s*\d+$/);
  });

  it('disables the previous button at the first slide', async () => {
    const fixture = TestBed.createComponent(SlideLayout);
    const slides = TestBed.inject(SlideService);
    slides.currentIndex.set(0);
    fixture.detectChanges();
    await fixture.whenStable();

    const el = fixture.nativeElement as HTMLElement;
    const buttons = el.querySelectorAll('button[mat-icon-button], button[aria-label]');
    const prev = Array.from(buttons).find(
      (b) => b.getAttribute('aria-label') === 'Previous slide',
    ) as HTMLButtonElement | undefined;
    expect(prev).toBeTruthy();
    expect(prev?.disabled).toBe(true);
  });
});
