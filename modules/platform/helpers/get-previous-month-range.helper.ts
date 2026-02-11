import moment from 'moment';
import { DateRange } from '../types';

export const getPreviousMonthRange = (currentDate: Date): DateRange => {
  const previousMonth = moment(currentDate).subtract(1, 'month');

  const startDate = previousMonth.clone().startOf('month').toDate();
  const endDate = previousMonth.clone().endOf('month').toDate();

  return {
    startDate,
    endDate,
  };
};
