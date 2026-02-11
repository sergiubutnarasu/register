import { useState } from "react";
import { Company } from "~/modules/excel";
import useFetch from "./use-fetch.hook";

export const useDownloadExcel = () => {
  const [loading, setLoading] = useState(false);
  const { post } = useFetch();

  const download = async (company: Company, filename: string = "Report.xlsx") => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await post("/api/export", company);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(
        new Blob([blob], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } finally {
      setLoading(false);
    }
  };

  return {
    download,
    loading,
  };
};
