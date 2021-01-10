import { roundNumber } from "~/modules/common";
import { RegisterEntry } from "~/modules/excel";

export const calculateTodayTotal = (fields: RegisterEntry[]) =>
  fields.reduce(
    (
      {
        todayPositive,
        todayNegative,
      }: { todayPositive: number; todayNegative: number },
      { value }
    ) => {
      let positive = todayPositive;
      let negative = todayNegative;

      const currentValue = +value;

      if (currentValue < 0) {
        negative += currentValue;
      } else {
        positive += currentValue;
      }

      return {
        todayPositive: +positive,
        todayNegative: +negative,
      };
    },
    { todayPositive: 0, todayNegative: 0 }
  );
