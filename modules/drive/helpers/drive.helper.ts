import { drive_v3, google } from "googleapis";
import { Company } from "~/modules/excel";

const DriveUtility = (accessToken: string) => {
  const getDrive = (): drive_v3.Drive => {
    const client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    });

    client.setCredentials({
      access_token: accessToken,
    });

    const drive = google.drive({ version: "v3", auth: client });

    return drive;
  };

  const getConfigFile = async (
    drive: drive_v3.Drive
  ): Promise<drive_v3.Schema$File> => {
    const result = new Promise<drive_v3.Schema$File>((resolve, reject) => {
      drive.files.list(
        {
          spaces: "appDataFolder",
          fields: "nextPageToken, files(id, name)",
          pageSize: 100,
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            const file = res?.data?.files?.[0];
            resolve(file);
          }
        }
      );
    });

    return await result;
  };

  const createConfigFile = async (
    drive: drive_v3.Drive,
    company: Company
  ): Promise<drive_v3.Schema$File> => {
    const result = new Promise<drive_v3.Schema$File>((resolve, reject) => {
      const fileMetadata = {
        name: "config.json",
        parents: ["appDataFolder"],
      };

      const media = {
        mimeType: "application/json",
        body: JSON.stringify(company),
      };

      drive.files.create(
        {
          resource: fileMetadata,
          media,
          fields: "id",
        },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.data);
          }
        }
      );
    });

    return await result;
  };

  const deleteConfigFile = async (drive: drive_v3.Drive): Promise<boolean> => {
    const result = new Promise<boolean>((resolve, reject) => {
      drive.files.list(
        {
          spaces: "appDataFolder",
          fields: "nextPageToken, files(id, name)",
          pageSize: 100,
        },
        async (err, res) => {
          if (err) {
            reject(err);
          } else {
            await Promise.all(
              res?.data?.files?.map(async ({ id }) => {
                await drive.files.delete({ fileId: id });
              })
            );

            resolve(true);
          }
        }
      );
    });

    return await result;
  };

  const getConfigFileId = async (
    drive: drive_v3.Drive
  ): Promise<string | undefined> => {
    let file = await getConfigFile(drive);

    if (file) {
      return file.id;
    }

    return undefined;
  };

  const getConfigContent = async (): Promise<Company> => {
    const drive = getDrive();
    const fileId = await getConfigFileId(drive);

    if (!fileId) {
      return undefined;
    }

    const file = await drive.files.get({
      fileId: fileId,
      alt: "media",
    });

    return file?.data as Company;
  };

  const saveConfigFile = async (company: Company) => {
    const drive = getDrive();
    await deleteConfigFile(drive);
    await createConfigFile(drive, company);
  };

  return { saveConfigFile, getConfigContent };
};

export default DriveUtility;
