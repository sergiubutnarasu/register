import { RegisterEntry } from "~/modules/excel";

export const getSum = (entries?: RegisterEntry[]): number => {
  if (!entries?.length) {
    return 0;
  }

  return entries.map(({ value }) => +value).reduce((a, b) => a + b, 0);
};
