import { Panel, Typography } from "@solness/ui";
import React, { FunctionComponent } from "react";
import { useCompanyContext } from "../../contexts";
import RegisterFormButton from "../register-form-button";
import DownloadButton from "../download-button";
import RegisterTableItem from "../register-table-item";
import CompanyFormButton from "../company-form-button";

const RegisterTable: FunctionComponent = () => {
  const { company } = useCompanyContext();

  return (
    <div className="mb-4 md:w-4/5 sm:w-auto lg:w-3/5 mx-auto">
      <Panel
        title="Registre"
        actions={
          <>
            <CompanyFormButton />

            <div className="ml-1 sm:ml-2">
              <RegisterFormButton icon="plus" />
            </div>

            {Boolean(company.registers?.length) && (
              <div className="ml-1 sm:ml-2">
                <DownloadButton company={company} />
              </div>
            )}
          </>
        }
      >
        {!company.registers?.length && (
          <div className="flex justify-center py-6">
            <Typography size="small" color="gray">
              Nu aveți niciun registru!
            </Typography>
          </div>
        )}

        {company.registers?.map(({ date }, index) => (
          <RegisterTableItem key={index} date={date} />
        ))}
      </Panel>
    </div>
  );
};

export default RegisterTable;
