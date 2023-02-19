import dayjs from "dayjs";
import Button from "./../../Components/Button";
import IconButton from "./../../Components/IconButton";
import { useState } from "react";
import { UseVisibilityType } from "./../../Components/functions";
import { CalendarContextType, useCalendar } from "../CalendarContext";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "June",
  "July",
  "May",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarMonth({
  visible,
}: {
  visible: UseVisibilityType["visible"];
}) {
  const calendar = useCalendar() as CalendarContextType;

  const renderDayButton = (day: number) => {
    const disabled = calendar.reachedMaxDay(day) || calendar.reachedMinDay(day);

    return (
      <Button
        onClick={() => calendar.setDay(day)}
        key={day}
        type={"basic"}
        styles="w-11 h-11 rounded-xl text-xl disabled:text-zinc-600 flex flex-row items-center justify-center"
        attributes={{ disabled: disabled }}
      >
        <p>{day + 1}</p>
      </Button>
    );
  };

  const MonthDays = () => {
    return (
      <div className="grid w-full grid-cols-7 place-content-center place-items-center gap-x-1 gap-y-1">
        {Array.from(Array(calendar.date.daysInMonth()).keys()).map(
          (day: number) => renderDayButton(day)
        )}
      </div>
    );
  };

  const Calendar = () => {
    return (
      <div className="flex w-full flex-col items-center gap-y-3 rounded-xl bg-zinc-800 py-2 px-1">
        <div className="flex w-[50%] flex-row items-center justify-between">
          <IconButton
            name="chevron_left"
            styles="rounded-full p-0.5 h-fit"
            onClick={calendar.moveMonthLeft}
            attributes={{
              disabled: calendar.reachedMinMonth(calendar.date.month() - 2),
            }}
          />
          <div className="flex flex-col items-center">
            <p className="font-secondary text-xl font-bold">
              {MONTH_NAMES[calendar.date.month()]}
            </p>
            <p className="-mt-2 font-secondary">{calendar.date.year()}</p>
          </div>
          <IconButton
            name="chevron_right"
            styles="rounded-full p-0.5 h-fit"
            onClick={calendar.moveMonthRight}
            attributes={{
              disabled: calendar.reachedMaxMonth(calendar.date.month() + 2),
            }}
          />
        </div>
        <div className="w-full px-2">
          <div className="w-full border-t border-white" />
        </div>
        <MonthDays />
      </div>
    );
  };

  return visible ? <Calendar /> : null;
}
