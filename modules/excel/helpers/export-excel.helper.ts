import { Workbook } from "exceljs";
import { getSum } from "~/modules/common";
import { DEFAULT_HEADER_ROWS, DEFAULT_ROWS_NUMBER } from "../config";
import { Company } from "../types";
import { createEntries } from "./create-entries.helper";
import { createFooter } from "./create-footer.helper";
import { createHeader } from "./create-header.helper";
import { setDefaultStyle } from "./set-default-style.helper";

export const exportExcel = async (company: Company) => {
  const workbook = new Workbook();

  let initialValue = +company.initialValue;
  let initialIndex = +company.initialIndex;

  company.registers?.forEach((register, index) => {
    register.date = new Date(register.date);

    const worksheetName = `${index + 1}. ${register.date.getFullYear()}-${(
      register.date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${register.date
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    const worksheet = workbook.addWorksheet(worksheetName, {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    const entriesCount = register.entries?.length || 0;
    const rows = DEFAULT_ROWS_NUMBER + entriesCount;
    const footerStartRow = DEFAULT_HEADER_ROWS + entriesCount + 1;

    initialIndex += index > 0 ? company.registers[index - 1].entries.length : 0;

    initialValue +=
      index > 0 ? getSum(company.registers[index - 1].entries) : 0;

    setDefaultStyle(worksheet, rows);

    createHeader(worksheet, company.name, initialValue, register);
    createEntries(worksheet, initialIndex, register.entries);
    createFooter(worksheet, footerStartRow, initialValue, register);
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return buffer;
};
