import { Button, Typography } from "@solness/ui";
import moment from "moment";
import { FunctionComponent, useMemo } from "react";
import { useCompanyContext } from "../../contexts";
import RegisterFormButton from "../register-form-button";

export interface Props {
  date: Date;
}

const RegisterTableItem: FunctionComponent<Props> = ({ date }) => {
  const { deleteRegister } = useCompanyContext();
  const itemDate = useMemo(() => moment(date).format("DD/MM/YYYY"), [date]);

  return (
    <div className="bg-gray-50 p-4 rounded-md mb-1">
      <div className="flex items-center">
        <div className="w-5/6">
          <RegisterFormButton transparent size="xsmall" date={date}>
            <Typography size="small">{itemDate}</Typography>
          </RegisterFormButton>
        </div>
        <div className="w-1/6 flex items-center justify-end">
          <div>
            <Button
              transparent
              icon="close"
              size="xsmall"
              iconColor="gray"
              onClick={() => deleteRegister(date)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTableItem;
