import Image from "next/image";
import React from "react";
import ReactPaginate from "react-paginate";
import icon from "@/assets/images/candidates/right_arrow.svg";
import icon_2 from "@/assets/images/candidates/left_arrow.svg";

// prop type
type IProps = {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
};

const Pagination = ({ handlePageClick, pageCount }: IProps) => {
  return (
    <ReactPaginate
      className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none"
      breakLabel="..."
      activeClassName="active"
      nextLabel={
        <span className="d-flex align-items-center">
          Last <Image src={icon} alt="icon" className="ms-2" width={14} height={14}/>
        </span>
      }
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={
        <span className="d-flex align-items-center">
          <Image src={icon_2} className="me-2" alt="icon" width={14} height={14}/> Prev
        </span>
      }
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
