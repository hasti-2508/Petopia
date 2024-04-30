import React from "react";

const PlanCard = ({ plan, handleBookService }) => {
  return (
    <div className="w-full p-4 max-w-sm border border-gray-200 rounded-lg shadow-2xl d-flex flex-column card-container">
      <h3 className="text-center font-semibold text-dark-blue mb-4">
        {plan.serviceName}
      </h3>
      <div className="border-2 gray-600"></div>
      <div className="px-2 pb-3 d-flex flex-column h-100">
        <div className="flex-grow-1">
          <ul className="list-disc list-inside mt-4">
            {plan.services.map((service, index) => (
              <div className="flex gap-4" key={index}>
                <img
                  src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379449/bullet_msybn6.webp"
                  className="w-5 h-5"
                  alt="bullet"
                />
                <li className="font-medium text-dark-blue">{service}</li>
              </div>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center mt-5 mb-4">
            {/* Rating stars */}
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[...Array(Math.round(plan.average_rating || 0))].map(
                (_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                )
              )}
              {/* Empty stars */}
              {[...Array(5 - Math.round(plan.average_rating || 0))].map(
                (_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                )
              )}
            </div>
            {/* Average rating */}
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {plan.average_rating || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl mt-4 font-bold text-gray-900 dark:text-red">
              ₹{plan.price}
            </span>
            <button
              onClick={() => handleBookService(plan._id)}
              className="text-gray-700 no-underline flex justify-center bg-saddle-brown py-2 px-3 mt-4 font-semibold rounded-lg fs-6 cursor-pointer"
            >
              Book Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
