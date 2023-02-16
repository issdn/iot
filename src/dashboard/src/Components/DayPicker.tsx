import dayjs from "dayjs";
import Icon from "./Icon";
import IconButton from "./IconButton";
import CalendarMonth, { useCalendar } from "./CalendarMonth";
import { UseVisibilityType, useVisibility } from "./functions";

export default function DayPicker({
  from = dayjs("2023-01-01"),
  to = dayjs(),
}: {
  from?: dayjs.Dayjs;
  to?: dayjs.Dayjs;
}) {
  const {
    date,
    moveMonthRight,
    moveMonthLeft,
    moveDayRight,
    moveDayLeft,
    setDay,
    reachedMaxDay,
    reachedMinDay,
    reachedMaxMonth,
    reachedMinMonth,
  } = useCalendar(to, from, to);

  const { visible, switchVisible } = useVisibility() as UseVisibilityType;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row gap-x-2 px-8 py-1 items-center justify-between bg-zinc-800 rounded-xl">
        <IconButton
          name="chevron_left"
          styles="text-3xl rounded-full px-0.5"
          onClick={moveDayLeft}
          attributes={{ disabled: reachedMinDay(date.date() - 1) }}
        />
        <button
          onClick={switchVisible}
          className="flex flex-row gap-x-2 items-center hover:bg-zinc-700 px-4 rounded-xl"
        >
          <p className="font-bold">{date.format("YYYY-MM-DD")}</p>
          {<Icon name="calendar_month" styles="text-2xl" />}
        </button>
        <IconButton
          name="chevron_right"
          styles="text-3xl rounded-full px-0.5"
          onClick={moveDayRight}
          attributes={{ disabled: reachedMaxDay(date.date() + 1) }}
        />
      </div>
      <CalendarMonth
        monthNumber={date.month()}
        date={date}
        moveMonthLeft={moveMonthLeft}
        moveMonthRight={moveMonthRight}
        setDay={setDay}
        visible={visible}
        reachedMaxDay={reachedMaxDay}
        reachedMinDay={reachedMinDay}
        reachedMaxMonth={reachedMaxMonth}
        reachedMinMonth={reachedMinMonth}
      />
    </div>
  );
}
