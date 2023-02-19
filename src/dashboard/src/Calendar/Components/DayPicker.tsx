import CalendarMonth from "./CalendarMonth";
import { UseVisibilityType } from "./../../Components/functions";
import IconButton from "../../Components/IconButton";
import Icon from "../../Components/Icon";
import { useVisibility } from "./../../Components/functions";
import { CalendarContextType, useCalendar } from "../CalendarContext";

export default function DayPicker() {
  const { visible, switchVisible } = useVisibility() as UseVisibilityType;
  const calendar = useCalendar() as CalendarContextType;

  return (
    <div className="flex flex-col gap-y-2 lg:max-w-md">
      <div className="flex flex-row items-center justify-between gap-x-2 rounded-xl bg-zinc-800 px-8 py-1">
        <IconButton
          name="chevron_left"
          styles="text-3xl rounded-full px-0.5"
          onClick={calendar.moveDayLeft}
          attributes={{
            disabled: calendar.reachedMinDay(calendar.date.date() - 1),
          }}
        />
        <button
          onClick={switchVisible}
          className="flex flex-row items-center gap-x-2 rounded-xl px-4 hover:bg-zinc-700"
        >
          <p className="whitespace-nowrap break-keep font-bold">
            {calendar.date.format("YYYY-MM-DD")}
          </p>
          {<Icon name="calendar_month" styles="text-2xl" />}
        </button>
        <IconButton
          name="chevron_right"
          styles="text-3xl rounded-full px-0.5"
          onClick={calendar.moveDayRight}
          attributes={{
            disabled: calendar.reachedMaxDay(calendar.date.date() + 1),
          }}
        />
      </div>
      <CalendarMonth visible={visible} />
    </div>
  );
}
