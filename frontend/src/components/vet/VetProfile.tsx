"use client";
import { Service } from "@/interfaces/service";
import React, { useEffect, useState } from "react";
import { VetCard, VetUpdateCard } from "./VetCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setActiveVetTab,
  setBookingImages,
  setBookings,
  setEditedVet,
  setIsChecked,
  setVet,
  setVetIsEditing,
} from "@/redux/vet/vetSlice";
import {
  getServiceBookingData,
  getVetData,
  setAvailable,
  setBookingComplete,
  vetUpdate,
} from "@/redux/vet/vetService";
import toast from "react-hot-toast";

const imageUrls = [
  "http://localhost:3000/assets/service1.jpeg",
  "http://localhost:3000/assets/service2.jpeg",
  "http://localhost:3000/assets/service3.jpeg",
  "http://localhost:3000/assets/service4.jpeg",
];

function VetProfile() {
  const dispatch: AppDispatch = useDispatch();
  const {
    vet,
    bookings,
    isChecked,
    isEditing,
    editedVet,
    bookingImages,
    activeVetTab,
  } = useSelector((state: RootState) => state.vet);
  const handleTabClick = (tab: string) => {
    dispatch(setActiveVetTab(tab));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await dispatch(getVetData());
        if (result.type === "getVetData/rejected") {
          throw result;
        } else {
          dispatch(setEditedVet(result.payload));
          dispatch(setVet(result.payload));
        }
        const bookingDetailsPromises = result.payload.bookings.map(
          async (bookingId: string) => {
            const bookingResponse = await dispatch(
              getServiceBookingData(bookingId)
            );
            return bookingResponse.payload;
          }
        );
        const bookingDetails = await Promise.all(bookingDetailsPromises);
        dispatch(setBookings(bookingDetails));
      } catch (error) {
        toast.error(error.payload);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const randomImages = Array.from({ length: bookings.length }, () => {
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      return imageUrls[randomIndex];
    });

    dispatch(setBookingImages(randomImages));
  }, [bookings]);

  const handleEditClick = () => {
    dispatch(setVetIsEditing(true));
  };

  const handleCancelEdit = () => {
    dispatch(setVetIsEditing(false));
    dispatch(setEditedVet(vet));
  };

  const handleSaveEdit = async () => {
    dispatch(setVetIsEditing(false));
    try {
      const vetResult = await dispatch(
        vetUpdate({ editedVet, vetId: vet._id })
      );
      if (vetResult.type === "vetUpdate/rejected") {
        throw vetResult;
      } else {
        // dispatch(setVet(vetResult.payload));
        return vetResult;
      }
    } catch (error) {
      toast.error(error.payload);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditedVet({ [name]: value }));
  };

  const handleComplete = async (bookingId) => {
    try {
      const response = await dispatch(
        setBookingComplete({ bookingId, isComplete: true })
      );
      const bookingDetailsPromises = bookings.map(async (booking: Service) => {
        const bookingResponse = await dispatch(
          getServiceBookingData(booking._id)
        );
        return bookingResponse.payload;
      });

      const bookingDetails = await Promise.all(bookingDetailsPromises);
      dispatch(setBookings(bookingDetails));
    } catch (error) {
      toast.error(error.payload);
    }
  };

  const handleCheckboxChange = async () => {
    dispatch(setIsChecked(!isChecked));
    try {
      const availableResult = await dispatch(setAvailable(vet._id));
      if (availableResult.type === "setAvailable/rejected") {
        throw availableResult;
      } else {
        return availableResult;
      }
    } catch (error) {
      toast.error(error.payload);
    }
  };
  // const [soundPlayed, setSoundPlayed] = useState(false);
  // function Light({ value }) {
  //   useEffect(() => {
  //     if (value && !soundPlayed) {
  //       const audio = new Audio(
  //         "http://localhost:3000/assets/audio/emergency-alarm-with-reverb-29431.mp3"
  //       );
  //       audio.play();
  //       setSoundPlayed(true);
  //     }
  //   }, [value]);

  //   const lightClass = value ? "bg-red-500" : "bg-green-500";

  //   const divStyle = {
  //     width: "15px",
  //     height: "15px",
  //     borderRadius: "50%",
  //     // boxShadow:
  //     //   "0 0 10px 5px #fff, 0 0 20px 10px #fff, 0 0 20px 5px #fff, 0 0 20px 10px #fff, 0 0 25px 12px #fff, 0 0 30px 15px #fff, 0 0 35px 17px #fff",
  //     background: value
  //       ? "radial-gradient(circle, rgba(50, 205, 50, 1) 0%, rgba(0, 100, 0, 1) 100%)"
  //       : "radial-gradient(circle, rgba(255, 50, 50, 1) 0%, rgba(139, 0, 0, 1) 100%)",
  //   };

  //   return <div style={divStyle} />;
  // }
