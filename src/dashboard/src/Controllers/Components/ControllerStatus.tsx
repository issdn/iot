import React from "react";
import { ControllerInfoType } from "./types";

export default function ControllerStatus({
  last_message,
}: {
  last_message: ControllerInfoType["last_message_minutes_ago"];
}) {
  let statusColor;
  if (last_message < 2) {
    statusColor = "bg-emerald-500";
  } else if (last_message < 4) {
    statusColor = "bg-yellow-500";
  } else {
    statusColor = "bg-red-500";
  }
  return (
    <span className={`h-3 w-3 animate-pulse rounded-full ${statusColor}`} />
  );
}
