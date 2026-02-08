import { Icon, Typography } from "@solness/ui";
import { FunctionComponent } from "react";
import { useFieldArray, useFormState } from "react-hook-form";
import RegisterFormItem from "../register-form-item";

export interface Props {
  startIndex: number;
}

const RegisterFormItems: FunctionComponent<Props> = ({ startIndex }) => {
  const { isSubmitted } = useFormState();

  const { fields, append, remove } = useFieldArray({
    name: "entries",
  });

  const addEntry = () => {
    append({});
  };

  return (
    <div className="mb-6 ">
      <div className="hidden md:grid grid-cols-12 bg-gray-100 rounded mb-1">
        <div className="py-2 pl-3 pr-2">
          <Typography size="xsmall" color="gray" weight="semibold">
            Index
          </Typography>
        </div>
        <div className="col-span-2 py-2 px-2">
          <Typography size="xsmall" color="gray" weight="semibold">
            Nr. Act. Casă
          </Typography>
        </div>
        <div className="col-span-2 py-2 px-2">
          <Typography size="xsmall" color="gray" weight="semibold">
            Nr. Anexă
          </Typography>
        </div>
        <div className="col-span-4 py-2 px-2">
          <Typography size="xsmall" color="gray" weight="semibold">
            Explicații
          </Typography>
        </div>
        <div className="col-span-2 py-2 px-2">
          <Typography size="xsmall" color="gray" weight="semibold">
            Valoare
          </Typography>
        </div>
        <div className="py-2 px-2"></div>
      </div>

      {fields.map((field, index) => (
        <RegisterFormItem
          key={index}
          startIndex={startIndex}
          index={index}
          item={field}
          onDelete={() => remove(index)}
        />
      ))}

      {isSubmitted && !fields.length && (
        <div className="flex justify-center py-3 mb-1">
          <Typography color="red" size="xsmall">
            Adaugă cel puțin o intrare
          </Typography>
        </div>
      )}

      <div
        className="py-3 px-2 flex justify-center border-2 border-dashed rounded cursor-pointer"
        onClick={addEntry}
      >
        <div className="mr-1">
          <Icon icon="plus" size="small" color="indigo" />
        </div>
        <Typography size="xsmall" color="gray" weight="medium">
          Adaugă o intrare nouă
        </Typography>
      </div>
    </div>
  );
};

export default RegisterFormItems;
