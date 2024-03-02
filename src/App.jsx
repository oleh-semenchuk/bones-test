import s from "./App.module.scss";
import { Sidebar } from "./containers/Sidebar";
import { BonesGallery } from "./containers/BonesGallery";
import { BonesContextProvider } from "./contexts/BonesContext.jsx";
import { FiltersContextProvider } from "./contexts/FiltersContext.jsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    alert("8h");
  }, []);
  return (
    <FiltersContextProvider>
      <BonesContextProvider>
        <div className={s.container}>
          <Sidebar />
          <BonesGallery />
        </div>
      </BonesContextProvider>
    </FiltersContextProvider>
  );
}

export default App;
