import { Datepicker, Typography } from "@solness/ui";
import React, { FunctionComponent } from "react";
import { Control, Controller } from "react-hook-form";
import { Register } from "~/modules/excel";

export interface Props {
  control: Control<Register>;
  onDateChange: (date: Date) => void;
}

const RegisterFormDetails: FunctionComponent<Props> = ({
  control,
  onDateChange,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor="date" className="block sm:inline-block mr-4">
        <Typography as="span" size="small">
          Alege data registrului:
        </Typography>
      </label>

      <Controller
        name="date"
        control={control}
        render={({ onChange, value }) => (
          <Datepicker
            onChange={(date) => {
              onChange(date);
              onDateChange(date);
            }}
            value={value}
          />
        )}
      />
    </div>
  );
};

export default RegisterFormDetails;
