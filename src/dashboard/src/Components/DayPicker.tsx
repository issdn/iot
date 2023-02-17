import dayjs from "dayjs";
import Icon from "./Icon";
import IconButton from "./IconButton";
import CalendarMonth, { UseCalendarType, useCalendar } from "./CalendarMonth";
import { UseVisibilityType, useVisibility } from "./functions";

export default function DayPicker({ calendar }: { calendar: UseCalendarType }) {
  const { visible, switchVisible } = useVisibility() as UseVisibilityType;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row gap-x-2 px-8 py-1 items-center justify-between bg-zinc-800 rounded-xl">
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
          className="flex flex-row gap-x-2 items-center hover:bg-zinc-700 px-4 rounded-xl"
        >
          <p className="font-bold">{calendar.date.format("YYYY-MM-DD")}</p>
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
      <CalendarMonth
        visible={visible}
        monthNumber={calendar.date.month()}
        date={calendar.date}
        moveMonthLeft={calendar.moveMonthLeft}
        moveMonthRight={calendar.moveMonthRight}
        setDay={calendar.setDay}
        reachedMaxDay={calendar.reachedMaxDay}
        reachedMinDay={calendar.reachedMinDay}
        reachedMaxMonth={calendar.reachedMaxMonth}
        reachedMinMonth={calendar.reachedMinMonth}
      />
    </div>
  );
}
