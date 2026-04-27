import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { FeedbackEntry, FeedbackInput, FeedbackType } from './feedback.types';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/feedback';

  submit(input: FeedbackInput): Observable<FeedbackEntry> {
    return this.http.post<FeedbackEntry>(this.baseUrl, input);
  }

  list(type?: FeedbackType): Observable<FeedbackEntry[]> {
    const params = type ? new HttpParams().set('type', type) : undefined;
    return this.http.get<FeedbackEntry[]>(this.baseUrl, params ? { params } : {});
  }
}
