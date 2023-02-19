import DayPicker from "../Calendar/Components/DayPicker";
import ControllersLayout from "../Controllers/Components/ControllersLayout";

export default function InfoPanel() {
  return (
    <div className="flex flex-col gap-y-4">
      <DayPicker />
      <ControllersLayout />
    </div>
  );
}
