import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FeedbackService } from '../feedback.service';
import { FeedbackEntry } from '../feedback.types';
import { FeedbackList } from './feedback-list';

describe('FeedbackList', () => {
  let fixture: ComponentFixture<FeedbackList>;
  let component: FeedbackList;
  let serviceList: ReturnType<typeof vi.fn>;

  const sample: FeedbackEntry[] = [
    {
      id: '1',
      type: 'question',
      message: 'How does it scale?',
      name: 'Alice',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'comment',
      message: 'Nice talk',
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
  ];

  async function setup(initial: FeedbackEntry[]): Promise<void> {
    serviceList = vi.fn().mockReturnValue(of(initial));
    await TestBed.configureTestingModule({
      imports: [FeedbackList],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimationsAsync(),
        { provide: FeedbackService, useValue: { list: serviceList } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(() => {
    TestBed.resetTestingModule();
  });

  it('renders entries from the signal', async () => {
    await setup(sample);
    const el = fixture.nativeElement as HTMLElement;
    const cards = el.querySelectorAll('mat-card');
    expect(cards.length).toBe(2);
    expect(el.textContent).toContain('Alice');
    expect(el.textContent).toContain('How does it scale?');
    expect(el.textContent).toContain('Anonymous');
  });

  it('shows empty state when no entries', async () => {
    await setup([]);
    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('No feedback yet');
  });

  it('filter change calls service with type', async () => {
    await setup(sample);
    serviceList.mockClear();
    serviceList.mockReturnValue(of([sample[0]]));

    (component as unknown as { onFilter: (v: any) => void }).onFilter('question');
    await fixture.whenStable();

    expect(serviceList).toHaveBeenCalledWith('question');
    const filter = (component as unknown as { filter: () => unknown }).filter();
    expect(filter).toBe('question');
  });

  it('formats relative time', async () => {
    await setup([]);
    const fn = (component as unknown as { relativeTime: (s: string) => string }).relativeTime.bind(
      component,
    );
    expect(fn(new Date().toISOString())).toMatch(/just now|seconds ago/);
    expect(fn(new Date(Date.now() - 2 * 60 * 1000).toISOString())).toContain('2 minutes ago');
    expect(fn(new Date(Date.now() - 60 * 60 * 1000).toISOString())).toContain('1 hour ago');
    expect(fn('not-a-date')).toBe('');
  });
});
