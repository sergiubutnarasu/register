import { get } from "lodash";
import { FunctionComponent } from "react";
import { useFormContext, useFormState } from "react-hook-form";

export interface Props {
  name: string;
  id?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  onChange?: () => void;
}

const Input: FunctionComponent<Props> = ({
  name,
  id = "",
  type = "text",
  value = "",
  required = false,
  placeholder,
  onChange,
}) => {
  const { register } = useFormContext();
  const { errors } = useFormState();

  const defaultTheme =
    "px-3 py-2 w-full text-sm leading-none appearance-none border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-100";

  const errorTheme = !!get(errors, name) ? "border-red-300" : "";

  const theme = `${defaultTheme} ${errorTheme}`;

  return (
    <input
      key={id}
      step="any"
      className={theme}
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      {...register(name, { required })}
      onChange={onChange}
    />
  );
};

export default Input;
