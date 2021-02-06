import { getSession } from "next-auth/client";
import { DriveUtility } from "~/modules/drive";
import { Company } from "../../modules/excel";

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

  const { saveConfigFile } = DriveUtility(session.accessToken);
  const company = req.body as Company;

  await saveConfigFile(company);

  res.statusCode = 200;
  return res.end();
};
