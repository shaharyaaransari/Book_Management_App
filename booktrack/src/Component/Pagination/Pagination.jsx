import React from 'react'
import './Pagination.css'
export const Pagination = ({totalPages,setPage ,page}) => {
    const handlePageChange = (newPage) => {
        setPage(newPage);
      };
  return (
    <div className='pagination'> {[...Array(totalPages)].map((_, i) => (
        <button key={i} onClick={() => handlePageChange(i + 1)} disabled={i+1===page}>
          {i + 1}
        </button>
      ))}</div>
  )
}
