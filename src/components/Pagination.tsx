import { useEffect } from "react"
import { PaginationProps } from "../types"

const Pagination: React.FC<PaginationProps> = ({ onNext, onPrev, currentPage, totalPages, setCurrentPage }) => {
  
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [currentPage, setCurrentPage, totalPages])

  return (
    <div className="pagination">
      <div className="pagination-buttons">
        {currentPage > 1 && totalPages > 1 && <button onClick={onPrev}>Previous</button>}
        <button onClick={onNext} disabled={currentPage >= totalPages}>Next</button>
      </div>
      {totalPages > 0 && <div className="page-numbers">Page {currentPage} of {totalPages}</div>}
    </div>
  )
}

export default Pagination
