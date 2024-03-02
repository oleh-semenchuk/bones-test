import { createContext, useState } from "react";

export const FiltersContext = createContext({
  filters: [],
  range: [0, 0],
  addFilter: () => undefined,
  removeFilter: () => undefined,
  clearFilters: () => undefined,
  setRange: () => undefined,
  setFilters: () => undefined,
});

export const FiltersContextProvider = ({ children }) => {
  const [filters, setFilters] = useState([]);
  const [range, setRange] = useState([0, 4]);

  const addFilter = (filter) =>
    setFilters((prevState) => [...prevState, filter]);

  const removeFilter = (filter) =>
    setFilters((prevState) => prevState.filter((item) => item !== filter));

  const clearFilters = () => {
    setFilters([]);
    setRange([0, 4]);
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        range,
        addFilter,
        removeFilter,
        clearFilters,
        setRange,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
