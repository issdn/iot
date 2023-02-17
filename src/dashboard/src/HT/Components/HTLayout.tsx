import dayjs from "dayjs";
import { useCalendar } from "../../Components/CalendarMonth";
import DayPicker from "../../Components/DayPicker";
import { HT } from "../types";
import Table, { useHTTable } from "./Table";

export default function HTLayout() {
  const calendar = useCalendar(dayjs("2023-01-01"), dayjs());
  const [data, setData] = useHTTable(calendar.date);

  return (
    <div className="flex flex-col gap-y-4">
      <DayPicker calendar={calendar} />
      <Table data={data as HT[]} date={calendar.date} />
    </div>
  );
}
