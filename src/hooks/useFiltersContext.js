import { useContext } from "react";
import { FiltersContext } from "../contexts/FiltersContext.jsx";

export const useFiltersContext = () => useContext(FiltersContext);
