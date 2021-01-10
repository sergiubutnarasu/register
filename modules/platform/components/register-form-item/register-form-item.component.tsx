import { Button, Typography } from "@solness/ui";
import React, { FunctionComponent } from "react";
import { RegisterEntry } from "~/modules/excel";
import Input from "../input";

export interface Props {
  index: number;
  startIndex: number;
  item: Partial<RegisterEntry>;
  onDelete: () => void;
}

const RegisterFormItem: FunctionComponent<Props> = ({
  index,
  startIndex,
  item,
  onDelete,
}) => (
  <>
    <div className="grid grid-cols-12 bg-gray-100 rounded mb-1 items-center">
      <div className="col-span-12 md:col-auto py-2 pr-2 pl-2 md:pl-3">
        <div className="flex items-center">
          <div className="mr-1 md:hidden">
            <Typography size="small" color="gray">
              Index:
            </Typography>
          </div>
          <Typography size="small" color="gray">
            {startIndex + index}
          </Typography>
        </div>
      </div>
      <div className="col-span-12 md:col-span-2 py-2 px-2">
        <div className="mb-1 md:hidden">
          <Typography size="small" color="gray">
            Nr. Act Casă
          </Typography>
        </div>
        <Input
          required
          id={item.id}
          name={`entries[${index}].docNumber`}
          type="text"
          placeholder="Nr. Act Casă"
          value={item?.docNumber}
        />
      </div>
      <div className="col-span-12 md:col-span-2 py-2 px-2">
        <div className="mb-1 md:hidden">
          <Typography size="small" color="gray">
            Nr. Anexă
          </Typography>
        </div>
        <Input
          id={item.id}
          name={`entries[${index}].annexNumber`}
          type="text"
          placeholder="Nr. Anexă"
          value={item?.annexNumber}
        />
      </div>
      <div className="col-span-12 md:col-span-4 py-2 px-2">
        <div className="mb-1 md:hidden">
          <Typography size="small" color="gray">
            Explicații
          </Typography>
        </div>
        <Input
          required
          id={item.id}
          name={`entries[${index}].description`}
          type="text"
          placeholder="Explicații"
          value={item?.description}
        />
      </div>
      <div className="col-span-12 md:col-span-2 py-2 px-2">
        <div className="mb-1 md:hidden">
          <Typography size="small" color="gray">
            Valoare
          </Typography>
        </div>
        <Input
          required
          id={item.id}
          name={`entries[${index}].value`}
          type="number"
          placeholder="Valoare"
          value={item?.value}
        />
      </div>
      <div className="col-span-12 md:col-auto py-2 px-2 flex justify-end md:justify-center">
        <div className="mb-2 md:hidden">
          <Button color="red" size="small" onClick={onDelete}>
            Șterge intrarea
          </Button>
        </div>

        <div className="hidden md:block">
          <Button
            color="white"
            transparent
            size="small"
            icon="close"
            iconColor="black"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  </>
);

export default RegisterFormItem;
