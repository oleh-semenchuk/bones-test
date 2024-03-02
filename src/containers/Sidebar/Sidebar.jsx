import { CLASSNAME_TO_COLOR, DATA_CLASSNAMES } from "../../utils/consts.js";
import { TagButton } from "../../components/TagButton";
import s from "./sidebar.module.scss";
import TrashIcon from "../../assets/images/trash.svg";
import { RangeInput } from "../../components/RangeInput";
import { capitalizeFirstLetter } from "../../utils/functions.js";
import { useFiltersContext } from "../../hooks/useFiltersContext.js";

export const Sidebar = () => {
  const {
    range,
    filters,
    clearFilters,
    removeFilter,
    addFilter,
    setRange,
    setFilters,
  } = useFiltersContext();

  return (
    <div className={s.sidebar}>
      <img src="/assets/images/logo.png" alt="logo" className={s.sidebarLogo} />
      <div className={s.sidebarSection}>
        <p>Classes filter</p>
        <div className={s.sidebarFiltersHeader}>
          <button
            className={s.sidebarFiltersHeaderButton}
            onClick={() => setFilters(DATA_CLASSNAMES)}
            disabled={filters.length === DATA_CLASSNAMES.length}
          >
            Select all
          </button>
          <button
            className={s.sidebarFiltersHeaderButton}
            onClick={() => setFilters([])}
            disabled={!filters.length}
          >
            Deselect all
          </button>
        </div>
        <div className={s.sidebarFilters}>
          {DATA_CLASSNAMES.map((classname) => {
            const isActive = filters.find((filter) => classname === filter);

            return (
              <TagButton
                key={classname}
                text={capitalizeFirstLetter(classname)}
                onClick={
                  !isActive
                    ? () => addFilter(classname)
                    : () => removeFilter(classname)
                }
                color={CLASSNAME_TO_COLOR[classname]}
                selected={isActive}
              />
            );
          })}
        </div>
      </div>
      <div className={s.sidebarSection}>
        <p>Poligon range</p>
        <div className={s.sidebarRangeContainer}>
          <RangeInput
            step={1}
            max={4}
            min={0}
            values={range}
            setValues={setRange}
          />
        </div>
      </div>
      <div className={s.sidebarFooter}>
        <button className={s.sidebarClearBtn} onClick={clearFilters}>
          <img src={TrashIcon} />
          Clear Filters
        </button>
        <button className={s.sidebarHelpBtn}>Need help?</button>
      </div>
    </div>
  );
};
