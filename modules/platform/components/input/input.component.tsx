import { FunctionComponent, ReactText } from "react";
import { useFormContext } from "react-hook-form";
import { get } from "lodash";

export interface Props {
  name: string;
  id?: string;
  type?: string;
  value?: ReactText;
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
  const { register, errors } = useFormContext();

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
      name={name}
      ref={register({ required })}
      placeholder={placeholder}
      defaultValue={value}
      onChange={onChange}
    />
  );
};

export default Input;
