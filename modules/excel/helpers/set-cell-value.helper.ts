import { Worksheet } from 'exceljs';
import { CellOptions } from '../types';

export const setCellValue = (
  worksheet: Worksheet,
  cellIndex: string,
  value: string | number,
  options?: CellOptions,
) => {
  const cell = worksheet.getCell(cellIndex);
  cell.value = value;

  if (options?.style) {
    cell.style = options.style;
  }

  if (options?.font) {
    cell.font = options.font;
  }
};
