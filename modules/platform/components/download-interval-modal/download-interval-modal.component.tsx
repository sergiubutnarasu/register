import { Button, Datepicker, Typography } from "@solness/ui";
import React, { FunctionComponent, useState, useEffect } from "react";
import Modal from "../modal";
import { DateRange } from "../../types";
import { getPreviousMonthRange, validateDateRange } from "../../helpers";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (dateRange: DateRange) => void;
  currentDate?: Date;
}

const DownloadIntervalModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  currentDate,
}) => {
  const defaultRange = getPreviousMonthRange(currentDate || new Date());
  const [startDate, setStartDate] = useState<Date>(defaultRange.startDate);
  const [endDate, setEndDate] = useState<Date>(defaultRange.endDate);
  const [error, setError] = useState<string>("");

  // Reset dates when modal opens
  useEffect(() => {
    if (isOpen) {
      setStartDate(defaultRange.startDate);
      setEndDate(defaultRange.endDate);
      setError("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const validationResult = validateDateRange(startDate, endDate);
    if (validationResult.isValid) {
      onConfirm({
        startDate,
        endDate,
      });
      onClose();
    } else {
      setError(validationResult.errorMessage || "Invalid date range");
    }
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
    // Validate after updating
    const validationResult = validateDateRange(date, endDate);
    if (validationResult.isValid) {
      setError("");
    } else {
      setError(validationResult.errorMessage || "Invalid date range");
    }
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
    // Validate after updating
    const validationResult = validateDateRange(startDate, date);
    if (validationResult.isValid) {
      setError("");
    } else {
      setError(validationResult.errorMessage || "Invalid date range");
    }
  };

  if (!isOpen) {
    return null;
  }

  const isDisabled = startDate && endDate && startDate > endDate;

  return (
    <Modal
      title="Select Download Interval"
      open={isOpen}
      onClose={onClose}
      size="small"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block">
            <Typography as="span" size="small" weight="bold">
              Start Date
            </Typography>
          </label>

          <Datepicker value={startDate} onChange={handleStartDateChange} />
        </div>

        <div className="space-y-2">
          <label className="block">
            <Typography as="span" size="small" weight="bold">
              End Date
            </Typography>
          </label>

          <Datepicker value={endDate} onChange={handleEndDateChange} />
        </div>

        {error && (
          <div className="text-red-500 text-sm">
            <Typography as="span" size="small">
              {error}
            </Typography>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <Button onClick={onClose} transparent>
            Cancel
          </Button>
          <Button
            onClick={isDisabled ? undefined : handleConfirm}
            color={isDisabled ? "gray" : "indigo"}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadIntervalModal;
