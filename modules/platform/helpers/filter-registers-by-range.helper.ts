import moment from 'moment';
import { Register } from '~/modules/excel';
import { DateRange } from '../types';

export const filterRegistersByRange = (
  registers: Register[],
  dateRange: DateRange
): Register[] => {
  if (!registers || registers.length === 0) {
    return [];
  }

  return registers.filter(register => {
    // Handle null/undefined dates
    if (!register.date) {
      return false;
    }

    try {
      const registerDate = moment(register.date).startOf('day');
      return registerDate.isBetween(
        moment(dateRange.startDate).startOf('day'),
        moment(dateRange.endDate).endOf('day'),
        'day',
        '[]'
      );
    } catch {
      // If date parsing fails, filter out the register
      return false;
    }
  });
};
