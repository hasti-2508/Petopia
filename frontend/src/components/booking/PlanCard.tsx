import React from "react";
import RateStar from "../rating/RateStar";

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

          <RateStar averageRating={plan.average_rating}/>
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
