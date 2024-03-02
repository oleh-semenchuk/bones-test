import s from "./modal.module.scss";
import ReactModal from "react-modal";
import CloseIcon from "../../assets/images/close.svg";

export const Modal = ({ title, open, content, onClose }) => {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      className={s.modal}
      overlayClassName={s.overlay}
      shouldCloseOnOverlayClick
      htmlOpenClassName={s.html}
    >
      <div className={s.header}>
        <p>{title}</p>
        <button onClick={onClose} className={s.close}>
          <img src={CloseIcon} alt="close" />
        </button>
      </div>
      <div>{content}</div>
    </ReactModal>
  );
};
