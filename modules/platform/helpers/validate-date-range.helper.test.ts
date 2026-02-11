import { validateDateRange } from './validate-date-range.helper';

describe('validateDateRange', () => {
  it('should return valid result when both dates are provided and startDate is before endDate', () => {
    const startDate = new Date('2026-01-01');
    const endDate = new Date('2026-01-31');

    const result = validateDateRange(startDate, endDate);

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBeUndefined();
  });

  it('should return valid result when startDate equals endDate', () => {
    const sameDate = new Date('2026-01-15');

    const result = validateDateRange(sameDate, sameDate);

    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBeUndefined();
  });

  it('should return invalid result when startDate is after endDate', () => {
    const startDate = new Date('2026-02-28');
    const endDate = new Date('2026-01-01');

    const result = validateDateRange(startDate, endDate);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Start date must be before or equal to end date');
  });

  it('should return invalid result when startDate is null', () => {
    const endDate = new Date('2026-01-31');

    const result = validateDateRange(null, endDate);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Both start and end dates must be provided');
  });

  it('should return invalid result when endDate is null', () => {
    const startDate = new Date('2026-01-01');

    const result = validateDateRange(startDate, null);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Both start and end dates must be provided');
  });

  it('should return invalid result when both dates are null', () => {
    const result = validateDateRange(null, null);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Both start and end dates must be provided');
  });

  it('should return invalid result when startDate is undefined', () => {
    const endDate = new Date('2026-01-31');

    const result = validateDateRange(undefined, endDate);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Both start and end dates must be provided');
  });

  it('should return invalid result when endDate is undefined', () => {
    const startDate = new Date('2026-01-01');

    const result = validateDateRange(startDate, undefined);

    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Both start and end dates must be provided');
  });
});
