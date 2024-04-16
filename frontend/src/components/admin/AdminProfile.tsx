"use client";
import { Service } from "@/interfaces/service";
import { Training } from "@/interfaces/training";
import { User } from "@/interfaces/user";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Vet } from "@/interfaces/vet";
import { Trainer } from "@/interfaces/trainer";
import { Pet } from "@/interfaces/pet";
import { PetCard } from "../pet/PetCard";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { TrainerCard } from "../trainer/TrainerCard";
import { UserCard } from "../user/UserCard";
import { VetCard } from "../vet/VetCard";

function AdminProfile() {
  const [activeTab, setActiveTab] = useState("ServicesBookings");
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

  const handleUserDelete = async (userId: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this user?`
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `${process.env.HOST}/user/delete/${userId}`
        );
        toast.success("User is Deleted");
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleVetDelete = async (vetId: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this vet?`
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${process.env.HOST}/vet/${vetId}`);

        toast.success("Vet is Deleted");
        setVets(vets.filter((vet) => vet._id !== vetId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleTrainerDelete = async (trainerId: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this trainer?`
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `${process.env.HOST}/trainer/${trainerId}`
        );
        toast.success("Trainer is Deleted");
        setTrainers(trainers.filter((trainer) => trainer._id !== trainerId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePetDelete = async (petId: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this user?`
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${process.env.HOST}/pet/${petId}`);
        toast.success("Pet is Deleted");
        setPets(pets.filter((pet) => pet._id !== petId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        // const response = await axios.post(`${process.env.HOST}/currentUser`, {
        //   jwt: token,
        // });
        const response = await axiosInstance.get("/currentUser");
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

    getUser();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "ServicesBookings":
        return (
          <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-dark-blue ">
                <thead
                  style={{ fontSize: "16px" }}
                  className=" text-red-200 bg-dark-blue"
                >
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
                          ? "odd:bg-gray-200 "
                          : "even:bg-gray-100"
                      } border-b `}
                    >
                      <td className="px-6 py-4 font-bold text-gray-700 whitespace-nowrap ">
                        {service.user_name}
                      </td>
                      <td className="px-6 py-4">{service.pet_species}</td>
                      <td className="px-6 py-4 ">{service.totalPrice}</td>
                      <td className="px-6 py-4">{service.city}</td>
                      <td className="px-6 py-4">{service.booking_date}</td>
                      <td className="px-6 py-4">{service.booking_time}</td>
                      <td className="px-6 py-4">
                        {service.isConfirmed ? (
                          <button className="bg-green-500 text-white px-3 py-2 rounded-md mr-2 w-56 font-bold">
                            Paid
                          </button>
                        ) : (
                          <button className="bg-red-500 text-white px-3 py-2 rounded-md mr-2 w-56 font-bold">
                            Not Paid
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {service.vetId ? (
                          <span className="bg-saddle-brown text-white px-3 py-2 rounded-md mr-2 font-bold">
                            Assigned
                          </span>
                        ) : (
                          <Link
                            className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 no-underline font-bold"
                            href={`/assignVet?bookingId=${service._id}`}
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
              <table className="w-full text-dark-blue  ">
                <thead
                  style={{ fontSize: "16px" }}
                  className=" text-red-200 bg-dark-blue"
                >
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
                          ? "odd:bg-gray-200 "
                          : "even:bg-gray-100"
                      } border-b `}
                    >
                      <td className="px-6 py-4 font-bold text-gray-700 whitespace-nowrap">
                        {training.user_name}
                      </td>
                      <td className="px-6 py-4">{training.pet_species}</td>
                      <td className="px-6 py-4">{training.totalPrice}</td>
                      <td className="px-6 py-4">{training.city}</td>
                      <td className="px-6 py-4">{training.booking_date}</td>
                      <td className="px-6 py-4">{training.booking_time}</td>
                      <td className="px-6 py-4">
                        {training.isConfirmed ? (
                          <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 w-56 font-bold">
                            Paid
                          </button>
                        ) : (
                          <button className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 w-56 font-bold">
                            Not Paid
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {training.trainerId ? (
                          <span className="bg-saddle-brown text-white px-3 py-1 rounded-md mr-2 font-bold">
                            Assigned
                          </span>
                        ) : (
                          <Link
                            className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 no-underline font-bold"
                            href={`/assignTrainer?bookingId=${training._id}`}
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
          <div className="row ">
            {users.map((user) => (
              <div className="col-md-4">
                <div key={Math.random()}>
                  <div key={user._id}>
                    <UserCard user={user} />
                  </div>
                  <button
                    onClick={() => handleUserDelete(user._id)}
                    className="mt-2  px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case "Vets":
        return (
          <div className="container-fluid mt-3">
            <div className="row">
              {vets.map((vet) => (
                <div key={Math.random()}>
                  <VetCard user={vet} />
                  <button
                    onClick={() => handleVetDelete(vet._id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "Trainers":
        return (
          <div className="container-fluid mt-3">
            <div className="row">
                {trainers.map((trainer) => (
                  <div key={Math.random()}>
                    <TrainerCard user={trainer} />
                    <button
                      onClick={() => handleTrainerDelete(trainer._id)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                    >
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
                  <div className="mx-6">
                    <button
                      onClick={() => handlePetDelete(pet._id)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </div>
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
      <div className=" p-9 ">
        <div className="text-sm font-medium text-center text-gray-500 ">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                onClick={() => handleTabClick("ServicesBookings")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "ServicesBookings"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Services Bookings
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("TrainingBookings")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "TrainingBookings"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Training Bookings
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Users")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "Users"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Users
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Trainers")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "Trainers"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Trainers
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Vets")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "Vets"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Vets
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Pets")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "Pets "
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
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
