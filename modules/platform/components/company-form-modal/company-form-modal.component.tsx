import React, { FunctionComponent } from "react";
import { CompanyDetails } from "~/modules/excel";
import { useCompanyContext } from "../../contexts";
import CompanyForm from "../company-form";
import Modal from "../modal";

export interface Props {
  open: boolean;
  onClose: () => void;
}

const CompanyFormModal: FunctionComponent<Props> = ({ open, onClose }) => {
  const { saveCompanyDetails } = useCompanyContext();

  const handleSubmit = async (details: CompanyDetails) => {
    await saveCompanyDetails(details);
    onClose();
  };

  return (
    <Modal open={open} size="small" title="Compania ta" onClose={onClose}>
      <CompanyForm onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
};

export default CompanyFormModal;
