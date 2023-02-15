import TableSwitch from "../../Components/TableSwitch";
import { HT } from "../types";
import Table, { useHTTable } from "./Table";

export default function HTLayout() {
  const [data, setData] = useHTTable("");

  return (
    <div>
      {/* <TableSwitch /> */}
      <Table data={data as HT[]} />
    </div>
  );
}
