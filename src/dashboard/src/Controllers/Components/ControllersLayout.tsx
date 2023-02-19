import { useCallback, useEffect, useState } from "react";
import ControllersInfo from "./ControllersInfo";
import { ControllerInfoType } from "./types";

export default function ControllersLayout() {
  const [controllers, setControllers] = useState<ControllerInfoType[]>([]);

  const fetchControllerStatus = useCallback(() => {
    fetch("http://192.168.0.51:8000/api/controllers")
      .then((res) => res.json())
      .then((data) => setControllers(data));
  }, []);

  useEffect(() => {
    fetchControllerStatus();
  }, []);

  useEffect(() => {
    const invtervalId = setInterval(() => {
      fetchControllerStatus();
    }, 60000);
    return () => clearInterval(invtervalId);
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col items-center gap-y-4 rounded-xl border border-zinc-700 p-2">
        <p className="border-b border-zinc-700 pb-2 text-center text-xl">
          {controllers.length} controllers connected.
        </p>
        <div className="grid grid-cols-2 gap-y-4">
          {(controllers as ControllerInfoType[]).map((controller) => (
            <ControllersInfo key={controller.ip} data={controller} />
          ))}
        </div>
      </div>
    </div>
  );
}
