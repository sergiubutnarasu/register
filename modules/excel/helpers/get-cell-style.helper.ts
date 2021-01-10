import { Style } from 'exceljs';
import { Horizontal } from '../types';

export const getCellStyle = (
  horizontal: Horizontal = 'center',
): Partial<Style> => {
  return {
    font: {
      name: 'Times new Roman',
      family: 2,
      size: 12,
    },
    alignment: { horizontal, vertical: 'middle' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    },
  };
};
