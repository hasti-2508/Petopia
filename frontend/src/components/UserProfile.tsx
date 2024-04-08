"use client";
import { Pet } from "@/interfaces/pet";
import { Service } from "@/interfaces/service";
import { Training } from "@/interfaces/training";
import { User } from "@/interfaces/user";
import axiosInstance from "@/utils/axios";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState<User>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [service, setService] = useState<Service[]>([]);
  const [training, setTraining] = useState<Training[]>([]);
  const [rate, setRate] = useState<number>();
  const [serviceId, setServiceId] = useState<string>();

  const [activeTab, setActiveTab] = useState("Profile");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get("/currentUser");
        setUser(response.data);

        const petResponse = await axios.get(
          `${process.env.HOST}/user/${response.data._id}`
        );
        const { pets } = petResponse.data;
        setPets(pets);

        const serviceBooking = await axios.get(
          `${process.env.HOST}/serviceBooking/user/${response.data._id}`
        );
        setService(serviceBooking.data);

        const trainingBooking = await axios.get(
          `${process.env.HOST}/trainingBooking/${response.data._id}`
        );
        setTraining(trainingBooking.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const Rating = (value: number) => {
    setRate(value);
  };
  const handleSubmit = async (servicePlanId: string) => {
    try {
      // const token = localStorage.getItem("jwt");
      // const data = { rating: rate, jwt: token };
      // console.log(token);
      // console.log(servicePlanId);
      // const rating = await axios.post(
      //   `${process.env.HOST}/serviceBooking/${servicePlanId}/rate`,
      //   data
      // );

      const data = { rating: rate };
      const rating = await axiosInstance.post(
        `serviceBooking/${servicePlanId}/rate`,
        data
      );
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        alert("you have already rated this service!");
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        alert("Booking not found!");
      } else {
        console.error("Error posting booking data:", error);
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="profileImage"
                >
                  Profile Image
                </label>
                <img
                  className="w-40 h-40 rounded-full object-cover"
                  //   src={user.profileImage}
                  src={
                    user?.imageUrl
                      ? user.imageUrl
                      : "http://localhost:3000/assets/user.png"
                  }
                  alt="Profile Image"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <p className="text-gray-700">{user?.name}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <p className="text-gray-700">{user?.email}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Phone No:
                </label>
                <p className="text-gray-700">{user?.phoneNo}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  Address
                </label>
                <p className="text-gray-700">{user?.address}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  City
                </label>
                <p className="text-gray-700">{user?.city}</p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="role"
                >
                  State
                </label>
                <p className="text-gray-700">{user?.state}</p>
              </div>
            </div>
          </div>
        );
      case "Pet":
        return (
          <div>
            {pets?.length > 0 ? (
              pets?.map((pet, index) => (
                <div
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  key={index}
                >
                  <img
                    className="w-40 h-40 rounded-full object-cover"
                    src={
                      pet?.imageUrl
                        ? pet.imageUrl
                        : "http://localhost:3000/assets/home.jpeg"
                    }
                    alt={pet?.pet_name}
                  />
                  <p>Pet Name: {pet?.pet_name}</p>
                  <p>Species: {pet?.species}</p>
                  <p>Breed: {pet?.breed}</p>
                  {/* Render other pet details */}
                </div>
              ))
            ) : (
              <p>No pets found.</p>
            )}

            <a href="/Pet">Add Pet</a>
          </div>
        );
      case "Services":
        return (
          <div>
            {service?.length > 0 ? (
              service?.map((ser, index) => (
                <div
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  key={index}
                >
                  <p> Name: {ser.user_name}</p>
                  <p>sdf:{ser.isConfirmed.toString()}</p>
                  <div className="flex items-center mt-5 mb-4">
                    {/* Rating stars */}
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[...Array(Math.round(ser.averageRating || 0))].map(
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
                      {[...Array(5 - Math.round(ser.averageRating || 0))].map(
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
                      {ser.averageRating || "N/A"}
                    </span>
                  </div>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => setServiceId(ser._id)}
                    className="text-gray-700  flex items-center bg-green-500 py-1 px-3 rounded-pill fs-6 no-underline"
                  >
                    Rate
                  </button>
                  {/* rating modal */}
                  <div
                    className="modal modal-alert py-5"
                    tabIndex={-1}
                    role="dialog"
                    id="myModal"
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
                      <div className="modal-content rounded-4 shadow">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="staticBackdropLabel"
                          >
                            Rating
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body p-4 text-center">
                          <div className="container">
                            <div className="feedback">
                              <div className="rating">
                                <input
                                  type="radio"
                                  name="rating"
                                  id="rating-5"
                                  onChange={() => Rating(5)}
                                />
                                <label htmlFor="rating-5"></label>
                                <input
                                  type="radio"
                                  name="rating"
                                  id="rating-4"
                                  onChange={() => Rating(4)}
                                />
                                <label htmlFor="rating-4"></label>
                                <input
                                  type="radio"
                                  name="rating"
                                  id="rating-3"
                                  onChange={() => Rating(3)}
                                />
                                <label htmlFor="rating-3"></label>
                                <input
                                  type="radio"
                                  name="rating"
                                  id="rating-2"
                                  onChange={() => Rating(2)}
                                />
                                <label htmlFor="rating-2"></label>
                                <input
                                  type="radio"
                                  name="rating"
                                  id="rating-1"
                                  onChange={() => Rating(1)}
                                />
                                <label htmlFor="rating-1"></label>
                                <div className="emoji-wrapper">
                                  <div className="emoji">
                                    <svg
                                      className="rating-0"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                      <circle
                                        cx="256"
                                        cy="256"
                                        r="256"
                                        fill="#ffd93b"
                                      />
                                      <path
                                        d="M512 256c0 141.44-114.64 256-256 256-80.48 0-152.32-37.12-199.28-95.28 43.92 35.52 99.84 56.72 160.72 56.72 141.36 0 256-114.56 256-256 0-60.88-21.2-116.8-56.72-160.72C474.8 103.68 512 175.52 512 256z"
                                        fill="#f4c534"
                                      />
                                      <ellipse
                                        transform="scale(-1) rotate(31.21 715.433 -595.455)"
                                        cx="166.318"
                                        cy="199.829"
                                        rx="56.146"
                                        ry="56.13"
                                        fill="#fff"
                                      />
                                      <ellipse
                                        transform="rotate(-148.804 180.87 175.82)"
                                        cx="180.871"
                                        cy="175.822"
                                        rx="28.048"
                                        ry="28.08"
                                        fill="#3e4347"
                                      />
                                      <ellipse
                                        transform="rotate(-113.778 194.434 165.995)"
                                        cx="194.433"
                                        cy="165.993"
                                        rx="8.016"
                                        ry="5.296"
                                        fill="#5a5f63"
                                      />
                                      <ellipse
                                        transform="scale(-1) rotate(31.21 715.397 -1237.664)"
                                        cx="345.695"
                                        cy="199.819"
                                        rx="56.146"
                                        ry="56.13"
                                        fill="#fff"
                                      />
                                      <ellipse
                                        transform="rotate(-148.804 360.25 175.837)"
                                        cx="360.252"
                                        cy="175.84"
                                        rx="28.048"
                                        ry="28.08"
                                        fill="#3e4347"
                                      />
                                      <ellipse
                                        transform="scale(-1) rotate(66.227 254.508 -573.138)"
                                        cx="373.794"
                                        cy="165.987"
                                        rx="8.016"
                                        ry="5.296"
                                        fill="#5a5f63"
                                      />
                                      <path
                                        d="M370.56 344.4c0 7.696-6.224 13.92-13.92 13.92H155.36c-7.616 0-13.92-6.224-13.92-13.92s6.304-13.92 13.92-13.92h201.296c7.696.016 13.904 6.224 13.904 13.92z"
                                        fill="#3e4347"
                                      />
                                    </svg>
                                    <svg
                                      className="rating-1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                      <circle
                                        cx="256"
                                        cy="256"
                                        r="256"
                                        fill="#ffd93b"
                                      />
                                      <path
                                        d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z"
                                        fill="#f4c534"
                                      />
                                      <path
                                        d="M328.4 428a92.8 92.8 0 0 0-145-.1 6.8 6.8 0 0 1-12-5.8 86.6 86.6 0 0 1 84.5-69 86.6 86.6 0 0 1 84.7 69.8c1.3 6.9-7.7 10.6-12.2 5.1z"
                                        fill="#3e4347"
                                      />
                                      <path
                                        d="M269.2 222.3c5.3 62.8 52 113.9 104.8 113.9 52.3 0 90.8-51.1 85.6-113.9-2-25-10.8-47.9-23.7-66.7-4.1-6.1-12.2-8-18.5-4.2a111.8 111.8 0 0 1-60.1 16.2c-22.8 0-42.1-5.6-57.8-14.8-6.8-4-15.4-1.5-18.9 5.4-9 18.2-13.2 40.3-11.4 64.1z"
                                        fill="#f4c534"
                                      />
                                      <path
                                        d="M357 189.5c25.8 0 47-7.1 63.7-18.7 10 14.6 17 32.1 18.7 51.6 4 49.6-26.1 89.7-67.5 89.7-41.6 0-78.4-40.1-82.5-89.7A95 95 0 0 1 298 174c16 9.7 35.6 15.5 59 15.5z"
                                        fill="#fff"
                                      />
                                      <path
                                        d="M396.2 246.1a38.5 38.5 0 0 1-38.7 38.6 38.5 38.5 0 0 1-38.6-38.6 38.6 38.6 0 1 1 77.3 0z"
                                        fill="#3e4347"
                                      />
                                      <path
                                        d="M380.4 241.1c-3.2 3.2-9.9 1.7-14.9-3.2-4.8-4.8-6.2-11.5-3-14.7 3.3-3.4 10-2 14.9 2.9 4.9 5 6.4 11.7 3 15z"
                                        fill="#fff"
                                      />
                                      <path
                                        d="M242.8 222.3c-5.3 62.8-52 113.9-104.8 113.9-52.3 0-90.8-51.1-85.6-113.9 2-25 10.8-47.9 23.7-66.7 4.1-6.1 12.2-8 18.5-4.2 16.2 10.1 36.2 16.2 60.1 16.2 22.8 0 42.1-5.6 57.8-14.8 6.8-4 15.4-1.5 18.9 5.4 9 18.2 13.2 40.3 11.4 64.1z"
                                        fill="#f4c534"
                                      />
                                      <path
                                        d="M155 189.5c-25.8 0-47-7.1-63.7-18.7-10 14.6-17 32.1-18.7 51.6-4 49.6 26.1 89.7 67.5 89.7 41.6 0 78.4-40.1 82.5-89.7A95 95 0 0 0 214 174c-16 9.7-35.6 15.5-59 15.5z"
                                        fill="#fff"
                                      />
                                      <path
                                        d="M115.8 246.1a38.5 38.5 0 0 0 38.7 38.6 38.5 38.5 0 0 0 38.6-38.6 38.6 38.6 0 1 0-77.3 0z"
                                        fill="#3e4347"
                                      />
                                      <path
                                        d="M131.6 241.1c3.2 3.2 9.9 1.7 14.9-3.2 4.8-4.8 6.2-11.5 3-14.7-3.3-3.4-10-2-14.9 2.9-4.9 5-6.4 11.7-3 15z"
                                        fill="#fff"
                                      />
                                    </svg>
                                    <svg
                                      className="rating-2"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                      <circle
                                        cx="256"
                                        cy="256"
                                        r="256"
                                        fill="#ffd93b"
                                      />
                                      <path
                                        d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z"
                                        fill="#f4c534"
                                      />
                                      <path
                                        d="M336.6 403.2c-6.5 8-16 10-25.5 5.2a117.6 117.6 0 0 0-110.2 0c-9.4 4.9-19 3.3-25.6-4.6-6.5-7.7-4.7-21.1 8.4-28 45.1-24 99.5-24 144.6 0 13 7 14.8 19.7 8.3 27.4z"
                                        fill="#3e4347"
                                      />
                                      <path
                                        d="M276.6 244.3a79.3 79.3 0 1 1 158.8 0 79.5 79.5 0 1 1-158.8 0z"
                                        fill="#fff"
                                      />
                                      <circle
                                        cx="340"
                                        cy="260.4"
                                        r="36.2"
                                        fill="#3e4347"
                                      />
                                      <g fill="#fff">
                                        <ellipse
                                          transform="rotate(-135 326.4 246.6)"
                                          cx="326.4"
                                          cy="246.6"
                                          rx="6.5"
                                          ry="10"
                                        />
                                        <path d="M231.9 244.3a79.3 79.3 0 1 0-158.8 0 79.5 79.5 0 1 0 158.8 0z" />
                                      </g>
                                      <circle
                                        cx="168.5"
                                        cy="260.4"
                                        r="36.2"
                                        fill="#3e4347"
                                      />
                                      <ellipse
                                        transform="rotate(-135 182.1 246.7)"
                                        cx="182.1"
                                        cy="246.7"
                                        rx="10"
                                        ry="6.5"
                                        fill="#fff"
                                      />
                                    </svg>
                                    <svg
                                      className="rating-3"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                      <circle
                                        cx="256"
                                        cy="256"
                                        r="256"
                                        fill="#ffd93b"
                                      />
                                      <path
                                        d="M407.7 352.8a163.9 163.9 0 0 1-303.5 0c-2.3-5.5 1.5-12 7.5-13.2a780.8 780.8 0 0 1 288.4 0c6 1.2 9.9 7.7 7.6 13.2z"
                                        fill="#3e4347"
                                      />
                                      <path
                                        d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z"
                                        fill="#f4c534"
                                      />
                                      <g fill="#fff">
                                        <path d="M115.3 339c18.2 29.6 75.1 32.8 143.1 32.8 67.1 0 124.2-3.2 143.2-31.6l-1.5-.6a780.6 780.6 0 0 0-284.8-.6z" />
                                        <ellipse
                                          cx="356.4"
                                          cy="205.3"
                                          rx="81.1"
                                          ry="81"
                                        />
                                      </g>
                                      <ellipse
                                        cx="356.4"
                                        cy="205.3"
                                        rx="44.2"
                                        ry="44.2"
                                        fill="#3e4347"
                                      />
                                      <g fill="#fff">
                                        <ellipse
                                          transform="scale(-1) rotate(45 454 -906)"
                                          cx="375.3"
                                          cy="188.1"
                                          rx="12"
                                          ry="8.1"
                                        />
                                        <ellipse
                                          cx="155.6"
                                          cy="205.3"
                                          rx="81.1"
                                          ry="81"
                                        />
                                      </g>
                                      <ellipse
                                        cx="155.6"
                                        cy="205.3"
                                        rx="44.2"
                                        ry="44.2"
                                        fill="#3e4347"
                                      />
                                      <ellipse
                                        transform="scale(-1) rotate(45 454 -421.3)"
                                        cx="174.5"
                                        cy="188"
                                        rx="12"
                                        ry="8.1"
                                        fill="#fff"
                                      />
                                    </svg>
                                    <svg
                                      className="rating-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                      <circle
                                        cx="256"
                                        cy="256"
                                        r="256"
                                        fill="#ffd93b"
                                      />
                                      <path
                                        d="M512 256A256 256 0 0 1 56.7 416.7a256 256 0 0 0 360-360c58.1 47 95.3 118.8 95.3 199.3z"
                                        fill="#f4c534"
                                      />
                                      <path
                                        d="M232.3 201.3c0 49.2-74.3 94.2-74.3 94.2s-74.4-45-74.4-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z"
                                        fill="#e24b4b"
                                      />
                                      <path
                                        d="M96.1 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2C80.2 229.8 95.6 175.2 96 173.3z"
                                        fill="#d03f3f"
                                      />
                                      <path
                                        d="M215.2 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z"
                                        fill="#fff"
                                      />
                                      <path
                                        d="M428.4 201.3c0 49.2-74.4 94.2-74.4 94.2s-74.3-45-74.3-94.2a38 38 0 0 1 74.4-11.1 38 38 0 0 1 74.3 11.1z"
                                        fill="#e24b4b"
                                      />
                                      <path
                                        d="M292.2 173.3a37.7 37.7 0 0 0-12.4 28c0 49.2 74.3 94.2 74.3 94.2-77.8-65.7-62.4-120.3-61.9-122.2z"
                                        fill="#d03f3f"
                                      />
                                      <path
                                        d="M411.3 200c-3.6 3-9.8 1-13.8-4.1-4.2-5.2-4.6-11.5-1.2-14.1 3.6-2.8 9.7-.7 13.9 4.4 4 5.2 4.6 11.4 1.1 13.8z"
                                        fill="#fff"
                                      />
                                      <path
                                        d="M381.7 374.1c-30.2 35.9-75.3 64.4-125.7 64.4s-95.4-28.5-125.8-64.2a17.6 17.6 0 0 1 16.5-28.7 627.7 627.7 0 0 0 218.7-.1c16.2-2.7 27 16.1 16.3 28.6z"
                                        fill="#3e4347"
                                      />
                                      <path
                                        d="M256 438.5c25.7 0 50-7.5 71.7-19.5-9-33.7-40.7-43.3-62.6-31.7-29.7 15.8-62.8-4.7-75.6 34.3 20.3 10.4 42.8 17 66.5 17z"
                                        fill="#e24b4b"
                                      />
                                    </svg>
                                    <svg
                                      className="rating-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 512 512"
                                    >
                                      <g fill="#ffd93b">
                                        <circle cx="256" cy="256" r="256" />
                                        <path d="M512 256A256 256 0 0 1 56.8 416.7a256 256 0 0 0 360-360c58 47 95.2 118.8 95.2 199.3z" />
                                      </g>
                                      <path
                                        d="M512 99.4v165.1c0 11-8.9 19.9-19.7 19.9h-187c-13 0-23.5-10.5-23.5-23.5v-21.3c0-12.9-8.9-24.8-21.6-26.7-16.2-2.5-30 10-30 25.5V261c0 13-10.5 23.5-23.5 23.5h-187A19.7 19.7 0 0 1 0 264.7V99.4c0-10.9 8.8-19.7 19.7-19.7h472.6c10.8 0 19.7 8.7 19.7 19.7z"
                                        fill="#e9eff4"
                                      />
                                      <path
                                        d="M204.6 138v88.2a23 23 0 0 1-23 23H58.2a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z"
                                        fill="#45cbea"
                                      />
                                      <path
                                        d="M476.9 138v88.2a23 23 0 0 1-23 23H330.3a23 23 0 0 1-23-23v-88.3a23 23 0 0 1 23-23h123.4a23 23 0 0 1 23 23z"
                                        fill="#e84d88"
                                      />
                                      <g fill="#38c0dc">
                                        <path d="M95.2 114.9l-60 60v15.2l75.2-75.2zM123.3 114.9L35.1 203v23.2c0 1.8.3 3.7.7 5.4l116.8-116.7h-29.3z" />
                                      </g>
                                      <g fill="#d23f77">
                                        <path d="M373.3 114.9l-66 66V196l81.3-81.2zM401.5 114.9l-94.1 94v17.3c0 3.5.8 6.8 2.2 9.8l121.1-121.1h-29.2z" />
                                      </g>
                                      <path
                                        d="M329.5 395.2c0 44.7-33 81-73.4 81-40.7 0-73.5-36.3-73.5-81s32.8-81 73.5-81c40.5 0 73.4 36.3 73.4 81z"
                                        fill="#3e4347"
                                      />
                                      <path
                                        d="M256 476.2a70 70 0 0 0 53.3-25.5 34.6 34.6 0 0 0-58-25 34.4 34.4 0 0 0-47.8 26 69.9 69.9 0 0 0 52.6 24.5z"
                                        fill="#e24b4b"
                                      />
                                      <path
                                        d="M290.3 434.8c-1 3.4-5.8 5.2-11 3.9s-8.4-5.1-7.4-8.7c.8-3.3 5.7-5 10.7-3.8 5.1 1.4 8.5 5.3 7.7 8.6z"
                                        fill="#fff"
                                        opacity=".2"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer flex-nowrap p-0">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => handleSubmit(serviceId)}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>You Have no service booked yet!</p>
            )}
            <a href="/PetService">Book Service</a>
          </div>
        );
      case "Trainings":
        return (
          <div>
            {training?.length > 0 ? (
              training?.map((training, index) => (
                <div
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  key={index}
                >
                  <p> Name: {training.email}</p>
                  <p>sdf:{training.isConfirmed.toString()}</p>
                </div>
              ))
            ) : (
              <p>You Have no training booked yet!</p>
            )}
            <a href="/PetTraining">Book Training</a>
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
                onClick={() => handleTabClick("Profile")}
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
                onClick={() => handleTabClick("Pet")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "dashboard"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Pet
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Services")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "settings"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Services
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Trainings")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "contacts"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Trainings
              </button>
            </li>
          </ul>
        </div>
        <div className=" p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default UserProfile;
