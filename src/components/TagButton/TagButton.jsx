import s from "./tag-button.module.scss";
import { hexToRgb } from "../../utils/functions.js";

export const TagButton = ({ text, onClick, color, selected }) => {
  const rgbColor = hexToRgb(color);

  return (
    <button
      onClick={onClick}
      className={s.tag}
      style={{
        borderColor: color,
        background: selected
          ? `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`
          : "",
      }}
    >
      <span
        className={s.tagDot}
        style={{
          background: color,
        }}
      />
      {text}
    </button>
  );
};
