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
import { TrainerAdminCard, TrainerCard } from "../trainer/TrainerCard";
import { UserCard } from "../user/UserCard";
import { VetAdminCard, VetCard } from "../vet/VetCard";
import Pagination from "../pagination/Pagination";
import redirectLoggedIn from "@/middleware/redirectToLogin";

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
  const [originalServiceData, setOriginalServiceData] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [vetCurrentPage, setVetCurrentPage] = useState(1);
  const [trainerCurrentPage, setTrainerCurrentPage] = useState(1);
  const [petCurrentPage, setPetCurrentPage] = useState(1);
  const [serviceCurrentPage, setServiceCurrentPage] = useState(1);
  const [trainingCurrentPage, setTrainingCurrentPage] = useState(1);
  const [originalTrainingData, setOriginalTrainingData] = useState<Training[]>(
    []
  );
  const [trainings, setTrainings] = useState<Training[]>([]);
  //service search
  const searchFilter = () => {
    const filterData = originalServiceData.filter((data) => {
      const priceString = String(data.totalPrice);
      if (
        data.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.booking_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.booking_time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.pet_species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        priceString.includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setServices(filterData);
  };

  useEffect(() => {
    return setServices(originalServiceData);
  }, [searchTerm]);
  //training search
  const searchTrainingFilter = () => {
    const filterData = originalTrainingData.filter((data) => {
      const priceString = String(data.totalPrice);
      if (
        data.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.booking_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.booking_time.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.pet_species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        priceString.includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setTrainings(filterData);
  };

  useEffect(() => {
    return setTrainings(originalTrainingData);
  }, [searchTerm]);

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
        const response = await axiosInstance.get("/currentUser");
        setAdmin(response.data);
        const serviceResponse = await axios.get(
          `${process.env.HOST}/serviceBooking?page=${serviceCurrentPage}`
        );
        setOriginalServiceData(serviceResponse.data);
        setServices(serviceResponse.data);

        const trainingResponse = await axios.get(
          `${process.env.HOST}/trainingBooking?page=${trainingCurrentPage}`
        );
        setOriginalTrainingData(trainingResponse.data);
        setTrainings(trainingResponse.data);

        const userResponse = await axios.get(
          `${process.env.HOST}/user?page=${userCurrentPage}`
        );
        setUsers(userResponse.data);

        const vetResponse = await axios.get(
          `${process.env.HOST}/vet?page=${vetCurrentPage}`
        );
        setVets(vetResponse.data);

        const trainerResponse = await axios.get(
          `${process.env.HOST}/trainer?page=${trainerCurrentPage}`
        );
        setTrainers(trainerResponse.data);

        const petResponse = await axios.get(
          `${process.env.HOST}/pet?page=${petCurrentPage}`
        );
        setPets(petResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [
    userCurrentPage,
    vetCurrentPage,
    trainerCurrentPage,
    petCurrentPage,
    serviceCurrentPage,
    trainingCurrentPage,
  ]);

  function handleUserPreviousPage() {
    if (userCurrentPage > 1) {
      setUserCurrentPage(userCurrentPage - 1);
    }
  }

  function handleUserNextPage() {
    setUserCurrentPage(userCurrentPage + 1);
  }

  function handleVetPreviousPage() {
    if (vetCurrentPage > 1) {
      setVetCurrentPage(vetCurrentPage - 1);
    }
  }

  function handleVetNextPage() {
    setVetCurrentPage(vetCurrentPage + 1);
  }

  function handleTrainerPreviousPage() {
    if (trainerCurrentPage > 1) {
      setTrainerCurrentPage(trainerCurrentPage - 1);
    }
  }

  function handleTrainerNextPage() {
    setTrainerCurrentPage(trainerCurrentPage + 1);
  }

  function handlePetPreviousPage() {
    if (petCurrentPage > 1) {
      setPetCurrentPage(petCurrentPage - 1);
    }
  }

  function handlePetNextPage() {
    setPetCurrentPage(petCurrentPage + 1);
  }

  function handleServicePreviousPage() {
    if (serviceCurrentPage > 1) {
      setServiceCurrentPage(serviceCurrentPage - 1);
    }
  }

  function handleServiceNextPage() {
    setServiceCurrentPage(serviceCurrentPage + 1);
  }

  function handleTrainingPreviousPage() {
    if (trainingCurrentPage > 1) {
      setTrainingCurrentPage(trainingCurrentPage - 1);
    }
  }

  function handleTrainingNextPage() {
    setTrainingCurrentPage(trainingCurrentPage + 1);
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "ServicesBookings":
        return (
          <div className="fade-in-up">
            <form className=" max-w-xl mx-auto mt-6 mb-5">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <div className="">
                  {" "}
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full ml-2 p-4 ps-10 text-sm text-gray-700 border border-dark-blue rounded-lg bg-white  focus:ring-black focus:border-black  "
                    placeholder="Search by city, price, booking date & time ...."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white absolute my-2 end-2.5 bottom-2.5 bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                  onClick={(e) => {
                    e.preventDefault();
                    searchFilter();
                  }}
                >
                  Search
                </button>
              </div>
            </form>
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
            <Pagination
              Previous={handleServicePreviousPage}
              Next={handleServiceNextPage}
            />
          </div>
        );
      case "TrainingBookings":
        return (
          <div className="fade-in-up">
            <form className=" max-w-xl mx-auto mt-6 mb-5">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <div className="">
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full ml-2 p-4 ps-10 text-sm text-gray-700 border border-dark-blue rounded-lg bg-white  focus:ring-black focus:border-black "
                    placeholder="Search by city, price, booking date & time ...."
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="text-white absolute my-2 end-2.5 bottom-2.5 bg-dark-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                  onClick={(e) => {
                    e.preventDefault();
                    searchTrainingFilter();
                  }}
                >
                  Search
                </button>
              </div>
            </form>
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
            <Pagination
              Previous={handleTrainingPreviousPage}
              Next={handleTrainingNextPage}
            />
          </div>
        );

      case "Users":
        return (
          <div className="fade-in-up">
            <div className="container-fluid mt-3 gap-3 fade-in-up">
              <div className="row ">
                {users.map((user) => (
                  <div className="col-md-4 mx-auto">
                    <div key={Math.random()}>
                      <div key={user._id}>
                        <UserCard user={user} />
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleUserDelete(user._id)}
                          className="mt-2 mb-3 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <Pagination
                  Previous={handleUserPreviousPage}
                  Next={handleUserNextPage}
                />
              </div>
            </div>
          </div>
        );
      case "Vets":
        return (
          <div className="fade-in-up">
            <div className="container-fluid mt-3 gap-3 fade-in-up">
              <div className="row">
                {vets.map((vet) => (
                  <div className="col-md-4 mx-auto">
                    <div key={Math.random()}>
                      <VetAdminCard user={vet} />
                      <div
                        className="flex justify-evenly"
                        style={{ width: "85%" }}
                      >
                        <button
                          onClick={() => handleVetDelete(vet._id)}
                          className="mt-2 mb-6 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                Previous={handleVetPreviousPage}
                Next={handleVetNextPage}
              />
            </div>
          </div>
        );

      case "Trainers":
        return (
          <div className="fade-in-up">
            <div className="container-fluid mt-3 fade-in-up">
              <div className="row">
                {trainers.map((trainer) => (
                  <div className="col-md-4 mx-auto">
                    <div key={Math.random()}>
                      <TrainerAdminCard user={trainer} />
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleTrainerDelete(trainer._id)}
                          className="mt-3 mb-4 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <Pagination
                  Previous={handleTrainerPreviousPage}
                  Next={handleTrainerNextPage}
                />
              </div>
            </div>
          </div>
        );

      case "Pets":
        return (
          <div className="fade-in-up">
            <div className="container-fluid mt-3 fade-in-up">
              <div className="row">
                {pets.map((pet) => (
                  <div className="col-md-4 mx-auto">
                    <div key={Math.random()}>
                      <PetCard pet={pet} />
                      <div
                        className="flex justify-evenly"
                        style={{ width: "85%" }}
                      >
                        <button
                          onClick={() => handlePetDelete(pet._id)}
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md mb-4"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <Pagination
                  Previous={handlePetPreviousPage}
                  Next={handlePetNextPage}
                />
              </div>
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
        <div className="text-sm font-medium text-center text-gray-500">
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
                  activeTab === "Pets"
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

export default redirectLoggedIn(AdminProfile);
