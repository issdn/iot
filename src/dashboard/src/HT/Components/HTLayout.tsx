import DayPicker from "../../Components/DayPicker";
import { HT } from "../types";
import Table, { useHTTable } from "./Table";

export default function HTLayout() {
  const [data, setData] = useHTTable("");

  return (
    <div className="flex flex-col gap-y-4">
      <DayPicker />
      <Table data={data as HT[]} />
    </div>
  );
}
