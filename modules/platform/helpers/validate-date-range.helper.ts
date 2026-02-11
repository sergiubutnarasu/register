export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateDateRange = (
  startDate: Date | null | undefined,
  endDate: Date | null | undefined
): ValidationResult => {
  // Check if both dates are provided
  if (!startDate || !endDate) {
    return {
      isValid: false,
      errorMessage: 'Both start and end dates must be provided',
    };
  }

  // Check if startDate is before or equal to endDate
  if (startDate > endDate) {
    return {
      isValid: false,
      errorMessage: 'Start date must be before or equal to end date',
    };
  }

  return {
    isValid: true,
  };
};
