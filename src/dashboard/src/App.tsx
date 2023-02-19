import { CalendarProvider } from "./Calendar/CalendarContext";
import HTLayout from "./HT/Components/HTLayout";

function App() {
  return (
    <CalendarProvider>
      <div className="flex h-screen w-screen flex-col gap-x-4 overflow-x-hidden bg-zinc-900 p-4 font-main text-white lg:flex-row">
        <div className="h-full w-full grow">
          <HTLayout />
        </div>
      </div>
    </CalendarProvider>
  );
}

export default App;
