import { randomUUID } from 'node:crypto';
import type { FeedbackEntry, FeedbackInput, FeedbackType } from '../types/feedback.js';

export class FeedbackService {
  private entries: FeedbackEntry[] = [];

  add(input: FeedbackInput): FeedbackEntry {
    const entry: FeedbackEntry = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    this.entries.push(entry);
    return entry;
  }

  list(filter?: { type?: FeedbackType }): FeedbackEntry[] {
    const filtered = filter?.type
      ? this.entries.filter((entry) => entry.type === filter.type)
      : [...this.entries];
    // ISO 8601 timestamps sort lexicographically; localeCompare keeps it terse.
    return filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  clear(): void {
    this.entries = [];
  }
}

export const feedbackService = new FeedbackService();
