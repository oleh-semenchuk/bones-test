import ReactPaginate from "react-paginate";
import leftArrowIcon from "../../assets/images/leftArrow.svg";
import s from "./pagination.module.scss";

export const Pagination = (props) => {
  return (
    <ReactPaginate
      previousLabel={<img src={leftArrowIcon} alt="prev" />}
      nextLabel={
        <img
          src={leftArrowIcon}
          style={{
            transform: "rotate(180deg)",
          }}
          alt="next"
        />
      }
      pageRangeDisplayed={3}
      marginPagesDisplayed={3}
      containerClassName={s.pagination}
      nextClassName={s.next}
      previousClassName={s.prev}
      activeClassName={s.active}
      pageClassName={s.page}
      pageLinkClassName={s.link}
      breakClassName={s.break}
      disabledClassName={s.disabled}
      {...props}
    />
  );
};
