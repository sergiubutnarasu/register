import { Button } from "@solness/ui";
import React, { FunctionComponent, useState } from "react";
import { Company } from "~/modules/excel";
import { useDownloadExcel } from "../../hooks";
import {
  filterRegistersByRange,
  generateExcelFilename,
  getPreviousRegister,
} from "../../helpers";
import DownloadIntervalModal from "../download-interval-modal";
import { DateRange } from "../../types";

export interface Props {
  company: Company;
}

const DownloadButton: FunctionComponent<Props> = ({ company }) => {
  const { download, loading } = useDownloadExcel();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const transformRegistersData = () => {
    return company.registers?.map(({ date, entries }) => ({
      date,
      entries: entries?.map(
        ({ description, annexNumber, docNumber, value }) => ({
          description,
          annexNumber,
          docNumber,
          value: Number(value),
        }),
      ),
    }));
  };

  const handleDownloadAll = () => {
    const items = transformRegistersData();

    download({
      name: company.name,
      initialValue: company.initialValue,
      initialIndex: company.initialIndex,
      registers: items,
    });
  };

  const handleDownloadFiltered = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = (dateRange: DateRange) => {
    // Filter registers by date range
    const filteredRegisters = filterRegistersByRange(
      company.registers || [],
      dateRange,
    );

    // Transform the filtered registers
    const transformedRegisters = filteredRegisters.map(({ date, entries }) => ({
      date,
      entries: entries?.map(
        ({ description, annexNumber, docNumber, value }) => ({
          description,
          annexNumber,
          docNumber,
          value: Number(value),
        }),
      ),
    }));

    // Generate filename with date range
    const filename = generateExcelFilename(dateRange);

    // Calculate initial value and index based on data before the filtered range
    const { lastIndex, totalValue } = getPreviousRegister(
      company.registers || [],
      dateRange.startDate,
    );

    const initialValue = company.initialValue + totalValue;
    const initialIndex = company.initialIndex + lastIndex;

    // Create filtered company object preserving name, initialValue, initialIndex
    const filteredCompany: Company = {
      name: company.name,
      initialValue,
      initialIndex,
      registers: transformedRegisters,
    };

    // Download with filtered company and filename
    download(filteredCompany, filename);

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          loading={loading}
          size="small"
          icon="download"
          iconPosition="right"
          onClick={handleDownloadAll}
          aria-label="Download all registers"
          data-testid="download-all-button"
        />

        <Button
          size="small"
          onClick={loading ? undefined : handleDownloadFiltered}
          aria-label="Download filtered registers by date range"
          data-testid="download-filtered-button"
        >
          Download Filtered
        </Button>
      </div>
      <DownloadIntervalModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </>
  );
};

export default DownloadButton;
