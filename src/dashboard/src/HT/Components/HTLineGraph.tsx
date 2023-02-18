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
    <div className="flex h-full w-full flex-col items-center gap-y-2 rounded-xl border-2 border-zinc-700 pt-4 pr-3">
      <p>{title}</p>
      <ResponsiveContainer height="100%" width="99%">
        <LineChart data={data}>
          <XAxis dataKey={(obj) => obj.measurement_time} />
          <YAxis domain={["dataMin", "dataMax"]} dataKey={dataKey} />
          <Tooltip content={CustomTooltip} />
          <Line
            dataKey={dataLabel}
            stroke={lineFill}
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
