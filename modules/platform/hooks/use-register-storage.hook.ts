import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Company, CompanyDetails, Register } from "~/modules/excel";
import { getIndexByDate, migrateFromLocalStorage } from "../helpers";
import { useStorage } from "./use-storage.hook";

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
    const loadCompanyData = async () => {
      try {
        await migrateFromLocalStorage(key);

        const company = await getItem(key);

        if (company?.registers) {
          company.registers = company.registers?.map((register) => ({
            ...register,
            date: new Date(register.date),
          }));

          setCompany(company);
        }
      } catch (err) {
        console.error("Error loading company data:", err);
      }
    };

    loadCompanyData();
  }, [getItem, setCompany]);

  const saveCompanyDetails = useCallback(
    async (details: CompanyDetails) => {
      try {
        const newCompany: Company = {
          ...company,
          ...details,
        };

        await setItem(key, newCompany);
        setCompany({ ...newCompany });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to save company details";

        console.error("Error saving company details:", err);
        throw err;
      }
    },
    [company, setItem, setCompany],
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
    [company],
  );

  const saveRegister = useCallback(
    async (register: Register) => {
      try {
        let items = company?.registers ?? [];

        const index = getIndexByDate(register.date, items);

        if (index > -1) {
          items[index] = register;
        } else {
          items.push(register);
        }

        items = getPrepareData(items);
        company.registers = items;

        await setItem(key, company);
        setCompany({ ...company });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to save register";

        console.error("Error saving register:", err);
        throw err;
      }
    },
    [company, setItem, setCompany],
  );

  const deleteRegister = useCallback(
    async (date: Date) => {
      try {
        const items = company?.registers ?? [];
        const index = getIndexByDate(date, items);

        if (index < 0) {
          return;
        }

        items.splice(index, 1);
        company.registers = items;

        await setItem(key, company);
        setCompany({ ...company });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete register";

        console.error("Error deleting register:", err);
        throw err;
      }
    },
    [company, setItem, setCompany],
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
