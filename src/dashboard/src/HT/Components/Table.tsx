import { useEffect, useState } from "react";
import { removeNanosecondsFromTime } from "../functions";
import { HT } from "../types";

export const useHTTable = (date: string) => {
  const [data, setData] = useState<HT[]>([]);

  useEffect(() => {
    fetch(
      "http://192.168.0.51:8000/api/ht" + (date === "" ? date : "?date=" + date)
    )
      .then((res) => res.json())
      .then((data) => setData(data.measurements));
  }, []);

  return [data, setData];
};

export default function Table({ data }: { data: HT[] }) {
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
  //border-b border-white
  return (
    <div className="p-2 w-full h-full">
      <div className="bg-zinc-800 w-full h-full p-2 rounded-xl">
        <table className="w-full h-full p-8">
          <thead className="mb-4">
            <tr>
              <th className="text-center">Measured At</th>
              <th className="text-center">Temeprature</th>
              <th className="text-center">Humidity</th>
            </tr>
          </thead>
          <tbody className="[&_tr:not(:last-child)]:border-b [&_tr:not(:last-child)]:border-white">
            {data.map((dht) => renderDTHRow(dht))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
