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
          <div className="bg-zinc-700 p-2 rounded-xl flex flex-col items-center">
            <p className="font-bold">{label}</p>
            <p className="">{payload[0].payload[dataKey]}</p>
          </div>
        );
      }

      return null;
    };
  };

  const DataVisualisation = () => {
    if (data.length === 0) return <p>No data for this day 😔</p>;
    else
      return (
        <div className="w-full h-full flex flex-col gap-y-4">
          <Table data={data as HT[]} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-4">
            <HTLineGraph
              title="Temperature °C"
              dataLabel="temperature"
              data={data as HT[]}
              dataKey={(obj) => obj.temperature}
              CustomTooltip={htTooltip("temperature")}
            />

            <HTLineGraph
              title="Humidity %"
              dataLabel="humidity"
              data={data as HT[]}
              dataKey="humidity"
              CustomTooltip={htTooltip("humidity")}
            />
          </div>
        </div>
      );
  };

  return (
    <div className="flex flex-col md:flex-row gap-y-4 gap-x-4">
      <DayPicker calendar={calendar} />
      <DataVisualisation />
    </div>
  );
}
