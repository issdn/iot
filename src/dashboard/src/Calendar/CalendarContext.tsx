import dayjs from "dayjs";
import React, { useState } from "react";

const CalendarContext = React.createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({
  children,
  from = dayjs("2023-01-01"),
  to = dayjs(),
}: {
  children: React.ReactNode;
  from?: dayjs.Dayjs;
  to?: dayjs.Dayjs;
}) => {
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

  const value = {
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

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => React.useContext(CalendarContext);

export type CalendarContextType = {
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
