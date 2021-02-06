import { getSession } from "next-auth/client";
import { DriveUtility } from "~/modules/drive";
import { exportExcel } from "../../modules/excel";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.json({ message: "bad request" });
    res.status(400);
    return;
  }

  const session = await getSession({ req });

  if (!session) {
    res.json({ message: "bad request" });
    res.status(400);
    return;
  }

  const { getConfigContent } = DriveUtility(session.accessToken);

  const result = await getConfigContent();

  const buffer = await exportExcel(result);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/vnd.openxmlformats");
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  return res.end(buffer);
};
