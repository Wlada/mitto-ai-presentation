import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FeedbackService } from '../feedback.service';
import { FEEDBACK_TYPES, FeedbackInput, FeedbackType } from '../feedback.types';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <form class="feedback-form" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
      <h2 class="form-title">Share your feedback</h2>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Name (optional)</mat-label>
        <input matInput formControlName="name" maxlength="50" autocomplete="off" />
        <mat-hint align="end">{{ form.controls.name.value.length }} / 50</mat-hint>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Type</mat-label>
        <mat-select formControlName="type" required>
          @for (t of types; track t) {
            <mat-option [value]="t">{{ t }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Message</mat-label>
        <textarea
          matInput
          formControlName="message"
          rows="4"
          maxlength="500"
          required
        ></textarea>
        <mat-hint align="end">{{ form.controls.message.value.length }} / 500</mat-hint>
        @if (form.controls.message.touched && form.controls.message.errors?.['required']) {
          <mat-error>Message is required</mat-error>
        }
      </mat-form-field>

      <div class="actions">
        <button
          mat-flat-button
          color="primary"
          type="submit"
          [disabled]="form.invalid || submitting()"
        >
          <mat-icon>send</mat-icon>
          <span>{{ submitting() ? 'Submitting…' : 'Submit' }}</span>
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .feedback-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 24px;
        border: 1px solid var(--mitto-divider);
        border-radius: 8px;
        background: var(--mitto-surface);
      }
      .form-title {
        margin: 0 0 8px;
        font-size: 18px;
        font-weight: 600;
        color: var(--mitto-fg);
      }
      .full {
        width: 100%;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
      }
      mat-icon {
        margin-right: 6px;
      }
    `,
  ],
})
export class FeedbackForm {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(FeedbackService);
  private readonly snack = inject(MatSnackBar);

  protected readonly types = FEEDBACK_TYPES;
  protected readonly submitting = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.maxLength(50)]],
    type: ['question' as FeedbackType, [Validators.required]],
    message: ['', [Validators.required, Validators.maxLength(500)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid || this.submitting()) {
      return;
    }
    this.submitting.set(true);
    this.form.disable({ emitEvent: false });

    const raw = this.form.getRawValue();
    const input: FeedbackInput = {
      type: raw.type,
      message: raw.message.trim(),
      ...(raw.name?.trim() ? { name: raw.name.trim() } : {}),
    };

    this.service.submit(input).subscribe({
      next: () => {
        this.snack.open('Thanks for your feedback!', 'Dismiss', { duration: 3000 });
        this.form.reset({ name: '', type: 'question', message: '' });
        this.form.enable({ emitEvent: false });
        this.submitting.set(false);
      },
      error: (err: HttpErrorResponse) => {
        const msg = err?.error?.error?.message ?? 'Could not submit feedback. Please try again.';
        this.snack.open(msg, 'Dismiss', { duration: 4000 });
        this.form.enable({ emitEvent: false });
        this.submitting.set(false);
      },
    });
  }
}
