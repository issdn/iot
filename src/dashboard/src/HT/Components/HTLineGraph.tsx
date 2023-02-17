import { HT } from "../types";
import { ContentType } from "recharts/types/component/Tooltip";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { removeNanosecondsFromTime } from "../functions";

export default function HTLineGraph({
  title,
  data,
  dataKey,
  dataLabel,
  CustomTooltip,
}: {
  title: string;
  data: HT[];
  dataKey: keyof HT | ((obj: HT) => string | number);
  dataLabel: keyof HT;
  CustomTooltip: ContentType<ValueType, NameType>;
}) {
  return (
    <div className="flex flex-col pt-4 pr-3 gap-y-2 items-center border-2 border-zinc-700 rounded-xl">
      <p>{title}</p>
      <ResponsiveContainer width="99%" aspect={2}>
        <LineChart data={data}>
          <XAxis
            dataKey={(obj) => removeNanosecondsFromTime(obj.measurement_time)}
          />
          <YAxis domain={["dataMin", "dataMax"]} dataKey={dataKey} />
          <Tooltip content={CustomTooltip} />
          <Legend />
          <Line dataKey={dataLabel} fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
