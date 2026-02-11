import moment from 'moment';
import { filterRegistersByRange } from './filter-registers-by-range.helper';
import { Register } from '~/modules/excel';

describe('filterRegistersByRange', () => {
  const createRegister = (date: Date): Register => ({
    date,
    entries: [],
  });

  it('should filter registers within date range', () => {
    const registers = [
      createRegister(new Date('2026-01-10')),
      createRegister(new Date('2026-01-15')),
      createRegister(new Date('2026-01-20')),
      createRegister(new Date('2026-02-05')),
    ];

    const result = filterRegistersByRange(
      registers,
      {
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-31'),
      }
    );

    expect(result).toHaveLength(3);
    expect(result[0].date.toISOString()).toBe(new Date('2026-01-10').toISOString());
    expect(result[1].date.toISOString()).toBe(new Date('2026-01-15').toISOString());
    expect(result[2].date.toISOString()).toBe(new Date('2026-01-20').toISOString());
  });

  it('should handle empty arrays', () => {
    const result = filterRegistersByRange(
      [],
      {
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-31'),
      }
    );

    expect(result).toEqual([]);
  });

  it('should handle null/undefined dates in registers gracefully', () => {
    const registers = [
      { date: null as any, entries: [] },
      createRegister(new Date('2026-01-15')),
    ];

    const result = filterRegistersByRange(
      registers,
      {
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-31'),
      }
    );

    // Should filter out invalid dates and return only valid ones
    expect(result).toHaveLength(1);
    expect(result[0].date.toISOString()).toBe(new Date('2026-01-15').toISOString());
  });

  it('should handle single-day range', () => {
    const registers = [
      createRegister(new Date('2026-01-15')),
      createRegister(new Date('2026-01-16')),
    ];

    const result = filterRegistersByRange(
      registers,
      {
        startDate: new Date('2026-01-15'),
        endDate: new Date('2026-01-15'),
      }
    );

    expect(result).toHaveLength(1);
    expect(result[0].date.toISOString()).toBe(new Date('2026-01-15').toISOString());
  });

  it('should include registers exactly on boundary dates (inclusive)', () => {
    const registers = [
      createRegister(new Date('2026-01-01')),
      createRegister(new Date('2026-01-15')),
      createRegister(new Date('2026-01-31')),
    ];

    const result = filterRegistersByRange(
      registers,
      {
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-31'),
      }
    );

    expect(result).toHaveLength(3);
  });

  it('should work with moment compatibility with Date objects', () => {
    const registerDate = new Date('2026-01-15');
    const registers = [createRegister(registerDate)];

    const result = filterRegistersByRange(
      registers,
      {
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-01-31'),
      }
    );

    expect(result).toHaveLength(1);
    // Verify it's using moment internally by checking it handles date correctly
    expect(moment(result[0].date).isBetween(
      moment(new Date('2026-01-01')),
      moment(new Date('2026-01-31')),
      'day',
      '[]'
    )).toBe(true);
  });
});
