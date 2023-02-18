import { HT } from "../types";
import { ContentType } from "recharts/types/component/Tooltip";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { cassandraTimeToDisplayTime } from "../functions";
import { HTValueType } from "./HTLayout";

export default function HTLineGraph({
  title,
  data,
  dataKey,
  dataLabel,
  CustomTooltip,
  lineFill,
}: {
  title: string;
  data: HT[];
  dataKey: keyof HT | ((obj: HT) => string | number);
  dataLabel: keyof HT;
  CustomTooltip: ContentType<HTValueType, NameType>;
  lineFill: string;
}) {
  return (
    <div className="flex flex-col pt-4 pr-3 gap-y-2 items-center border-2 border-zinc-700 rounded-xl">
      <p>{title}</p>
      <ResponsiveContainer height="100%" width="99%">
        <LineChart data={data}>
          <XAxis
            dataKey={(obj) => cassandraTimeToDisplayTime(obj.measurement_time)}
          />
          <YAxis domain={["dataMin", "dataMax"]} dataKey={dataKey} />
          <Tooltip content={CustomTooltip} />
          <Line dataKey={dataLabel} stroke={lineFill} strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
