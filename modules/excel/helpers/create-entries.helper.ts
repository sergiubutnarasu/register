import { Worksheet } from "exceljs";
import { roundNumber } from "~/modules/common";
import { DEFAULT_HEADER_ROWS } from "../config";
import { RegisterEntry } from "../types";
import { getCellStyle } from "./get-cell-style.helper";
import { setCellValue } from "./set-cell-value.helper";

export const createEntries = (
  worksheet: Worksheet,
  startIndex: number,
  entries?: RegisterEntry[]
) => {
  if (!entries?.length) {
    return;
  }

  entries.forEach(({ description, docNumber, annexNumber, value }, index) => {
    const rowNumber = DEFAULT_HEADER_ROWS + index + 1;

    worksheet.mergeCells(`D${rowNumber}:F${rowNumber}`);

    setCellValue(worksheet, `A${rowNumber}`, startIndex + index, {
      style: getCellStyle("right"),
    });

    setCellValue(worksheet, `B${rowNumber}`, docNumber, {
      style: getCellStyle("left"),
    });

    setCellValue(worksheet, `C${rowNumber}`, annexNumber, {
      style: getCellStyle("left"),
    });

    setCellValue(worksheet, `D${rowNumber}`, description);
    setCellValue(worksheet, `H${rowNumber}`, "lei");
    setCellValue(worksheet, `J${rowNumber}`, "lei");

    if (value > 0) {
      setCellValue(worksheet, `G${rowNumber}`, roundNumber(value), {
        style: getCellStyle("right"),
      });
    } else {
      setCellValue(worksheet, `I${rowNumber}`, roundNumber(value * -1), {
        style: getCellStyle("right"),
      });
    }
  });
};
