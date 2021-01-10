import { Button } from "@solness/ui";
import React, { useState } from "react";
import CompanyFormModal from "../company-form-modal";

const CompanyFormButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Button color="gray" size="small" onClick={openModal}>
        Compania ta
      </Button>

      <CompanyFormModal open={isOpen} onClose={closeModal} />
    </>
  );
};

export default CompanyFormButton;
