import { Worksheet } from 'exceljs';
import { setCellValue } from './set-cell-value.helper';

export const createDateHeader = (worksheet: Worksheet, date: Date) => {
  worksheet.mergeCells('E1:H1');
  worksheet.mergeCells('G2:H2');
  worksheet.mergeCells('G3:H3');

  setCellValue(worksheet, 'E1', 'Data');
  setCellValue(worksheet, 'E2', 'ziua');
  setCellValue(worksheet, 'F2', 'luna');
  setCellValue(worksheet, 'G2', 'anul');
  setCellValue(worksheet, 'E3', `${date.getDate()}`);
  setCellValue(worksheet, 'F3', `${date.getMonth() + 1}`);
  setCellValue(worksheet, 'G3', `${date.getFullYear()}`);
};
