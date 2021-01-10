import { Worksheet } from 'exceljs';
import { COLUMNS } from '../config';
import { getCellStyle } from './get-cell-style.helper';

export const setDefaultStyle = (worksheet: Worksheet, rows: number) => {
  COLUMNS.forEach((column) => {
    for (let i = 0; i < rows; i++) {
      const cell = worksheet.getCell(`${column}${i + 1}`);
      cell.style = getCellStyle();
    }
  });
};
