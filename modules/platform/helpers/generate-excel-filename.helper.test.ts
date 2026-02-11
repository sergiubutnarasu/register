import { generateExcelFilename } from './generate-excel-filename.helper';

describe('generateExcelFilename', () => {
  it('should return default filename when no date range is provided', () => {
    const result = generateExcelFilename();
    expect(result).toBe('Report.xlsx');
  });

  it('should return filename with date range when dateRange is provided', () => {
    const dateRange = {
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-01-31'),
    };

    const result = generateExcelFilename(dateRange);
    expect(result).toBe('Report_2026-01-01_to_2026-01-31.xlsx');
  });

  it('should format dates correctly in YYYY-MM-DD format', () => {
    const dateRange = {
      startDate: new Date('2026-02-08'),
      endDate: new Date('2026-02-28'),
    };

    const result = generateExcelFilename(dateRange);
    expect(result).toBe('Report_2026-02-08_to_2026-02-28.xlsx');
  });

  it('should handle single day date range', () => {
    const dateRange = {
      startDate: new Date('2026-01-15'),
      endDate: new Date('2026-01-15'),
    };

    const result = generateExcelFilename(dateRange);
    expect(result).toBe('Report_2026-01-15_to_2026-01-15.xlsx');
  });

  it('should handle different months', () => {
    const dateRange = {
      startDate: new Date('2026-12-01'),
      endDate: new Date('2026-12-31'),
    };

    const result = generateExcelFilename(dateRange);
    expect(result).toBe('Report_2026-12-01_to_2026-12-31.xlsx');
  });

  it('should handle date range across multiple months', () => {
    const dateRange = {
      startDate: new Date('2026-01-15'),
      endDate: new Date('2026-03-20'),
    };

    const result = generateExcelFilename(dateRange);
    expect(result).toBe('Report_2026-01-15_to_2026-03-20.xlsx');
  });
});
