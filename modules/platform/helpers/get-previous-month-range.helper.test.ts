import moment from 'moment';
import { getPreviousMonthRange } from './get-previous-month-range.helper';

describe('getPreviousMonthRange', () => {
  it('should calculate previous month range for middle of year', () => {
    // June 2026 - previous should be May 2026
    const currentDate = new Date('2026-06-15');
    const result = getPreviousMonthRange(currentDate);

    expect(result.startDate.getFullYear()).toBe(2026);
    expect(result.startDate.getMonth()).toBe(4); // May (0-indexed)
    expect(result.startDate.getDate()).toBe(1);

    expect(result.endDate.getFullYear()).toBe(2026);
    expect(result.endDate.getMonth()).toBe(4); // May
    expect(result.endDate.getDate()).toBe(31);
  });

  it('should calculate previous month range across year boundary', () => {
    // January 2026 - previous should be December 2025
    const currentDate = new Date('2026-01-15');
    const result = getPreviousMonthRange(currentDate);

    expect(result.startDate.getFullYear()).toBe(2025);
    expect(result.startDate.getMonth()).toBe(11); // December (0-indexed)
    expect(result.startDate.getDate()).toBe(1);

    expect(result.endDate.getFullYear()).toBe(2025);
    expect(result.endDate.getMonth()).toBe(11); // December
    expect(result.endDate.getDate()).toBe(31);
  });

  it('should verify first day is 1st of month', () => {
    const currentDate = new Date('2026-06-15');
    const result = getPreviousMonthRange(currentDate);

    expect(result.startDate.getDate()).toBe(1);
  });

  it('should verify last day is last day of month (28/29/30/31 depending on month)', () => {
    // February 2026 (non-leap year) - should be 28
    const februaryDate = new Date('2026-03-15');
    const februaryResult = getPreviousMonthRange(februaryDate);
    expect(februaryResult.endDate.getDate()).toBe(28);

    // April 2026 - should be 30
    const aprilDate = new Date('2026-05-15');
    const aprilResult = getPreviousMonthRange(aprilDate);
    expect(aprilResult.endDate.getDate()).toBe(30);

    // May 2026 - should be 31
    const mayDate = new Date('2026-06-15');
    const mayResult = getPreviousMonthRange(mayDate);
    expect(mayResult.endDate.getDate()).toBe(31);
  });

  it('should handle leap year February correctly', () => {
    // March 2024 (2024 is leap year) - previous should be Feb 2024 with 29 days
    const currentDate = new Date('2024-03-15');
    const result = getPreviousMonthRange(currentDate);

    expect(result.startDate.getMonth()).toBe(1); // February
    expect(result.startDate.getDate()).toBe(1);
    expect(result.endDate.getMonth()).toBe(1); // February
    expect(result.endDate.getDate()).toBe(29); // Leap year
  });

  it('should work correctly when called with moment.js', () => {
    const currentDate = new Date('2026-06-15');
    const result = getPreviousMonthRange(currentDate);

    // Verify it's using moment internally by checking dates are valid
    expect(moment(result.startDate).isValid()).toBe(true);
    expect(moment(result.endDate).isValid()).toBe(true);

    // Verify startDate is before endDate
    expect(result.startDate.getTime()).toBeLessThanOrEqual(result.endDate.getTime());
  });

  it('should return correct results for all months', () => {
    // Test a few months to ensure correctness
    const testCases = [
      { input: new Date('2026-01-15'), expectedMonth: 11, expectedYear: 2025, expectedLastDate: 31 }, // Dec 2025
      { input: new Date('2026-02-15'), expectedMonth: 0, expectedYear: 2026, expectedLastDate: 31 },  // Jan 2026
      { input: new Date('2026-03-15'), expectedMonth: 1, expectedYear: 2026, expectedLastDate: 28 },  // Feb 2026
      { input: new Date('2026-04-15'), expectedMonth: 2, expectedYear: 2026, expectedLastDate: 31 },  // Mar 2026
      { input: new Date('2026-07-15'), expectedMonth: 5, expectedYear: 2026, expectedLastDate: 30 },  // Jun 2026
    ];

    testCases.forEach(({ input, expectedMonth, expectedYear, expectedLastDate }) => {
      const result = getPreviousMonthRange(input);
      expect(result.startDate.getMonth()).toBe(expectedMonth);
      expect(result.startDate.getFullYear()).toBe(expectedYear);
      expect(result.startDate.getDate()).toBe(1);
      expect(result.endDate.getMonth()).toBe(expectedMonth);
      expect(result.endDate.getFullYear()).toBe(expectedYear);
      expect(result.endDate.getDate()).toBe(expectedLastDate);
    });
  });
});
