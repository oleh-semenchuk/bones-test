import { Range } from "react-range";
import s from "./range-input.module.scss";

export const RangeInput = ({ step, min, max, values, setValues }) => {
  return (
    <div>
      <div className={s.labels}>
        <p>
          min <strong>{min}</strong>
        </p>
        <p>
          max <strong>{max}</strong>
        </p>
      </div>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
            }}
            className={s.trackContainer}
            ref={props.ref}
          >
            {children}
            <div className={s.track}>
              {[...Array(max - min)].map((_v, index) => (
                <div
                  key={index}
                  className={`${s.separateTrack} ${
                    index < values[0] && s.separateTrackBordered
                  } ${index + 1 > values[1] && s.separateTrackBordered}`}
                />
              ))}
            </div>
          </div>
        )}
        renderThumb={({ props }) => <div {...props} className={s.thumb} />}
      />
    </div>
  );
};
