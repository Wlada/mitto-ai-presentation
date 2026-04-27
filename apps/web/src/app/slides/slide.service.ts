import { Injectable, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { SLIDES, SlideMeta } from './slide.config';

@Injectable({ providedIn: 'root' })
export class SlideService {
  private readonly router = inject(Router);

  readonly slides: readonly SlideMeta[] = SLIDES;
  readonly total = computed(() => this.slides.length);
  readonly currentIndex = signal<number>(0);
  readonly currentSlide = computed(() => this.slides[this.currentIndex()]);
  readonly currentNumber = computed(() => this.currentIndex() + 1);
  readonly canGoNext = computed(() => this.currentIndex() < this.total() - 1);
  readonly canGoPrev = computed(() => this.currentIndex() > 0);

  constructor() {
    this.syncFromUrl(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.syncFromUrl(e.urlAfterRedirects));
  }

  next(): void {
    if (this.canGoNext()) {
      this.goTo(this.currentNumber() + 1);
    }
  }

  previous(): void {
    if (this.canGoPrev()) {
      this.goTo(this.currentNumber() - 1);
    }
  }

  goTo(n: number): void {
    if (n < 1 || n > this.total()) {
      return;
    }
    const index = n - 1;
    this.currentIndex.set(index);
    this.router.navigate(['/slides', n]);
  }

  private syncFromUrl(url: string): void {
    const match = url.match(/\/slides\/(\d+)/);
    if (!match) {
      return;
    }
    const n = Number(match[1]);
    if (Number.isFinite(n) && n >= 1 && n <= this.total()) {
      this.currentIndex.set(n - 1);
    }
  }
}
