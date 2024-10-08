"use client";
import { Service } from "@/interfaces/service";
import React, { useEffect } from "react";
import { VetCard } from "./VetCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setActiveVetTab,
  setBookingImages,
  setBookings,
  setIsChecked,
} from "@/redux/vet/vetSlice";
import {
  getServiceBookingData,
  getVetData,
  setAvailable,
  setBookingComplete,
} from "@/redux/vet/vetService";
import toast from "react-hot-toast";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import { useRouter } from "next/navigation";
import { BookingTrainingCard } from "../service/bookingCard";



const imageUrls = [
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379492/service1_z2p9ks.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379493/service2_wmunls.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379495/service3_xcrwad.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379495/service4_yuurit.jpg",
];

function VetProfile() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {
    vet,
    bookings,
    isChecked,
    bookingImages,
    activeVetTab,
    isLoading,
  } = useSelector((state: RootState) => state.vet);
  const handleTabClick = (tab: string) => {
    dispatch(setActiveVetTab(tab));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await dispatch(getVetData());
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
       router.push("/home");
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
console.log(bookings)
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
      console.error(error);
    }
  };
  const renderTabContent = () => {
    switch (activeVetTab) {
      case "Profile":
        return (
          <div>
            <div>
              <>
                <div className="flex justify-between relative fade-in-up ">
                  <VetCard user={vet} />
                  <div className="flex flex-col items-center">
                    <h1
                      style={{ fontSize: "18px" }}
                      className="inline-block rounded-t-lg border-transparent text-dark-blue hover:text-saddle-brown"
                    >
                      Are you free for having call?
                    </h1>
                    <label className="inline-flex items-center cursor-pointer  rounded-xl  no-underline mx-3">
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
                          <span className="font-bold text-xl mb-2 text-saddle-brown">
                            Available
                          </span>
                        ) : (
                          <span className="font-bold text-xl mb-2 text-gray-600">
                            Not Available
                          </span>
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              </>
            </div>
          </div>
        );
      case "ongoingBookings":
        return (
          <div>
            <div className="container-fluid mt-3">
              <div className="row">
                {bookings.length > 0 &&
                bookings.filter((booking) => !booking.isCompleted).length >
                  0 ? (
                  bookings
                    .filter((booking) => !booking.isCompleted)
                    .map((booking, index) => (
                      <div
                      className="fade-in-up col-md-4 mb-6 flex"
                      key={index}
                    >
                      <BookingTrainingCard averageRating={booking.averageRating} index={index} plan={booking.servicePlanId.serviceName} imageUrl={bookingImages[index]} bookings={bookings} booking={booking} handleComplete={handleComplete}/>
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
                      className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl"
                    >
                      You have no service Assigned!
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
              <div className="row ">
                {bookings.length > 0 &&
                bookings.filter((booking) => booking.isCompleted).length > 0 ? (
                  bookings
                    .filter((booking) => booking.isCompleted)
                    .map((booking, index) => (
                      <div
                      className="fade-in-up col-md-4 mb-6 flex"
                      key={index}
                    >
                      <BookingTrainingCard averageRating={booking.averageRating} index={index} plan={booking.servicePlanId.serviceName} imageUrl={bookingImages[index]} bookings={bookings} booking={booking} handleComplete={handleComplete}/>
                      </div>
                    ))
                ) : (
                  <div
                    style={{ height: "80vh" }}
                    className="flex flex-col mb-3 items-center justify-center fade-in-up  "
                  >
                    <img
                      src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379478/NoTraining_iunkho.jpg"
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
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <img
          style={{ width: "150px", height: "150px" }}
          className=" rounded-pill my-40 "
          src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379485/profile_yxwpc3.gif"
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div className="fade-in-right">
      <div className="p-9">
        <div className="text-sm font-medium text-center text-gray-500 ">
          <ul className="flex flex-wrap -mb-px ">
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

export default redirectLoggedIn(VetProfile);
