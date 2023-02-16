import { useState } from "react";

export const getTodaysCassandraDate = () => {
  const todayDate = new Date();
  return (
    todayDate.getFullYear + "-" + todayDate.getMonth + "-" + todayDate.getDay
  );
};

export type UseVisibilityType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  switchVisible: () => void;
};

export const useVisibility = () => {
  const [visible, setVisible] = useState(false);
  const switchVisible = () => setVisible(!visible);

  return { visible, setVisible, switchVisible };
};
