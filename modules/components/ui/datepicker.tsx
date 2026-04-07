"use client";

import * as React from "react";
import { format, parse, isValid, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from "date-fns";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../lib/utils";

export interface DatepickerProps {
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  error?: string;
}

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

const Datepicker = React.forwardRef<HTMLInputElement, DatepickerProps>(
  ({ name, label, placeholder = "Select date", required, value, onChange, error }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [currentMonth, setCurrentMonth] = React.useState(value || new Date());
    const [inputValue, setInputValue] = React.useState(value ? format(value, "dd/MM/yyyy") : "");

    React.useEffect(() => {
      if (value && isValid(value)) {
        setInputValue(format(value, "dd/MM/yyyy"));
        setCurrentMonth(value);
      } else {
        setInputValue("");
      }
    }, [value]);

    const days = React.useMemo(() => {
      const start = startOfMonth(currentMonth);
      const end = endOfMonth(currentMonth);
      return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    const startingDayIndex = getDay(startOfMonth(currentMonth));

    const handleDateSelect = (date: Date) => {
      onChange?.(date);
      setInputValue(format(date, "dd/MM/yyyy"));
      setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      
      if (val.length === 10) {
        const parsed = parse(val, "dd/MM/yyyy", new Date());
        if (isValid(parsed)) {
          onChange?.(parsed);
          setCurrentMonth(parsed);
        } else {
          onChange?.(null);
        }
      }
    };

    const isSelectedDate = (date: Date) => {
      if (!value || !isValid(value)) return false;
      return format(date, "yyyy-MM-dd") === format(value, "yyyy-MM-dd");
    };

    const isToday = (date: Date) => {
      return format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
    };

    return (
      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <input
              ref={ref}
              name={name}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={cn(
                "w-40 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
                error ? "border-red-300" : "border-gray-300"
              )}
            />
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="bg-white shadow-lg rounded-md border border-gray-200 p-3 z-50 max-h-80"
              sideOffset={4}
              align="start"
            >
              <div className="w-64">
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft />
                  </button>
                  <span className="font-semibold text-sm">
                    {format(currentMonth, "MMMM yyyy")}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-gray-500 py-1"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: startingDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {days.map((date) => {
                    const selected = isSelectedDate(date);
                    const today = isToday(date);
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        className={cn(
                          "w-8 h-8 text-sm rounded-md flex items-center justify-center",
                          selected
                            ? "bg-indigo-600 text-white"
                            : today
                            ? "bg-indigo-100 text-indigo-700"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        {format(date, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);
Datepicker.displayName = "Datepicker";

export { Datepicker };
