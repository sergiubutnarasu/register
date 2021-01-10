import React, { useContext } from "react";
import { Company, CompanyDetails, Register } from "~/modules/excel";

export interface Props {
  company: Company;
  nextDate: Date;
  saveCompanyDetails: (details: CompanyDetails) => void;
  getRegister: (date: Date) => Register;
  saveRegister: (register: Register) => void;
  deleteRegister: (date: Date) => void;
  getPreviousRegister: (
    registers: Register[],
    registerDate: Date
  ) => {
    lastIndex: number;
    totalValue: number;
  };
}

export const CompanyContext = React.createContext<Props>({
  company: { name: "", initialIndex: 1, initialValue: 0 },
  nextDate: new Date(),
  saveCompanyDetails: () => {
    throw new Error("saveCompanyDetails is not implemented");
  },
  getRegister: () => {
    throw new Error("getRegister is not implemented");
  },
  saveRegister: () => {
    throw new Error("sageRegister is not implemented");
  },
  deleteRegister: () => {
    throw new Error("deleteRegister is not implemented");
  },
  getPreviousRegister: () => {
    throw new Error("getPrevious is not implemented");
  },
});

export const useCompanyContext = () => useContext(CompanyContext);
