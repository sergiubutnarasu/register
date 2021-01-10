import { Register } from "~/modules/excel";
import moment from "moment";

export const getPreviousRegister = (
  registers: Register[],
  registerDate: Date
) => {
  const previousRegisters = registers.filter(({ date }) =>
    moment(date).isBefore(registerDate)
  );

  let lastIndex = 0;
  let totalValue = 0;

  previousRegisters
    .flatMap(({ entries }) => entries)
    .forEach(({ value }, index) => {
      lastIndex = index + 1;
      totalValue += +value;
    });

  return {
    lastIndex,
    totalValue,
  };
};
