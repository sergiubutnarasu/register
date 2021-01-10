import { Button, Typography } from "@solness/ui";
import React, { FunctionComponent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CompanyDetails } from "~/modules/excel";
import { useCompanyContext } from "../../contexts";
import Input from "../input";

export interface Props {
  onSubmit: (details: CompanyDetails) => void;
  onCancel: () => void;
}

const CompanyForm: FunctionComponent<Props> = ({ onSubmit, onCancel }) => {
  const { company } = useCompanyContext();

  const methods = useForm<CompanyDetails>({
    defaultValues: {
      name: company.name,
      initialValue: company.initialValue,
      initialIndex: company.initialIndex,
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="contact-form" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="">
          <div className="grid grid-cols-12 gap-2 mb-6">
            <label htmlFor="name" className="col-span-4">
              <Typography as="span" size="small">
                Compania
              </Typography>
            </label>

            <div className="col-span-8">
              <Input
                required
                name="name"
                type="text"
                placeholder="Numele"
                value={company.name}
              />
            </div>

            <label htmlFor="initialValue" className="col-span-4">
              <Typography as="span" size="small">
                Valoare inițială
              </Typography>
            </label>

            <div className="col-span-8">
              <Input
                required
                name="initialValue"
                type="number"
                placeholder="Valoarea initiala"
                value={company.initialValue}
              />
            </div>

            <label htmlFor="initialIndex" className="col-span-4">
              <Typography as="span" size="small">
                Index-ul inițial
              </Typography>
            </label>

            <div className="col-span-8">
              <Input
                required
                name="initialIndex"
                type="number"
                placeholder="Index initial"
                value={company.initialIndex}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" color="gray" size="small" onClick={onCancel}>
              Anulează
            </Button>
            <div className="ml-2">
              <Button type="submit" size="small">
                Salvează detaliile
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CompanyForm;
