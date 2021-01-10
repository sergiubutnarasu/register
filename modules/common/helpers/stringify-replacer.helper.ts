import moment from "moment";

export const stringifyReplacer = (format?: string) =>
  function (key: string, value: unknown) {
    if (this[key] instanceof Date) {
      return moment(this[key]).format(format);
    }

    return value;
  };
