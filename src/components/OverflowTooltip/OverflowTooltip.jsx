import { useRef, useEffect, useState } from "react";
import Tooltip from "rc-tooltip";
import s from "./overflow-tooltip.module.scss";
import "./tooltip.scss";

export const OverflowTooltip = ({ children }) => {
  const textElementRef = useRef();

  const compareSize = () => {
    const compare =
      textElementRef.current?.scrollWidth > textElementRef.current?.clientWidth;

    setHover(compare);
  };

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
  }, []);

  useEffect(
    () => () => {
      window.removeEventListener("resize", compareSize);
    },
    []
  );

  const [hoverStatus, setHover] = useState(false);

  return (
    <Tooltip
      placement="bottom"
      trigger={hoverStatus ? ["hover"] : []}
      overlay={<span>{children}</span>}
    >
      <p ref={textElementRef} className={s.text}>
        {children}
      </p>
    </Tooltip>
  );
};
