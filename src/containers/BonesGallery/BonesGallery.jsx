import s from "./bones-gallery.module.scss";
import { Tabs } from "../../components/Tabs";
import { BonesCard } from "./components/BonesCard/index.js";
import { Pagination } from "../../components/Pagination/index.js";
import { useBonesContext } from "../../hooks/useBonesContext.js";
import { useEffect, useMemo, useState } from "react";
import { useFiltersContext } from "../../hooks/useFiltersContext.js";
import { DATA_CLASSNAMES } from "../../utils/consts.js";

const TABS = [
  { label: "All groups", value: "" },
  { label: "Train", value: "train" },
  { label: "Valid", value: "valid" },
  { label: "Test", value: "test" },
];

const ITEMS_PER_PAGE = 36;

export const BonesGallery = () => {
  const { tab, setTab, data } = useBonesContext();
  const { filters, range } = useFiltersContext();
  const [page, setPage] = useState(0);

  const items = useMemo(
    () =>
      (tab ? data[tab] : [...data.train, ...data.valid, ...data.test]).filter(
        (item) => {
          let passFilters = filters.length
            ? item.labels?.some(({ className }) =>
                filters.includes(DATA_CLASSNAMES[className])
              )
            : true;

          let passRange =
            item.labels?.length >= range[0] && item.labels?.length <= range[1];

          return passFilters && passRange;
        }
      ),
    [tab, filters, range, data]
  );
  const pageItems = items
    .slice(
      (page + 1) * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
      (page + 1) * ITEMS_PER_PAGE
    )
    .sort();

  useEffect(() => {
    setPage(0);
  }, [tab, filters, range]);

  const Panel = () => (
    <div className={s.bonesGalleryWrapper}>
      <div className={s.bonesGalleryCards}>
        {pageItems.map(({ lowResPath, highResPath, label, labels }) => {
          return (
            <BonesCard
              key={lowResPath}
              lowResImage={lowResPath}
              highResImage={highResPath}
              title={label}
              details={labels}
            />
          );
        })}
      </div>
      <Pagination
        pageCount={Math.ceil(items.length / ITEMS_PER_PAGE)}
        onPageChange={({ selected }) => setPage(selected)}
        forcePage={page}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
      />
    </div>
  );

  return (
    <div className={s.bonesGallery}>
      <div className={s.bonesGalleryHeader}>
        <p className={s.bonesGalleryTitle}>Bone-fracture-detection</p>
        <div className={s.bonesGalleryCounter}>
          <strong>{pageItems.length}</strong> of <strong>{items.length}</strong>{" "}
          images
        </div>
      </div>
      <Tabs
        tabs={TABS.map(({ label }) => label)}
        onSelect={(index) => setTab(TABS[index].value)}
        panels={[
          <Panel key="all" />,
          <Panel key="train" />,
          <Panel key="valid" />,
          <Panel key="test" />,
        ]}
      />
    </div>
  );
};
