import { useCallback, useEffect, useMemo, useState } from "react";
import { removeNanosecondsFromTime } from "../functions";
import { HT } from "../types";
import dayjs from "dayjs";

export const useHTTable = (date: dayjs.Dayjs) => {
  const [data, setData] = useState<HT[]>([]);

  useEffect(() => {
    fetch("http://192.168.0.51:8000/api/ht?date=" + date.format("YYYY-MM-DD"))
      .then((res) => res.json())
      .then((data) => setData(data.measurements));
  }, [date]);

  return [data, setData];
};

export default function Table({
  data,
  date,
}: {
  data: HT[];
  date: dayjs.Dayjs;
}) {
  const renderDTHRow = (dht: HT) => {
    return (
      <tr key={dht.measurement_time}>
        <td className="text-center">
          {removeNanosecondsFromTime(dht.measurement_time)}
        </td>
        <td className="text-center">{dht.temperature.toFixed(1)}°C</td>
        <td className="text-center">{Math.round(dht.humidity)}%</td>
      </tr>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="bg-zinc-800 w-full h-full p-2 rounded-xl">
        <table className="w-full h-full p-8">
          <thead className="mb-4">
            <tr>
              <th className="text-center">Measured At</th>
              <th className="text-center">Temeprature</th>
              <th className="text-center">Humidity</th>
            </tr>
          </thead>
          <tbody className="[&_tr:nth-child(2n)]:bg-zinc-700">
            {data.map((dht) => renderDTHRow(dht))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
