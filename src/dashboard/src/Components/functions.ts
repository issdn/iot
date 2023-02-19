import { useState } from "react";

export const useVisibility = () => {
  const [visible, setVisible] = useState(false);
  const switchVisible = () => setVisible(!visible);

  return { visible, setVisible, switchVisible };
};

export type UseVisibilityType = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  switchVisible: () => void;
};
