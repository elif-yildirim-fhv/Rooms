// src/utils/dateUtils.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from './dateUtils';

describe('formatDate', () => {
  it('formats the date correctly in German locale', () => {
    const date = '2023-10-01T00:00:00Z';
    expect(formatDate(date)).toBe('1. Oktober 2023');
  });

  it('handles invalid date strings', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date');
  });
});