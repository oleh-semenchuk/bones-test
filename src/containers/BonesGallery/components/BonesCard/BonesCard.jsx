import s from "./bones-card.module.scss";
import { OverflowTooltip } from "../../../../components/OverflowTooltip/";
import { Modal } from "../../../../components/Modal/";
import { useState } from "react";
import {
  CLASSNAME_TO_COLOR,
  DATA_CLASSNAMES,
} from "../../../../utils/consts.js";
import { DrawBones } from "../../../../components/DrawBones/index.js";
export const BonesCard = ({ title, details, lowResImage, highResImage }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const modalToggler = () => setIsModalOpened((prevState) => !prevState);

  return (
    <>
      <div onClick={modalToggler} className={s.card}>
        <div className={s.cardImageContainer}>
          <DrawBones
            details={details}
            imageClassName={s.detailsImage}
            containerClassName={s.cardImageDrawContainer}
            imgSrc={lowResImage}
            title={title}
            strokeWidth={0.5}
            fontSize={2}
          />
        </div>
        <OverflowTooltip>{title}</OverflowTooltip>
      </div>
      <Modal
        onClose={modalToggler}
        open={isModalOpened}
        title={title}
        content={
          <>
            <p className={s.detailsTitle}>Details:</p>
            <div className={s.details}>
              {details?.map(({ className }, index) => (
                <div
                  key={index}
                  className={s.detailsItem}
                  style={{
                    background: CLASSNAME_TO_COLOR[DATA_CLASSNAMES[className]],
                  }}
                >
                  {DATA_CLASSNAMES[className] + ` ${index}`}
                </div>
              ))}
            </div>
            <DrawBones
              details={details}
              imageClassName={s.detailsImage}
              containerClassName={s.canvasContainer}
              imgSrc={highResImage}
              title={title}
              strokeWidth={1.5}
              fontSize={12}
            />
          </>
        }
      />
    </>
  );
};
