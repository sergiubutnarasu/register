import { Button } from "@solness/ui";
import React, { FunctionComponent } from "react";
import { Company } from "~/modules/excel";
import { useDownloadExcel } from "../../hooks";

export interface Props {
  company: Company;
}

const DownloadButton: FunctionComponent<Props> = ({ company }) => {
  const { download } = useDownloadExcel();

  const handleClick = () => {
    const items = company.registers?.map(({ date, entries }) => ({
      date,
      entries: entries?.map(
        ({ description, annexNumber, docNumber, value }) => ({
          description,
          annexNumber,
          docNumber,
          value: Number(value),
        })
      ),
    }));

    download({
      name: company.name,
      initialValue: company.initialValue,
      initialIndex: company.initialIndex,
      registers: items,
    });
  };

  return (
    <Button
      size="small"
      icon="download"
      iconPosition="right"
      onClick={handleClick}
    />
  );
};

export default DownloadButton;
