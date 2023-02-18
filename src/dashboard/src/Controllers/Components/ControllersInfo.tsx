import ControllerStatus from "./ControllerStatus";
import { ControllerInfoType } from "./types";

export default function ComponentsInfo({ data }: { data: ControllerInfoType }) {
  return (
    <div>
      <div className="flex flex-row items-center gap-x-2">
        <p className="font-bold ">{data.name}</p>
        <ControllerStatus last_message={data.last_message_minutes_ago} />
      </div>
      <p>{data.ip}</p>
    </div>
  );
}
