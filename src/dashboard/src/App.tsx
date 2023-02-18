import ControllersLayout from "./Controllers/Components/ControllersLayout";
import HTLayout from "./HT/Components/HTLayout";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col gap-x-4 overflow-x-hidden bg-zinc-900 p-4 font-main text-white lg:flex-row">
      <div className="h-full grow-0">
        <ControllersLayout />
      </div>
      <div className="h-full w-full grow">
        <HTLayout />
      </div>
    </div>
  );
}

export default App;
