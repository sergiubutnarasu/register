import { Register } from "~/modules/excel";
import moment from "moment";

export const getPreviousRegister = (
  registers: Register[],
  registerDate: Date
) => {
  const previousRegisters = registers.filter(({ date }) =>
    moment(date).isBefore(registerDate)
  );

  const allPreviousEntries = previousRegisters.flatMap(({ entries }) => entries || []);
  
  const lastIndex = allPreviousEntries.length;
  const totalValue = allPreviousEntries.reduce((sum, entry) => sum + +entry.value, 0);

  return {
    lastIndex,
    totalValue,
  };
};
