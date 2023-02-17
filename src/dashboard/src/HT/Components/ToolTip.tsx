import React from "react";

export default function ToolTip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-700 p-2 rounded-xl">
        <p className="">{}</p>
        <p className="">asdasdasdas</p>
      </div>
    );
  }
  return null;
}
