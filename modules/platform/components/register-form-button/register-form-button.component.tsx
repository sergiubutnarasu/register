import { Button, IconType, SizeType } from "@solness/ui";
import { FunctionComponent, ReactNode, useState } from "react";
import { useCompanyContext } from "../../contexts";
import RegisterFormModal from "../register-form-modal";

export interface Props {
  date?: Date;
  size?: SizeType;
  title?: string;
  icon?: IconType;
  transparent?: boolean;
  children?: ReactNode;
}

const RegisterFormButton: FunctionComponent<Props> = ({
  date,
  icon,
  children,
  size = "small",
  transparent = false,
  title = "Adaugă un registru nou",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { nextDate } = useCompanyContext();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button
        transparent={transparent}
        size={size}
        icon={icon}
        onClick={openModal}
      >
        {children}
      </Button>

      <RegisterFormModal
        open={isOpen}
        title={title}
        date={date || nextDate}
        onClose={closeModal}
      />
    </>
  );
};

export default RegisterFormButton;
