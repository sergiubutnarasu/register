import { useCallback, useEffect, useState } from "react";
import { Company, CompanyDetails, Register } from "~/modules/excel";
import { getIndexByDate } from "../helpers";
import { useStorage } from "./use-storage.hook";
import moment from "moment";

const sortItems = (items: Register[]) =>
  items.sort((a, b) => (a.date.toISOString() > b.date.toISOString() ? 1 : -1));

const getPrepareData = (items: Register[]): Register[] => {
  sortItems(items);

  return items;
};

const getNextDate = (registers?: Register[]) => {
  if (!registers?.length) {
    return moment(new Date()).startOf("day").toDate();
  }

  const date = registers[registers.length - 1].date;

  return moment(date).add(1, "d").toDate();
};

export const useRegisterStorage = (initialCompany: Company) => {
  const key = "register-storage";

  const [company, setCompany] = useState<Company>(initialCompany);
  const { getItem, setItem } = useStorage<Company>();

  useEffect(() => {
    let company = getItem(key);

    if (company?.registers) {
      company.registers = company.registers?.map((register) => ({
        ...register,
        date: new Date(register.date),
      }));

      setCompany(company);
    }
  }, [getItem, setCompany]);

  const saveCompanyDetails = useCallback(
    (details: CompanyDetails) => {
      const newCompany: Company = {
        ...company,
        ...details,
      };

      setItem(key, newCompany);
      setCompany({ ...newCompany });
    },
    [company, setItem, setCompany]
  );

  const getRegister = useCallback(
    (date: Date): Register => {
      const items = company?.registers ?? [];
      const index = getIndexByDate(date, items);

      if (index > -1) {
        return items[index];
      }

      return {
        date,
        entries: [],
      };
    },
    [company]
  );

  const saveRegister = useCallback(
    (register: Register) => {
      let items = company?.registers ?? [];

      const index = getIndexByDate(register.date, items);

      if (index > -1) {
        items[index] = register;
      } else {
        items.push(register);
      }

      items = getPrepareData(items);
      company.registers = items;

      setItem(key, company);
      setCompany({ ...company });
    },
    [company, setItem, setCompany]
  );

  const deleteRegister = useCallback(
    (date: Date) => {
      const items = company?.registers ?? [];
      const index = getIndexByDate(date, items);

      if (index < 0) {
        return;
      }

      items.splice(index, 1);
      company.registers = items;

      setItem(key, company);
      setCompany({ ...company });
    },
    [company, setItem, setCompany]
  );

  return {
    company,
    nextDate: getNextDate(company.registers),
    saveCompanyDetails,
    getRegister,
    saveRegister,
    deleteRegister,
  };
};
