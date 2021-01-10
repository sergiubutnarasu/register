import { Worksheet } from "exceljs";
import { roundNumber } from "~/modules/common";
import { Register } from "../types";
import {
  entriesSum,
  negativeEntriesSum,
  positiveEntriesSum,
} from "./entries-sum.helper";
import { getCellStyle } from "./get-cell-style.helper";
import { setCellValue } from "./set-cell-value.helper";

export const createFooter = (
  worksheet: Worksheet,
  index: number,
  initialValue: number,
  register: Register
) => {
  worksheet.mergeCells(`A${index}:F${index}`);
  worksheet.mergeCells(`A${index + 1}:F${index + 1}`);
  worksheet.mergeCells(`A${index + 2}:F${index + 2}`);
  worksheet.mergeCells(`A${index + 3}:D${index + 3}`);
  worksheet.mergeCells(`E${index + 3}:J${index + 3}`);
  worksheet.mergeCells(`A${index + 4}:J${index + 5}`);

  const hasEntries = Boolean(register.entries?.length);
  const todayAmount = hasEntries ? entriesSum(register.entries) : 0;
  const finalAmount = initialValue + todayAmount;

  const positiveAmount = hasEntries
    ? roundNumber(positiveEntriesSum(register.entries))
    : "";
  const negativeAmount = hasEntries
    ? roundNumber(negativeEntriesSum(register.entries) * -1)
    : "";

  setCellValue(worksheet, `A${index}`, "Rulaj zi", {
    style: getCellStyle("right"),
  });

  setCellValue(worksheet, `H${index}`, "lei");
  setCellValue(worksheet, `J${index}`, "lei");

  setCellValue(worksheet, `G${index}`, positiveAmount, {
    style: getCellStyle("right"),
  });

  setCellValue(worksheet, `I${index}`, negativeAmount, {
    style: getCellStyle("right"),
  });

  setCellValue(worksheet, `A${index + 1}`, "Sold final zi", {
    style: getCellStyle("right"),
  });

  if (finalAmount > 0) {
    setCellValue(worksheet, `G${index + 1}`, roundNumber(finalAmount), {
      style: getCellStyle("right"),
    });
  } else {
    setCellValue(worksheet, `I${index + 1}`, roundNumber(finalAmount), {
      style: getCellStyle("right"),
    });
  }

  setCellValue(worksheet, `H${index + 1}`, "lei");
  setCellValue(worksheet, `J${index + 1}`, "lei");

  setCellValue(worksheet, `A${index + 2}`, "De reportat pagina / TOTAL", {
    style: getCellStyle("left"),
  });

  setCellValue(worksheet, `A${index + 3}`, "Casier");
  setCellValue(worksheet, `E${index + 3}`, "Compartiment financiar-contabil,");
};
