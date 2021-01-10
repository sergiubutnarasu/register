import React, { FunctionComponent, ReactNode } from "react";
import { Company } from "~/modules/excel";
import { CompanyContext } from "../../contexts";
import { useRegisterStorage } from "../../hooks";
import { getPreviousRegister } from "../../helpers";

const INITIAL_COMPANY: Company = {
  name: "Solness",
  initialIndex: 1,
  initialValue: 200,
  registers: [],
};

export interface Props {
  children: ReactNode;
}

const CompanyProvider: FunctionComponent<Props> = ({ children }) => {
  const {
    company,
    nextDate,
    saveCompanyDetails,
    getRegister,
    saveRegister,
    deleteRegister,
  } = useRegisterStorage(INITIAL_COMPANY);

  return (
    <CompanyContext.Provider
      value={{
        company,
        nextDate,
        saveCompanyDetails,
        getRegister,
        saveRegister,
        getPreviousRegister,
        deleteRegister,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export default CompanyProvider;
