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
import redirectLoggedIn from "@/hoc/redirectToLogin";
import { useRouter } from "next/navigation";
import { BookingTrainingCard } from "../service/bookingCard";

const images = [
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379498/training1_keizgq.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379501/training2_cj6etc.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379502/training3_rqukle.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379703/training4_jgxepu.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379708/training5_pssugp.jpg",
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
              <div className="row ">
                {trainings.length > 0 &&
                trainings.filter((booking) => !booking.isCompleted).length>
                  0 ? (
                  trainings
                    .filter((booking) => !booking.isCompleted)
                    .map((booking, index) => (
                      <div
                      className="fade-in-up col-md-4 mb-6 flex"
                      key={index}
                    >
                      <BookingTrainingCard averageRating={booking.averageRating} imageUrl={trainingImages[index]} bookings={trainings} booking={booking} plan={booking.TrainingPlanId.TrainingName} index={index} handleComplete={handleComplete}/>
                      </div>
                    ))
                ) : (
                  <div
                    style={{ height: "80vh" }}
                    className="flex flex-col mb-3 items-center justify-center fade-in-up"
                  >
                    <img
                      src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379478/NoTraining_iunkho.jpg"
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
                      className="fade-in-up col-md-4 mb-6 flex"
                      key={index}
                    >
                      <BookingTrainingCard averageRating={booking.averageRating} imageUrl={trainingImages[index]} bookings={trainings} booking={booking} plan={booking.TrainingPlanId.TrainingName} index={index} handleComplete={handleComplete}/>
                      </div>
                    ))
                ) : (
                  <div
                    style={{ height: "80vh" }}
                    className="flex flex-col mb-3 items-center justify-center fade-in-up"
                  >
                    <img
                      src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379478/NoTraining_iunkho.jpg"
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
