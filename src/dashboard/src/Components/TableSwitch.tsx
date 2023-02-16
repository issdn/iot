import React, { useState } from "react";

type SwitchItem = { key: string; label: string };

const useTableSwitch = (items: SwitchItem[]) => {
  const [currItemsIndex, setCurrItemsIndex] = useState(0);

  const moveRight = () => {
    if (currItemsIndex < items.length) setCurrItemsIndex(currItemsIndex + 1);
  };

  const moveLeft = () => {
    if (currItemsIndex > 0) setCurrItemsIndex(currItemsIndex - 1);
  };

  return { moveLeft, moveRight };
};

export default function TableSwitch({ items }: { items: SwitchItem[] }) {
  return <div>TableSwitch</div>;
}
