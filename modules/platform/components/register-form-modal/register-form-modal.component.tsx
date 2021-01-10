import React, { FunctionComponent } from "react";
import { Register } from "~/modules/excel";
import { useCompanyContext } from "../../contexts";
import Modal from "../modal";
import RegisterForm from "../register-form";

export interface Props {
  title: string;
  open: boolean;
  date: Date;
  onClose: () => void;
}

const RegisterFormModal: FunctionComponent<Props> = ({
  open,
  title,
  date,
  onClose,
}) => {
  const { saveRegister } = useCompanyContext();

  const handleSubmit = (register: Register) => {
    if (register.entries?.length) {
      saveRegister(register);
      onClose();
    }
  };

  return (
    <Modal open={open} title={title} onClose={onClose}>
      <RegisterForm date={date} onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
};

export default RegisterFormModal;
