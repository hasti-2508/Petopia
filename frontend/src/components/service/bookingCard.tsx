import React, { useState } from "react";
import RateStar from "../rating/RateStar";
import RatingModal from "../rating/Rating";

const BookingCard = ({
  imageUrl,
  bookings,
  booking,
  index,
  handleRatingSubmit,
  Rating,
  worker,
  plan,
  workerName,
}) => {
  const [showDetails, setShowDetails] = useState(
    Array(bookings?.length).fill(false)
  );
  const [id, setId] = useState<string>(null);

  const toggleDetails = (index) => {
    setShowDetails((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };
  const handleId = (id) => {
    setId(id);
  };

  return (
    <div
      style={{
        height: showDetails[index] ? "auto" : "380px",
        width: "385px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
      className=" fade-in-up max-w-sm rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom"
      key={index}
    >
      <div
        style={{
          width: "100%",
          height: "210px",
          objectFit: "cover",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt={`service ${index}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        className="flex justify-evenly mt-4 text-dark-blue"
        style={{ marginTop: "10px" }}
      >
        <h5>{plan}</h5>
        <h5 className="text-red-500">₹{booking.totalPrice}/-</h5>
      </div>
      <div
        style={{ fontSize: "16px" }}
        className="text-dark-blue font-medium mb-1"
      >
        {booking.booking_name}
      </div>
      <div className="flex justify-evenly">
        <p className="font-medium text-gray-500">{booking.booking_date}</p>
        <p>
          {(() => {
            const timeParts = booking.booking_time.split(":");
            const hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);

            // Convert 24-hour format to 12-hour format
            let formattedHours = hours % 12;
            if (formattedHours === 0) formattedHours = 12;

            // Determine if it's AM or PM
            const period = hours >= 12 ? "PM" : "AM";

            // Format minutes with leading zero if necessary
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            return `${formattedHours}:${formattedMinutes} ${period}`;
          })()}
        </p>
      </div>
      <div>
        {booking.isCompleted ? (
          <div className="flex justify-evenly">
            <div className="mt-2.5">
              <RateStar averageRating={booking.averageRating} />
            </div>
            {!booking.averageRating && (
              <div>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  onClick={() => handleId(booking._id)}
                  className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline justify-end  ml-auto"
                  style={{ width: "68px" }}
                >
                  Rate
                </button>
                <RatingModal
                  handleRating={Rating}
                  handleSubmit={handleRatingSubmit}
                  id={id}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-red-500 text-center">
            The Booking isn't completed yet!
          </p>
        )}
      </div>
      <button
        onClick={() => toggleDetails(index)}
        className="flex justify-center text-gray-700 m-3 cursor-pointer"
      >
        {showDetails[index] ? "Hide Details▲" : "View Details▼"}
      </button>
      {showDetails[index] && (
        <div>
          <div className="px-4">
            <h5 className="text-saddle-brown">{workerName} Details:</h5>
            {worker ? (
              <div className="px-6 py-3">
              <div className="font-bold text-xl mb-2 text-dark-blue ">{worker.name}</div>
              <div className="text-gray-700 text-base">
                <div className="row justify-content-between">
                  <div className="col-md-6 mb-2">
                    <label htmlFor="species" className="font-bold text-dark-blue  ">
                      Email:
                    </label>
                    <div className="fw-medium">{worker.email}</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="species" className="font-bold text-dark-blue  ">
                      Address:
                    </label>
                    <div className="fw-medium">{worker.address}</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="species" className="font-bold text-dark-blue  ">
                      Phone No:
                    </label>
                    <div className="fw-medium">{worker.phoneNo}</div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="species" className="font-bold text-dark-blue  ">
                      City:
                    </label>
                    <div className="fw-medium">{worker.city}</div>
                  </div>           
                </div>
              </div>
            </div>
            ) : (
              <div className="text-red-500 text-center mb-1">
                No {workerName} Assigned yet!
              </div>
            )}
          </div>
          <div className="px-4">
            <h5 className="text-saddle-brown">Pet Details:</h5>
            <div className="px-6 py-3">
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Species:
              </label>
              <div className="fw-medium">{booking.pet_species}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Breed:
              </label>
              <div className="fw-medium">{booking.pet_breed}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                age:
              </label>
              <div className="fw-medium">{booking.pet_age}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                aggressiveness:
              </label>
              <div className="fw-medium">{booking.aggressiveness}</div>
            </div>           
          </div>
        </div>
      </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BookingTrainingCard = ({
  imageUrl,
  bookings,
  booking,
  index,
  handleComplete,
  plan,
}) => {
  const [showDetails, setShowDetails] = useState(
    Array(bookings?.length).fill(false)
  );

  const toggleDetails = (index) => {
    setShowDetails((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  return (
    <div
      style={{
        height: showDetails[index] ? "auto" : "380px",
        width: "395px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
      className="max-w-sm rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom"
      key={index}
    >
      <div
        style={{
          width: "100%",
          height: "170px",
          objectFit: "cover",
          overflow: "hidden",
        }}
      >
        <img
          src={imageUrl}
          alt={`service ${index}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        className="flex justify-evenly mt-4 text-dark-blue"
        style={{ marginTop: "10px" }}
      >
        <h5>{plan}</h5>
        <h5 className="text-red-500">₹{booking.totalPrice}/-</h5>
      </div>
      <div
        style={{ fontSize: "16px" }}
        className="text-dark-blue font-medium mb-1"
      >
        {booking.booking_name}
      </div>
      <div className="flex justify-evenly">
        <p className="font-medium text-gray-500">{booking.booking_date}</p>
        <p>
          {(() => {
            const timeParts = booking.booking_time.split(":");
            const hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);

            // Convert 24-hour format to 12-hour format
            let formattedHours = hours % 12;
            if (formattedHours === 0) formattedHours = 12;

            // Determine if it's AM or PM
            const period = hours >= 12 ? "PM" : "AM";

            // Format minutes with leading zero if necessary
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

            return `${formattedHours}:${formattedMinutes} ${period}`;
          })()}
        </p>
      </div>
      <div>
        {booking.isCompleted ? (
          <div className="flex justify-evenly">
            <div className="mt-2.5">
              <RateStar averageRating={booking.averageRating} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 no-underline"
              onClick={() => handleComplete(booking._id)}
            >
              Complete
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => toggleDetails(index)}
        className="flex justify-center text-gray-700 m-3 cursor-pointer"
      >
        {showDetails[index] ? "Hide Details▲" : "View Details▼"}
      </button>
      {showDetails[index] && (
        <div>
          <div className="px-4">
            <h5 className="text-amber-500">User Details:</h5>
            <div className="px-6 py-3">
        <div className="font-bold text-xl mb-2 text-dark-blue ">{booking.user_name}</div>
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Email:
              </label>
              <div className="fw-medium">{booking.email}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Address:
              </label>
              <div className="fw-medium">{booking.address}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Phone No:
              </label>
              <div className="fw-medium">{booking.phoneNo}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                City:
              </label>
              <div className="fw-medium">{booking.city}</div>
            </div>           
          </div>
        </div>
      </div>
          </div>
          <div className="px-4">
            <h5 className="text-amber-500">Pet Details:</h5>
            <div className="px-6 py-3">
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Species:
              </label>
              <div className="fw-medium">{booking.pet_species}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Breed:
              </label>
              <div className="fw-medium">{booking.pet_breed}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                age:
              </label>
              <div className="fw-medium">{booking.pet_age}</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                aggressiveness:
              </label>
              <div className="fw-medium">{booking.aggressiveness}</div>
            </div>           
          </div>
        </div>
      </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { BookingCard, BookingTrainingCard };
