import { Typography } from "@solness/ui";
import { FunctionComponent, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { roundNumber } from "~/modules/common";
import { calculateTodayTotal } from "../../helpers";

export interface Props {
  initialValue: number;
}

const RegisterFormSummary: FunctionComponent<Props> = ({ initialValue }) => {
  const fields = useWatch({
    name: "entries",
  });

  const { total, todayTotal, todayPositive, todayNegative } = useMemo(() => {
    const { todayNegative, todayPositive } = calculateTodayTotal(fields);

    const todayTotal = todayPositive + todayNegative;
    const total = +initialValue + todayPositive + todayNegative;

    return {
      total: roundNumber(total),
      todayTotal: roundNumber(todayTotal),
      todayPositive: roundNumber(todayPositive),
      todayNegative: roundNumber(todayNegative * -1),
    };
  }, [fields, initialValue]);

  return (
    <div className="grid grid-cols-12 mb-8">
      <div className="col-span-0 sm:col-span-4 lg:col-span-6"></div>
      <div className="col-span-12 sm:col-span-8 lg:col-span-6 p-4 bg-gray-100 rounded-md">
        <div className="grid grid-cols-3 mb-1">
          <div>
            <Typography size="small" color="gray">
              Sold inițial:
            </Typography>
          </div>
          <div className="col-span-2">
            <Typography size="small" color="gray">
              {roundNumber(initialValue)}
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-3 mb-2">
          <div>
            <Typography size="small" color="gray">
              Rulaj zi:
            </Typography>
          </div>
          <div className="col-span-2">
            <Typography size="small" color="gray">
              {todayTotal} ({todayPositive} - {todayNegative})
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t pt-2">
          <div>
            <Typography size="small" color="gray" weight="medium">
              Sold final zi:
            </Typography>
          </div>
          <div className="col-span-2">
            <Typography size="small" weight="medium">
              {total}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormSummary;
