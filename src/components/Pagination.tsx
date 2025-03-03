import React from "react"
import { PaginationProps } from "../types"

const Pagination: React.FC<PaginationProps> = ({ onNext, onPrev, currentPage, totalPages }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && <button onClick={onPrev}>Previous</button>}
      <button onClick={onNext} disabled={currentPage >= totalPages}>Next</button>
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  )
}

export default Pagination
