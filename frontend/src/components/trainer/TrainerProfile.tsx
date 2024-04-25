"use client";
import { Training } from "@/interfaces/training";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getTrainerData,
  getTrainingBookingData,
  setTrainingComplete,
} from "@/redux/trainer/trainerService";
import {
  setActiveTrainerTab,
  setTrainings,
  setTrainingsImages,
} from "@/redux/trainer/trainerSlice";
import toast from "react-hot-toast";
import { TrainerCard } from "./TrainerCard";
import redirectLoggedIn from "@/middleware/redirectToLogin";
import { useRouter } from "next/navigation";

const images = [
  "http://localhost:3000/assets/training1.jpeg",
  "http://localhost:3000/assets/training2.jpeg",
  "http://localhost:3000/assets/training3.jpeg",
  "http://localhost:3000/assets/training4.jpeg",
  "http://localhost:3000/assets/training5.jpeg",
];

function TrainerProfile() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { trainer, trainings, trainingImages, activeTrainerTab } = useSelector(
    (state: RootState) => state.trainer
  );

  const handleTabClick = (tab: string) => {
    dispatch(setActiveTrainerTab(tab));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await dispatch(getTrainerData());
        if (result.type === "getTrainerData/rejected") {
          throw result;
        }
        else{
          const bookingDetailsPromises = result.payload.bookings.map(
            async (bookingId: string) => {
              const bookingResponse = await dispatch(
                getTrainingBookingData(bookingId)
              );
              return bookingResponse.payload;
            }
          );
          const bookingDetails = await Promise.all(bookingDetailsPromises);
          dispatch(setTrainings(bookingDetails));
        }
      } catch (error) {
        router.push("/home");
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const randomImages = Array.from({ length: trainings.length }, () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    });
    dispatch(setTrainingsImages(randomImages));
  }, [trainings]);

  const handleComplete = async (bookingId) => {
    try {
      const response = await dispatch(
        setTrainingComplete({ bookingId, isComplete: true })
      );
      const bookingDetailsPromises = trainings.map(
        async (booking: Training) => {
          const bookingResponse = await dispatch(
            getTrainingBookingData(booking._id)
          );
          return bookingResponse.payload;
        }
      );

      const bookingDetails = await Promise.all(bookingDetailsPromises);
      dispatch(setTrainings(bookingDetails));
    } catch (error) {
      toast.error(error.payload);
    }
  };

  const renderTabContent = () => {
    switch (activeTrainerTab) {
      case "Profile":
        return (
          <div>
            <div>
              <div className="flex justify-between relative fade-in-up w-1/3">
                <TrainerCard user={trainer} />
              </div>
            </div>
          </div>
        );
      case "ongoingBookings":
        return (
          <div>
            <div className="container-fluid mt-3">
              <div className="row gap-5">
                {trainings.length > 0 &&
                trainings.filter((booking) => !booking.isCompleted).length >
                  0 ? (
                  trainings
                    .filter((booking) => !booking.isCompleted)
                    .map((booking, index) => (
                      <div
                        style={{
                          height: "630px",
                          width: "400px",
                        }}
                        className="fade-in-up mx-auto col-md-5 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                        key={index}
                      >
                        <div>
                          <img
                            src={trainingImages[index]}
                            alt={`Service ${index}`}
                            className="w-full h-48 mb-4 border-2"
                            style={{ width: "350px" }}
                          />
                          <div>
                            <p>
                              <label
                                htmlFor="species"
                                className="font-bold text-dark-blue mx-2 "
                              >
                                Name:
                              </label>
                              {booking.user_name}
                            </p>
                            <p>
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
                  <div
                    style={{ height: "80vh" }}
                    className="flex flex-col mb-3 items-center justify-center fade-in-up"
                  >
                    <img
                      src="http://localhost:3000/assets/NoTraining.jpg"
                      className="w-1/3 items-center"
                      alt=""
                    />
                    <p
                      style={{ fontSize: "18px" }}
                      className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl "
                    >
                      You have no trainings Assigned!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "bookingHistory":
        return (
          <div>
            <div className="container-fluid mt-3">
              <div className="row">
                {trainings.length > 0 &&
                trainings.filter((booking) => booking.isCompleted).length >
                  0 ? (
                  trainings
                    .filter((booking) => booking.isCompleted)
                    .map((booking, index) => (
                      <div
                        style={{
                          height: "630px",
                          width: "400px",
                        }}
                        className="fade-in-up col-md-4 col-sm-12 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom py-4 mx-auto"
                        key={index}
                      >
                        <div className="mx-auto">
                          <img
                            src={trainingImages[index]}
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
                  <div
                    style={{ height: "80vh" }}
                    className="flex flex-col mb-3 items-center justify-center fade-in-up"
                  >
                    <img
                      src="http://localhost:3000/assets/NoTraining.jpg"
                      className="w-1/3 items-center"
                      alt=""
                    />
                    <p
                      style={{ fontSize: "18px" }}
                      className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl "
                    >
                      You have no completed Trainings!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fade-in-right">
      <div className=" p-9 ">
        <div className="text-sm font-medium text-center text-gray-500 ">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                style={{ fontSize: "18px" }}
                onClick={() => handleTabClick("Profile")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTrainerTab === "Profile"
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
                  activeTrainerTab === "ongoingBookings"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Ongoing Trainings
              </button>
            </li>
            <li className="me-2">
              <button
                style={{ fontSize: "18px" }}
                onClick={() => handleTabClick("bookingHistory")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTrainerTab === "bookingHistory"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Training History
              </button>
            </li>
          </ul>
        </div>
        <div className=" p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default redirectLoggedIn(TrainerProfile);
