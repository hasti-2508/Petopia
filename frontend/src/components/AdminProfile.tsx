"use client";
import { Service } from "@/interfaces/service";
import { Training } from "@/interfaces/training";
import { User } from "@/interfaces/user";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Vet } from "@/interfaces/vet";
import { Trainer } from "@/interfaces/trainer";
import { Pet } from "@/interfaces/pet";
import {PetCard} from "./PetCard";

function AdminProfile() {
  const [activeTab, setActiveTab] = useState("Profile");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const [admin, setAdmin] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [vets, setVets] = useState<Vet[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);

  const getUser = async (token: string) => {
    try {
      const response = await axios.post(`${process.env.HOST}/currentUser`, {
        jwt: token,
      });
      setAdmin(response.data);
      const serviceResponse = await axios.get(
        `${process.env.HOST}/serviceBooking`
      );
      setServices(serviceResponse.data);

      const trainingResponse = await axios.get(
        `${process.env.HOST}/trainingBooking`
      );
      setTrainings(trainingResponse.data);

      const userResponse = await axios.get(`${process.env.HOST}/user`);
      setUsers(userResponse.data);

      const vetResponse = await axios.get(`${process.env.HOST}/vet`);
      setVets(vetResponse.data);

      const trainerResponse = await axios.get(`${process.env.HOST}/trainer`);
      setTrainers(trainerResponse.data);

      const petResponse = await axios.get(`${process.env.HOST}/pet`);
      setPets(petResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserDelete = async (userId: string) => {
    try {
      const response = await axios.delete(`${process.env.HOST}/user/${userId}`);
      alert("User is deleted");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleVetDelete = async (vetId: string) => {
    try {
      const response = await axios.delete(`${process.env.HOST}/vet/${vetId}`);
      alert("Vet is deleted");
      setVets(vets.filter((vet) => vet._id !== vetId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrainerDelete = async (trainerId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.HOST}/trainer/${trainerId}`
      );
      alert("Trainer is deleted");
      setTrainers(trainers.filter((trainer) => trainer._id !== trainerId));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePetDelete = async (petId: string) => {
    try {
      const response = await axios.delete(`${process.env.HOST}/pet/${petId}`);
      alert("Pet is deleted");
      setPets(pets.filter((pet) => pet._id !== petId));
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "ServicesBookings":
        return (
          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Client name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Species
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "odd:bg-white odd:dark:bg-gray-900"
                          : "even:bg-gray-50 even:dark:bg-gray-800"
                      } border-b dark:border-gray-700`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {service.user_name}
                      </td>
                      <td className="px-6 py-4">{service.pet_species}</td>
                      <td className="px-6 py-4">{service.totalPrice}</td>
                      <td className="px-6 py-4">{service.city}</td>
                      <td className="px-6 py-4">{service.booking_date}</td>
                      <td className="px-6 py-4">{service.booking_time}</td>
                      <td className="px-6 py-4">
                        {service.isConfirmed ? (
                          <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">
                            Paid
                          </button>
                        ) : (
                          <button className="bg-red-500 text-white px-3 py-1 rounded-md mr-2">
                            Not Paid
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {service.vetId ? (
                          <span className="bg-saddle-brown text-white px-3 py-1 rounded-md mr-2">
                            Assigned
                          </span>
                        ) : (
                          <Link
                            className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 no-underline"
                            href={`/AssignVet?bookingId=${service._id}`}
                          >
                            Assign Vet
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "TrainingBookings":
        return (
          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Client name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Species
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trainings.map((training, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "odd:bg-white odd:dark:bg-gray-900"
                          : "even:bg-gray-50 even:dark:bg-gray-800"
                      } border-b dark:border-gray-700`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {training.user_name}
                      </td>
                      <td className="px-6 py-4">{training.pet_species}</td>
                      <td className="px-6 py-4">{training.totalPrice}</td>
                      <td className="px-6 py-4">{training.city}</td>
                      <td className="px-6 py-4">{training.booking_date}</td>
                      <td className="px-6 py-4">{training.booking_time}</td>
                      <td className="px-6 py-4">
                        {training.isConfirmed ? (
                          <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">
                            Paid
                          </button>
                        ) : (
                          <button className="bg-red-500 text-white px-3 py-1 rounded-md mr-2">
                            Not Paid
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {training.trainerId ? (
                          <span className="bg-saddle-brown text-white px-3 py-1 rounded-md mr-2">
                            Assigned
                          </span>
                        ) : (
                          <Link
                            className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 no-underline"
                            href={`/AssignTrainer?bookingId=${training._id}`}
                          >
                            Assign Trainer
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "Users":
        return (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user) => (
                <div key={Math.random()}>
                  <UserCard user={user} />
                  <button onClick={() => handleUserDelete(user._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case "Trainers":
        return (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vets.map((vet) => (
                <div key={Math.random()}>
                  <UserCard user={vet} />
                  <button onClick={() => handleVetDelete(vet._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "Vets":
        return (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trainers.map((trainer) => (
                <div key={Math.random()}>
                  <UserCard user={trainer} />
                  <button onClick={() => handleTrainerDelete(trainer._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "Pets":
        return (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet) => (
                <div key={Math.random()}>
                  <PetCard pet={pet} />
                  <button onClick={() => handlePetDelete(pet._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className=" p-9 bg-white border border-gray-200 rounded-lg shadow m-8 border-1">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                onClick={() => handleTabClick("ServicesBookings")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "profile"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Services Bookings
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("TrainingBookings")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "dashboard"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Training Bookings
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Users")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "settings"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Users
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Trainers")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "settings"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Trainers
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Vets")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "settings"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Vets
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Pets")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "contacts"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                Pets
              </button>
            </li>
          </ul>
        </div>
        <div className=" p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default AdminProfile;
