import { useEffect, useState } from "react";
import ControllersInfo from "./ControllersInfo";
import { ControllerInfoType } from "./types";

export default function ControllersLayout() {
  const [controllers, setControllers] = useState<ControllerInfoType[]>([]);

  useEffect(() => {
    fetch("http://192.168.0.51:8000/api/controllers")
      .then((res) => res.json())
      .then((data) => setControllers(data));
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col items-center rounded-xl border border-zinc-700 p-4">
        <p className="text-center text-xl">
          {controllers.length} controllers connected.
        </p>
        {(controllers as ControllerInfoType[]).map((controller) => (
          <ControllersInfo key={controller.ip} data={controller} />
        ))}
      </div>
    </div>
  );
}
