import moment from "moment";
import { Register } from "~/modules/excel";

export const getIndexByDate = (date: Date, items?: Register[]) =>
  items?.findIndex(({ date: itemDate }) => {
    const listItemDate = moment(itemDate).startOf("day");
    const newDate = moment(date).startOf("day");

    return listItemDate.isSame(newDate);
  });
