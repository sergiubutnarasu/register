import { Panel, Typography, Button } from '@/modules/components/ui';
import React, { FunctionComponent, useState } from "react";
import { useCompanyContext } from "../../contexts";
import RegisterFormModal from "../register-form-modal";
import DownloadButton from "../download-button";
import RegisterTableItem from "../register-table-item";
import CompanyFormModal from "../company-form-modal";
import PanelActionsMenu from "../panel-actions-menu";

const CompanyFormButton: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button color="gray" size="small" onClick={() => setIsOpen(true)} className="shadow-md">
        Compania ta
      </Button>
      <CompanyFormModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

const RegisterFormButtonWithShadow: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { nextDate } = useCompanyContext();
  return (
    <>
      <Button size="small" icon="plus" onClick={() => setIsOpen(true)} className="shadow-md" />
      <RegisterFormModal open={isOpen} onClose={() => setIsOpen(false)} title="Adaugă un registru nou" date={nextDate} />
    </>
  );
};

const RegisterTable: FunctionComponent = () => {
  const { company } = useCompanyContext();

  return (
    <div className="mb-4 md:w-4/5 sm:w-auto lg:w-3/5 mx-auto">
      <Panel
        title="Registre"
        actions={
          <PanelActionsMenu>
            <CompanyFormButton />
            <RegisterFormButtonWithShadow />
            {Boolean(company.registers?.length) && (
              <DownloadButton company={company} buttonClassName="shadow-md" />
            )}
          </PanelActionsMenu>
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
