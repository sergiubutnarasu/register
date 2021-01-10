import { RegisterEntry } from '../types';

export const entriesSum = (entries: RegisterEntry[]) =>
  entries
    .map(({ value }) => value)
    .reduce((value, amount) => value + amount, 0);

export const positiveEntriesSum = (entries: RegisterEntry[]) =>
  entriesSum(entries.filter(({ value }) => value > 0));

export const negativeEntriesSum = (entries: RegisterEntry[]) =>
  entriesSum(entries.filter(({ value }) => value < 0));
