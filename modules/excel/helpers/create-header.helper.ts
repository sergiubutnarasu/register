import { Worksheet } from "exceljs";
import { roundNumber } from "~/modules/common";
import { Register } from "../types";
import { createDateHeader } from "./create-date-header.helper";
import { getCellStyle } from "./get-cell-style.helper";
import { setCellValue } from "./set-cell-value.helper";

export const createHeader = (
  worksheet: Worksheet,
  companyName: string,
  initialValue: number,
  register: Register
) => {
  worksheet.mergeCells("A1:C1");
  worksheet.mergeCells("A2:C3");
  worksheet.mergeCells("D1:D3");
  worksheet.mergeCells("I1:J1");
  worksheet.mergeCells("I2:J3");
  worksheet.mergeCells("A4:J4");
  worksheet.mergeCells("D5:F5");
  worksheet.mergeCells("G5:H5");
  worksheet.mergeCells("I5:J5");
  worksheet.mergeCells("A6:F6");

  setCellValue(worksheet, "A1", companyName.toUpperCase());

  const colB = worksheet.getColumn("B");
  colB.width = 15;

  const colC = worksheet.getColumn("C");
  colC.width = 10;

  const colD = worksheet.getColumn("D");
  colD.width = 40;

  const colH = worksheet.getColumn("H");
  colH.width = 3;

  const colJ = worksheet.getColumn("J");
  colJ.width = 3;

  const row2 = worksheet.getRow(2);
  row2.height = 25;

  setCellValue(worksheet, "D1", "REGISTRU DE CASĂ", {
    font: {
      name: "Times new Roman",
      size: 20,
      bold: true,
    },
  });

  createDateHeader(worksheet, register.date);

  setCellValue(worksheet, "I1", "Cont casa");

  setCellValue(worksheet, "A5", "Nr. Crt.", {
    font: {
      name: "Times new Roman",
      size: 12,
      bold: true,
    },
  });

  setCellValue(worksheet, "B5", "Nr. Act casă", {
    font: {
      name: "Times new Roman",
      size: 12,
      bold: true,
    },
  });

  setCellValue(worksheet, "C5", "Nr. Anexă", {
    font: {
      name: "Times new Roman",
      size: 12,
      bold: true,
    },
  });

  setCellValue(worksheet, "D5", "Explicații", {
    font: {
      name: "Times new Roman",
      size: 12,
      bold: true,
    },
  });

  setCellValue(worksheet, "G5", "Încasări", {
    font: {
      name: "Times new Roman",
      size: 12,
      bold: true,
    },
  });

  setCellValue(worksheet, "I5", "Plăți", {
    font: {
      name: "Times new Roman",
      size: 12,
      bold: true,
    },
  });

  setCellValue(worksheet, "A6", "Report/sold ziua precedentă", {
    style: getCellStyle("left"),
  });

  const value = roundNumber(initialValue)

  if (initialValue > 0) {
    setCellValue(worksheet, "G6", value, {
      style: getCellStyle("right"),
    });
  } else {
    setCellValue(worksheet, "I6", value, {
      style: getCellStyle("right"),
    });
  }

  setCellValue(worksheet, "H6", "lei");
  setCellValue(worksheet, "J6", "lei");
};
