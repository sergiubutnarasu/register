import { Button } from "@solness/ui";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Register } from "~/modules/excel";
import { useCompanyContext } from "../../contexts";
import RegisterFormDetails from "../register-form-details";
import RegisterFormItems from "../register-form-items";
import RegisterFormSummary from "../register-form-summary";

const INITIAL_REGISTER: Register = {
  date: new Date(),
  entries: [],
};

export interface Props {
  date: Date;
  onSubmit: (register: Register) => void;
  onCancel: () => void;
}

const RegisterForm: FunctionComponent<Props> = ({
  date,
  onCancel,
  onSubmit,
}) => {
  const { company, getRegister, getPreviousRegister } = useCompanyContext();
  const [initialValue, setInitialValue] = useState(0);
  const [initialIndex, setInitialIndex] = useState(1);

  const methods = useForm<Register>({
    defaultValues: INITIAL_REGISTER,
  });

  const handleDateChange = (newDate: Date) => {
    const { lastIndex, totalValue } = getPreviousRegister(
      company.registers,
      newDate
    );

    const newRegister = getRegister(newDate);
    methods.reset(newRegister);

    setInitialIndex(+company.initialIndex + lastIndex);
    setInitialValue(+company.initialValue + totalValue);
  };

  useEffect(() => {
    handleDateChange(date);
  }, [date]);

  return (
    <FormProvider {...methods}>
      <form className="contact-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="">
          <RegisterFormDetails
            control={methods.control}
            onDateChange={handleDateChange}
          />

          <RegisterFormItems startIndex={initialIndex} />

          <RegisterFormSummary initialValue={initialValue} />

          <div className="flex justify-end">
            <Button type="submit" color="gray" size="small" onClick={onCancel}>
              Anulează
            </Button>
            <div className="ml-2">
              <Button type="submit" size="small">
                Salvează registrul
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
