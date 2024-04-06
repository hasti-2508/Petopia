"use client";
import { Pet } from "@/interfaces/pet";
import { Service } from "@/interfaces/service";
import { Training } from "@/interfaces/training";
import { User } from "@/interfaces/user";
import axios from "axios";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState<User>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [service, setService] = useState<Service[]>([]);
  const [training, setTraining] = useState<Training[]>([]);

  const [activeTab, setActiveTab] = useState("Profile");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const getUser = async (token: string) => {
    try {
      const response = await axios.post(`${process.env.HOST}/currentUser`, {
        jwt: token,
      });
      setUser(response.data);

      const petResponse = await axios.get(
        `${process.env.HOST}/user/${response.data._id}`
      );
      const { pets } = petResponse.data;
      setPets(pets);

      const serviceBooking = await axios.get(
        `${process.env.HOST}/serviceBooking/${response.data._id}`
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
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      getUser(storedToken);
    }
  }, []);

  

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
                  <p>Pet Name: {pet?.pet_name}</p>
                  <p>Species: {pet?.species}</p>
                  <p>Breed: {pet?.breed}</p>
                  {/* Render other pet details */}
                  <img src={pet?.imageUrl  ? pet.imageUrl
                      : "http://localhost:3000/assets/home.jpeg"} alt={pet?.pet_name} />
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
                  <p> Name: {ser.email}</p>
                  <p>sdf:{ser.isConfirmed.toString()}</p>
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
