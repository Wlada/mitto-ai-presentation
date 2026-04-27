import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { SlideService } from './slide.service';
import { SLIDES } from './slide.config';

describe('SlideService', () => {
  let service: SlideService;
  let router: Router;
  let navigateSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });
    service = TestBed.inject(SlideService);
    router = TestBed.inject(Router);
    navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    service.currentIndex.set(0);
  });

  it('starts at index 0', () => {
    expect(service.currentIndex()).toBe(0);
    expect(service.currentNumber()).toBe(1);
    expect(service.currentSlide()).toBe(SLIDES[0]);
  });

  it('reports total slide count', () => {
    expect(service.total()).toBe(SLIDES.length);
  });

  it('next() increments currentIndex', () => {
    service.next();
    expect(service.currentIndex()).toBe(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/slides', 2]);
  });

  it('previous() decrements currentIndex', () => {
    service.goTo(3);
    service.previous();
    expect(service.currentIndex()).toBe(1);
  });

  it('goTo(5) sets index to 4', () => {
    service.goTo(5);
    expect(service.currentIndex()).toBe(4);
    expect(service.currentNumber()).toBe(5);
    expect(navigateSpy).toHaveBeenCalledWith(['/slides', 5]);
  });

  it('canGoPrev is false at the first slide', () => {
    expect(service.canGoPrev()).toBe(false);
    expect(service.canGoNext()).toBe(true);
  });

  it('canGoNext is false at the last slide', () => {
    service.goTo(SLIDES.length);
    expect(service.canGoNext()).toBe(false);
    expect(service.canGoPrev()).toBe(true);
  });

  it('next() at the last slide does not advance', () => {
    service.goTo(SLIDES.length);
    navigateSpy.mockClear();
    service.next();
    expect(service.currentIndex()).toBe(SLIDES.length - 1);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('previous() at the first slide does not retreat', () => {
    navigateSpy.mockClear();
    service.previous();
    expect(service.currentIndex()).toBe(0);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('goTo() ignores out-of-range numbers', () => {
    service.goTo(0);
    expect(service.currentIndex()).toBe(0);
    service.goTo(SLIDES.length + 1);
    expect(service.currentIndex()).toBe(0);
  });
});
