import dayjs from "dayjs";
import Button from "./Button";
import IconButton from "./IconButton";
import { useState } from "react";
import { UseVisibilityType } from "./functions";

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

export type UseCalendarType = {
  date: dayjs.Dayjs;
  moveDayLeft: () => void;
  moveDayRight: () => void;
  moveMonthLeft: () => void;
  moveMonthRight: () => void;
  setDay: (day: number) => void;
  reachedMaxDay: (day: number) => boolean;
  reachedMinDay: (day: number) => boolean;
  reachedMaxMonth: (month: number) => boolean;
  reachedMinMonth: (month: number) => boolean;
};

export const useCalendar = (from: dayjs.Dayjs, to: dayjs.Dayjs) => {
  const [_date, _setDate] = useState(to);

  const moveMonthRight = () => {
    _setDate(_date.add(1, "M"));
  };

  const moveMonthLeft = () => {
    _setDate(_date.subtract(1, "M"));
  };

  const moveDayRight = () => {
    _setDate(_date.add(1, "d"));
  };

  const moveDayLeft = () => {
    _setDate(_date.subtract(1, "d"));
  };

  const setDay = (day: number) => {
    _setDate(_date.set("date", day));
  };

  const reachedMaxDay = (day: number) =>
    _date.set("date", day).diff(to, "date") > 0;

  const reachedMinDay = (day: number) =>
    _date.set("date", day).diff(from, "date") < 0;

  const reachedMaxMonth = (month: number) =>
    _date.set("month", month).diff(to, "month") > 0;

  const reachedMinMonth = (month: number) =>
    _date.set("month", month).diff(from, "month") < 0;

  return {
    date: _date,
    moveMonthRight,
    moveMonthLeft,
    moveDayRight,
    moveDayLeft,
    setDay,
    reachedMaxDay,
    reachedMinDay,
    reachedMaxMonth,
    reachedMinMonth,
  };
};

export default function CalendarMonth({
  monthNumber,
  date,
  moveMonthLeft,
  moveMonthRight,
  setDay,
  visible,
  reachedMaxDay,
  reachedMinDay,
  reachedMaxMonth,
  reachedMinMonth,
}: {
  monthNumber: number;
  date: dayjs.Dayjs;
  visible: UseVisibilityType["visible"];
  moveMonthLeft: UseCalendarType["moveMonthLeft"];
  moveMonthRight: UseCalendarType["moveMonthRight"];
  setDay: UseCalendarType["setDay"];
  reachedMaxDay: UseCalendarType["reachedMaxDay"];
  reachedMinDay: UseCalendarType["reachedMinDay"];
  reachedMaxMonth: UseCalendarType["reachedMaxMonth"];
  reachedMinMonth: UseCalendarType["reachedMinMonth"];
}) {
  const renderDayButton = (day: number) => {
    const disabled = reachedMaxDay(day) || reachedMinDay(day);

    return (
      <Button
        onClick={() => setDay(day)}
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
      <div className="grid grid-cols-7 gap-x-1 gap-y-1 place-items-center place-content-center">
        {Array.from(Array(date.daysInMonth()).keys()).map((day: number) =>
          renderDayButton(day)
        )}
      </div>
    );
  };

  const Calendar = () => {
    return (
      <div className="flex flex-col items-center bg-zinc-800 rounded-xl py-2 px-1 gap-y-3">
        <div className="w-[50%] flex flex-row justify-between items-center">
          <IconButton
            name="chevron_left"
            styles="rounded-full p-0.5 h-fit"
            onClick={moveMonthLeft}
            attributes={{ disabled: reachedMinMonth(monthNumber - 2) }}
          />
          <div className="flex flex-col items-center">
            <p className="font-secondary font-bold text-xl">
              {MONTH_NAMES[monthNumber]}
            </p>
            <p className="font-secondary -mt-2">{date.year()}</p>
          </div>
          <IconButton
            name="chevron_right"
            styles="rounded-full p-0.5 h-fit"
            onClick={moveMonthRight}
            attributes={{ disabled: reachedMaxMonth(monthNumber + 2) }}
          />
        </div>
        <div className="w-full px-2">
          <div className="border-t border-white w-full" />
        </div>
        <MonthDays />
      </div>
    );
  };

  return visible ? <Calendar /> : null;
}
