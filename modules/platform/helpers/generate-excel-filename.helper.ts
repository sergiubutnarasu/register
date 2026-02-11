import moment from 'moment';
import { DateRange } from '../types';

export const generateExcelFilename = (dateRange?: DateRange): string => {
  if (!dateRange) {
    return 'Report.xlsx';
  }

  const startDateFormatted = moment(dateRange.startDate).format('YYYY-MM-DD');
  const endDateFormatted = moment(dateRange.endDate).format('YYYY-MM-DD');

  return `Report_${startDateFormatted}_to_${endDateFormatted}.xlsx`;
};
