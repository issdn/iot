import dayjs from "dayjs";
import { useCalendar } from "../../Components/CalendarMonth";
import DayPicker from "../../Components/DayPicker";
import { HT } from "../types";
import Table, { useHTTable } from "./Table";
import HTLineGraph from "./HTLineGraph";
import { TooltipProps } from "recharts/types/component/Tooltip";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { StyleHTMLAttributes } from "react";

export type HTValueType = ValueType & HT;

export default function HTLayout() {
  const calendar = useCalendar(dayjs("2023-01-01"), dayjs());
  const [data, setData] = useHTTable(calendar.date);

  const htTooltip = (dataKey: keyof HT) => {
    return ({
      active,
      payload,
      label,
    }: TooltipProps<HTValueType, NameType>) => {
      if (active && payload && payload.length) {
        return (
          <div className="flex flex-col items-center rounded-xl bg-zinc-700 p-2">
            <p className="font-bold">{label}</p>
            <p className="">{payload[0].payload[dataKey]}</p>
          </div>
        );
      }

      return null;
    };
  };

  return (
    <div className="flex h-fit flex-col gap-y-4 lg:h-full">
      <div className="flex h-screen w-full flex-col gap-x-4 gap-y-4 lg:h-full lg:basis-3/5 lg:flex-row lg:overflow-y-hidden">
        <DayPicker calendar={calendar} />
        <div
          className="h-full w-full overflow-y-scroll"
          style={
            {
              "scrollbar-width": "thin",
            } as StyleHTMLAttributes<HTMLDivElement> & {
              "scrollbar-width": "thin";
            }
          }
        >
          <Table data={data as HT[]} />
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-1 gap-x-4 gap-y-4 lg:h-full lg:basis-2/5 lg:grid-cols-2">
        <HTLineGraph
          lineFill="#D97706"
          title="Temperature °C"
          dataLabel="temperature"
          data={data as HT[]}
          dataKey={(obj) => obj.temperature}
          CustomTooltip={htTooltip("temperature")}
        />
        <HTLineGraph
          lineFill="#2563EB"
          title="Humidity %"
          dataLabel="humidity"
          data={data as HT[]}
          dataKey="humidity"
          CustomTooltip={htTooltip("humidity")}
        />
      </div>
    </div>
  );
}
