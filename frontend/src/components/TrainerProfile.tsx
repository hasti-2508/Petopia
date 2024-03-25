"use client";
import { Service } from "@/interfaces/service";
import { Trainer } from "@/interfaces/trainer";
import { Training } from "@/interfaces/training";
import axios from "axios";
import React, { useEffect, useState } from "react";

function TrainerProfile() {
  const [trainer, setTrainer] = useState<Trainer>();
  const [bookings, setBookings] = useState<Training[]>([]);

  const [activeTab, setActiveTab] = useState("profile");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const getUser = async (token: string) => {
    try {
      const response = await axios.post(`${process.env.HOST}/currentUser`, {
        jwt: token,
      });
      setTrainer(response.data);
      const bookingDetailsPromises = response.data.bookings.map(
        async (bookingId: string) => {
          const bookingResponse = await axios.get(
            `${process.env.HOST}/trainingBooking/${bookingId}`
          );
          return bookingResponse.data;
        }
      );
      const bookingDetails = await Promise.all(bookingDetailsPromises);
      setBookings(bookingDetails);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken) {
      getUser(storedToken);
    }
  }, []);

  const handleComplete = async (bookingId) => {
    try {
      await axios.patch(
        `${process.env.HOST}/trainingBooking/${bookingId}/complete`,
        {
          isComplete: true,
        }
      );

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error("Error completing booking:", error.response.data.message);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 border-gray-200">
              <div className="mb-4">
                {/* <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="profileImage"
                >
                  Profile Image
                </label> */}
                <img
                  className="w-40 h-40 rounded-full object-cover"
                  src={
                    trainer?.imageUrl
                      ? trainer.imageUrl
                      : "http://localhost:3000/assets/user.png"
                  }
                  alt="Profile Image"
                />
              </div>
              <div className="flex gap-56">
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Username :
                    </label>
                    <p className="text-gray-700">{trainer?.name}</p>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <p className="text-gray-700">{trainer?.email}</p>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="role"
                    >
                      Phone No:
                    </label>
                    <p className="text-gray-700">{trainer?.phoneNo}</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="role"
                    >
                      Years Of Experience
                    </label>
                    <p className="text-gray-700">
                      {trainer?.YearsOfExperience}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="role"
                    >
                      Number of Pets Trained
                    </label>
                    <p className="text-gray-700">
                      {trainer?.NumberOfPetTrained}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="role"
                    >
                      City
                    </label>
                    <p className="text-gray-700">{trainer?.city}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Trainings
                </label>
                {trainer?.trainings.map((training, index) => (
                  <div className="flex gap-1">
                    <img
                      src="http://localhost:3000/assets/bullet.webp"
                      className="w-5 h-5"
                    />
                    <p key={index} className="text-gray-700">
                      {training}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "ongoingBookings":
        return (
          <div>
            {bookings.length > 0 ? (
              bookings
                .filter((booking) => !booking.isCompleted)
                .map((booking, index) => (
                  <div
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    key={index}
                  >
                    <p>{`User Name: ${booking.user_name}`}</p>
                    <p>{`Address: ${booking.address}`}</p>
                    <p>{`City: ${booking.city}`}</p>
                    <p>{`Booking Date: ${booking.booking_date}`}</p>
                    <p>{`Booking Time: ${booking.booking_time}`}</p>
                    <p>{`Total Price: ${booking.totalPrice}`}</p>
                    {booking.isCompleted ? (
                      <span>Completed</span>
                    ) : (
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 no-underline"
                        onClick={() => handleComplete(booking._id)}
                      >
                        Complete
                      </button>
                    )}
                  </div>
                ))
            ) : (
              <p>You have no Trainings Assigned!</p>
            )}
          </div>
        );
      case "bookingHistory":
        return (
          <div>
            {bookings.length.toString()}
            {bookings.length > 0 ? (
              bookings
                .filter((booking) => booking.isCompleted)
                .map((booking, index) => (
                  <div
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    key={index}
                  >
                    <p>{`User Name: ${booking.user_name}`}</p>
                    <p>{`Address: ${booking.address}`}</p>
                    <p>{`City: ${booking.city}`}</p>
                    <p>{`Booking Date: ${booking.booking_date}`}</p>
                    <p>{`Booking Time: ${booking.booking_time}`}</p>
                    <p>{`Total Price: ${booking.totalPrice}`}</p>
                  </div>
                ))
            ) : (
              <p>You have no completed trainings!</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className=" p-9 bg-white border border-gray-200 rounded-lg shadow m-8 border-1">
        {" "}
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                onClick={() => handleTabClick("profile")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "profile"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-black hover:border-black "
                }`}
              >
                Profile
              </button>
            </li>

            <li className="me-2">
              <button
                onClick={() => handleTabClick("ongoingBookings")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "ongoingBookings"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-black hover:border-black "
                }`}
              >
                Ongoing Trainings
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("bookingHistory")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "bookingHistory"
                    ? "border-blue-600 text-blue-500 "
                    : "border-transparent text-gray-600 hover:text-black hover:border-black "
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

export default TrainerProfile;
