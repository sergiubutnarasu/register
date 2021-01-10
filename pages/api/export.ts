import { Company, exportExcel } from "../../modules/excel";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.json({ message: "bad request" });
    res.status(400);
    return;
  }

  const company = req.body as Company;

  const buffer = await exportExcel(company);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/vnd.openxmlformats");
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  return res.end(buffer);
};
