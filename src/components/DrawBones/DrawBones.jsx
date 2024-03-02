import React, { useEffect, useRef, useState } from "react";
import s from "../../containers/BonesGallery/components/BonesCard/bones-card.module.scss";
import { Layer, Line, Rect, Stage, Text } from "react-konva";
import { CLASSNAME_TO_COLOR, DATA_CLASSNAMES } from "../../utils/consts.js";
import { hexToRgb } from "../../utils/functions.js";

const calculateBoundingBox = (coordinates) => {
  const len = coordinates.length;

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (let i = 0; i < len; i += 2) {
    const x = coordinates[i];
    const y = coordinates[i + 1];

    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  const width = maxX - minX;
  const height = maxY - minY;

  const topLeftX = minX;
  const topLeftY = minY;

  return [topLeftX, topLeftY, width, height];
};

export const DrawBones = ({
  details,
  imgSrc,
  containerClassName,
  imageClassName,
  title,
  strokeWidth,
  fontSize,
}) => {
  const canvasContainerRef = useRef(null);
  const [sizes, setSizes] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleResize = () =>
      setSizes({
        w: canvasContainerRef.current?.offsetWidth,
        h: canvasContainerRef.current?.offsetHeight,
      });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={containerClassName} ref={canvasContainerRef}>
      <img
        src={imgSrc}
        onLoad={() =>
          setSizes(() => ({
            w: canvasContainerRef.current?.offsetWidth,
            h: canvasContainerRef.current?.offsetHeight,
          }))
        }
        className={imageClassName}
        alt={title}
      />
      <Stage className={s.canvas} width={sizes.w} height={sizes.h}>
        <Layer>
          {details?.map(({ coords, className }, index) => {
            const boundingBox = calculateBoundingBox(coords);
            const rgbColor = hexToRgb(
              CLASSNAME_TO_COLOR[DATA_CLASSNAMES[className]]
            );

            return (
              <>
                <Rect
                  x={boundingBox[0] * sizes.w}
                  y={boundingBox[1] * sizes.h - fontSize * 1.2}
                  width={boundingBox[2] * sizes.w}
                  height={fontSize * 1.2}
                  fill={CLASSNAME_TO_COLOR[DATA_CLASSNAMES[className]]}
                  cornerRadius={strokeWidth * 4}
                />
                <Rect
                  x={boundingBox[0] * sizes.w}
                  y={boundingBox[1] * sizes.h - fontSize * 1.2}
                  width={boundingBox[2] * sizes.w}
                  height={boundingBox[3] * sizes.h + fontSize * 1.2}
                  stroke={CLASSNAME_TO_COLOR[DATA_CLASSNAMES[className]]}
                  strokeWidth={strokeWidth * 2}
                  cornerRadius={strokeWidth * 4}
                />
                <Line
                  key={index}
                  points={coords.map((point, index) =>
                    index % 2 ? sizes.h * point : sizes.w * point
                  )}
                  closed
                  stroke={CLASSNAME_TO_COLOR[DATA_CLASSNAMES[className]]}
                  fill={`rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.15)`}
                  strokeWidth={strokeWidth}
                />
                <Text
                  x={(boundingBox[0] + boundingBox[0] * 0.01) * sizes.w}
                  y={boundingBox[1] * sizes.h - fontSize}
                  ellipsis
                  width={boundingBox[2] * sizes.w}
                  wrap="none"
                  text={DATA_CLASSNAMES[className] + ` ${index}`}
                  fontSize={fontSize}
                />
              </>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};
