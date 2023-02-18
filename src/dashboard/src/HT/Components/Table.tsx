import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cassandraTimeToDisplayTime } from "../functions";
import { HT } from "../types";
import dayjs from "dayjs";

export const useHTTable = (date: dayjs.Dayjs) => {
  const [data, setData] = useState<HT[]>([]);

  const fetchHT = useCallback(() => {
    fetch("http://192.168.0.51:8000/api/ht?date=" + date.format("YYYY-MM-DD"))
      .then((res) => res.json())
      .then((data) => setData(data.measurements));
  }, [date]);

  useEffect(() => {
    fetchHT();
  }, [date]);

  useEffect(() => {
    const invtervalId = setInterval(() => {
      fetchHT();
    }, 60000);
    return () => clearInterval(invtervalId);
  }, []);

  return [data, setData];
};

export default function Table({ data }: { data: HT[] }) {
  const renderDTHRow = (dht: HT) => {
    return (
      <tr key={dht.measurement_time}>
        <td className="text-center">
          {cassandraTimeToDisplayTime(dht.measurement_time)}
        </td>
        <td className="text-center">{dht.temperature}°C</td>
        <td className="text-center">{Math.round(dht.humidity)}%</td>
      </tr>
    );
  };

  return (
    <div className="bg-zinc-800 w-full h-full p-2 rounded-xl">
      <table className="w-full h-full p-8 bg-zinc-800">
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
  );
}
