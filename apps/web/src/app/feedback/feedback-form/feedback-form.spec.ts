import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { FeedbackService } from '../feedback.service';
import { FeedbackEntry } from '../feedback.types';
import { FeedbackForm } from './feedback-form';

describe('FeedbackForm', () => {
  let fixture: ComponentFixture<FeedbackForm>;
  let component: FeedbackForm;
  let serviceSubmit: ReturnType<typeof vi.fn>;
  let snackOpen: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    serviceSubmit = vi.fn();
    snackOpen = vi.fn();

    await TestBed.configureTestingModule({
      imports: [FeedbackForm],
      providers: [
        provideZonelessChangeDetection(),
        provideAnimationsAsync(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: FeedbackService, useValue: { submit: serviceSubmit } },
        { provide: MatSnackBar, useValue: { open: snackOpen } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  function getForm(): {
    name: string;
    type: 'question' | 'comment' | 'suggestion';
    message: string;
  } {
    return (component as unknown as { form: { getRawValue: () => any } }).form.getRawValue();
  }

  function setForm(values: Partial<{ name: string; message: string }>): void {
    const f = (component as unknown as { form: { patchValue: (v: any) => void } }).form;
    f.patchValue(values);
  }

  function callSubmit(): void {
    (component as unknown as { onSubmit: () => void }).onSubmit();
  }

  it('is invalid initially (message required)', () => {
    expect(getForm().message).toBe('');
    const valid = (component as unknown as { form: { valid: boolean } }).form.valid;
    expect(valid).toBe(false);
  });

  it('becomes valid after filling required fields', () => {
    setForm({ message: 'A real question' });
    const valid = (component as unknown as { form: { valid: boolean } }).form.valid;
    expect(valid).toBe(true);
  });

  it('does not call submit when form is invalid', () => {
    callSubmit();
    expect(serviceSubmit).not.toHaveBeenCalled();
  });

  it('calls service.submit and shows success snackbar on success', async () => {
    const entry: FeedbackEntry = {
      id: '1',
      type: 'question',
      message: 'hi',
      createdAt: new Date().toISOString(),
    };
    serviceSubmit.mockReturnValue(of(entry));
    setForm({ name: 'Vlad', message: 'hi' });

    callSubmit();
    await fixture.whenStable();

    expect(serviceSubmit).toHaveBeenCalledTimes(1);
    expect(serviceSubmit.mock.calls[0][0]).toMatchObject({
      type: 'question',
      message: 'hi',
      name: 'Vlad',
    });
    expect(snackOpen).toHaveBeenCalledWith(
      'Thanks for your feedback!',
      'Dismiss',
      expect.objectContaining({ duration: 3000 }),
    );
  });

  it('shows error snackbar on failure', async () => {
    serviceSubmit.mockReturnValue(
      throwError(() => ({ error: { error: { message: 'boom' } } })),
    );
    setForm({ message: 'fails' });

    callSubmit();
    await fixture.whenStable();

    expect(snackOpen).toHaveBeenCalled();
    expect(snackOpen.mock.calls[0][0]).toBe('boom');
  });

  it('omits name when blank', async () => {
    serviceSubmit.mockReturnValue(
      of({ id: '1', type: 'question', message: 'x', createdAt: '' }),
    );
    setForm({ name: '   ', message: 'x' });
    callSubmit();
    await fixture.whenStable();
    expect(serviceSubmit.mock.calls[0][0]).not.toHaveProperty('name');
  });
});
