"use client";
import { Service } from "@/interfaces/service";
import { Vet } from "@/interfaces/vet";
import axiosInstance from "@/utils/axios";
import axios from "axios";
import React, { useEffect, useState } from "react";

function VetProfile() {
  const [vet, setVet] = useState<Vet>();
  const [bookings, setBookings] = useState<Service[]>([]);
  const [isChecked, setIsChecked] = useState(true);

  const [activeTab, setActiveTab] = useState("profile");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get('/currentUser');
        setVet(response.data);
        const bookingDetailsPromises = response.data.bookings.map(
          async (bookingId: string) => {
            const bookingResponse = await axios.get(
              `${process.env.HOST}/serviceBooking/${bookingId}`
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

    getUser();
  }, []);

  const handleComplete = async (bookingId) => {
    try {
      await axios.patch(
        `${process.env.HOST}/serviceBooking/${bookingId}/complete`,
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

  const handleCheckboxChange = async () => {
    setIsChecked(!isChecked);
    try {
      const response = await axios.patch(
        `${process.env.HOST}/vet/${vet._id}/available`
      );
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="flex justify-between">
                <div className="">
                  <label
                    className="block text-gray-700 text-sm font-bold mt-4 "
                    htmlFor="profileImage"
                  >
                    Profile Image
                  </label>
                </div>
                <label className="inline-flex items-center cursor-pointer mb-12">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 ">
                    {isChecked ? "Available" : "Not Available"}
                  </span>
                </label>
              </div>
              <img
                className="w-40 h-40 rounded-full object-cover mb-3"
                src={
                  vet?.imageUrl
                    ? vet.imageUrl
                    : "http://localhost:3000/assets/user.png"
                }
                alt="Profile Image"
              />
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <p className="text-gray-700">{vet?.name}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <p className="text-gray-700">{vet?.email}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Phone No:
                </label>
                <p className="text-gray-700">{vet?.phoneNo}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Years Of Experience
                </label>
                <p className="text-gray-700">{vet?.YearsOfExperience}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  City
                </label>
                <p className="text-gray-700">{vet?.city}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Services
                </label>
                {vet?.services.map((service, index) => (
                  <p key={index} className="text-gray-700">
                    {service}
                  </p>
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
              <p>You have no services Assigned!</p>
            )}
          </div>
        );
      case "bookingHistory":
        return (
          <div>
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
              <p>You have no completed bookings!</p>
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
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Profile
              </button>
            </li>

            <li className="me-2">
              <button
                onClick={() => handleTabClick("ongoingBookings")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "settings"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Ongoing Bookings
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("bookingHistory")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "contacts"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
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
