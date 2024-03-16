import React from 'react'
interface PaginationProps {
    Previous: () => void;
    Next: () => void;
  }

function Pagination({Previous,Next}:PaginationProps) {   
  return (
    <div>
         <div className="flex justify-center m-5">
        <button
          onClick={Previous}
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
          className="no-underline flex items-center justify-center px-3 h-8 text-sm font-medium
           text-dark-blue bg-saddle-brown border border-gray-900 rounded-lg hover:bg-white hover:text-gray-700
           focus:ring-2 focus:outline-none focus:ring-dark-blue mr-5"
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </button>

        <button
          onClick={Next}
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
          className="no-underline flex items-center justify-center px-3 h-8 text-sm font-medium
           text-dark-blue bg-saddle-brown border border-gray-900 rounded-lg hover:bg-white hover:text-gray-700
           focus:ring-2 focus:outline-none focus:ring-dark-blue"
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
      
    </div>
  )
}

export default Pagination