console.log(bookings)
  const renderTabContent = () => {
    switch (activeVetTab) {
      case "Profile":
        return (
          <div>
            <div>
              {isEditing ? (
                <>
                  <VetUpdateCard
                    editedUser={editedVet}
                    handleChange={handleChange}
                  />
                  <div className="flex mt-8 mx-6 ">
                    <button
                      className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-3"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between relative">
                    <VetCard user={vet} />
                    <div className="flex flex-col items-center">
                      <label className="inline-flex items-center cursor-pointer bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-3">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-dark-blue"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 ">
                          {isChecked ? (
                            <span className="font-bold text-xl mb-2">
                              Available
                            </span>
                          ) : (
                            <span className="font-bold text-xl mb-2">
                              Not Available
                            </span>
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* 
                  <div className="flex mt-12 mx-6">
                    <button
                      onClick={handleEditClick}
                      className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
                    >
                      Edit Profile
                    </button>
                  </div> */}
                </>
              )}
            </div>
          </div>
        );
      case "ongoingBookings":
        return (
          <div>
            {bookings.length > 0 &&
            bookings.filter((booking) => !booking.isCompleted).length > 0 ? (
              bookings
                .filter((booking) => !booking.isCompleted)
                .map((booking, index) => (
                  <div
                    style={{
                      height: "630px",
                      width: "400px",
                    }}
                    className="col-md-5 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                    key={index}
                  >
                    <div>
                      <img
                        src={bookingImages[index]}
                        alt={`Service ${index}`}
                        className="w-full h-48 mb-4 border-2"
                      />
                      <div>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Name:
                          </label>
                          {booking.user_name}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Email:
                          </label>
                          {booking.email}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            City:
                          </label>
                          {booking.city}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Pet Species:
                          </label>
                          {booking.pet_species}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Date:
                          </label>
                          {booking.booking_date}
                        </p>
                        <p>
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Time:
                          </label>
                          {booking.booking_time}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Payment Status:
                          </label>
                          {booking.isConfirmed ? `Done` : `Pending`}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Status:
                          </label>
                          {booking.isCompleted ? `Completed` : `Not Completed`}
                        </p>
                        <div className="my-4 ">
                          {booking.isCompleted ? (
                            <span className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 no-underline my-3">
                              Completed
                            </span>
                          ) : (
                            <button
                              className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 no-underline"
                              onClick={() => handleComplete(booking._id)}
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div style={
                {height: "80vh"}
              } className="flex flex-col mb-3 items-center justify-center">
                <img
                  src="http://localhost:3000/assets/NoTraining.jpg"
                  className="w-1/3 items-center"
                  alt=""
                />
                <p
                  style={{ fontSize: "18px" }}
                  className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl"
                >
                  You have no service Assigned!
                </p>
              </div>
            )}
          </div>
        );
      case "bookingHistory":
        return (
          <div>
            {bookings.length > 0 &&
            bookings.filter((booking) => booking.isCompleted).length > 0 ? (
              bookings
                .filter((booking) => booking.isCompleted)
                .map((booking, index) => (
                  <div
                    style={{
                      height: "630px",
                      width: "400px",
                    }}
                    className="col-md-4 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                    key={index}
                  >
                    <div>
                      <img
                        src={bookingImages[index]}
                        alt={`Service ${index}`}
                        className="w-full h-48 mb-4 border-2"
                      />
                      <div>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Name:
                          </label>
                          {booking.user_name}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Email:
                          </label>
                          {booking.email}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            City:
                          </label>
                          {booking.city}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Pet Species:
                          </label>
                          {booking.pet_species}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Date:
                          </label>
                          {booking.booking_date}
                        </p>
                        <p>
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Time:
                          </label>
                          {booking.booking_time}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Payment Status:
                          </label>
                          {booking.isConfirmed ? `Done` : `Pending`}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Status:
                          </label>
                          {booking.isCompleted ? `Completed` : `Not Completed`}
                        </p>

                        <div className="my-4 ">
                          {booking.isCompleted ? (
                            <span className="bg-green-600 text-white px-3 py-2 rounded-md mr-2 no-underline my-3">
                              Completed
                            </span>
                          ) : (
                            <button
                              className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 no-underline"
                              onClick={() => handleComplete(booking._id)}
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div style={
                {height: "80vh"}
              } className="flex flex-col mb-3 items-center justify-center">
                <img
                  src="http://localhost:3000/assets/NoTraining.jpg"
                  className="w-1/3 items-center"
                  alt=""
                />
                <p
                  style={{ fontSize: "18px" }}
                  className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl"
                >
                  You have no completed bookings!
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="p-9">
        <div className="text-sm font-medium text-center text-gray-500 ">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                style={{ fontSize: "18px" }}
                onClick={() => handleTabClick("Profile")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeVetTab === "Profile"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Profile
              </button>
            </li>

            <li className="me-2">
              <button
                style={{ fontSize: "18px" }}
                onClick={() => handleTabClick("ongoingBookings")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeVetTab === "ongoingBookings"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Ongoing Bookings
              </button>
            </li>
            <li className="me-2">
              <button
                style={{ fontSize: "18px" }}
                onClick={() => handleTabClick("bookingHistory")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeVetTab === "bookingHistory"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Booking History
              </button>
            </li>
          </ul>
        </div>
        <div className=" p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default VetProfile;
