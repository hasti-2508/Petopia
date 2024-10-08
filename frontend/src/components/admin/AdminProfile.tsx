"use client";
import { Service } from "@/interfaces/service";
import { Training } from "@/interfaces/training";
import { User } from "@/interfaces/user";
import axios from "axios";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Vet } from "@/interfaces/vet";
import { Trainer } from "@/interfaces/trainer";
import { Pet } from "@/interfaces/pet";
import { PetCard } from "../pet/PetCard";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { TrainerAdminCard } from "../trainer/TrainerCard";
import { UserCard } from "../user/UserCard";
import { VetAdminCard } from "../vet/VetCard";
import Pagination from "../pagination/Pagination";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import { useRouter } from "next/navigation";
import RateStar from "../rating/RateStar";
import SearchAdminIcon from "./Icon";

function AdminProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("ServicesBookings");
  const [users, setUsers] = useState<User[]>([]);
  const [vets, setVets] = useState<Vet[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [originalServiceData, setOriginalServiceData] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [originalTrainingData, setOriginalTrainingData] = useState<Training[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [pagination, setPagination] = useState({
    userCurrentPage: 1,
    vetCurrentPage: 1,
    trainerCurrentPage: 1,
    petCurrentPage: 1,
    serviceCurrentPage: 1,
    trainingCurrentPage: 1,
  });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

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
        const response = await axiosInstance.delete(
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
        const response = await axiosInstance.delete(
          `${process.env.HOST}/vet/${vetId}`
        );
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
        const response = await axiosInstance.delete(
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
        const response = await axiosInstance.delete(
          `${process.env.HOST}/pet/${petId}`
        );
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
        const serviceResponse = await axiosInstance.get(
          `${process.env.HOST}/serviceBooking?page=${pagination.serviceCurrentPage}`
        );
        setOriginalServiceData(serviceResponse.data);
        setServices(serviceResponse.data);

        const trainingResponse = await axiosInstance.get(
          `${process.env.HOST}/trainingBooking?page=${pagination.trainingCurrentPage}`
        );
        setOriginalTrainingData(trainingResponse.data);
        setTrainings(trainingResponse.data);

        const userResponse = await axiosInstance.get(
          `${process.env.HOST}/user?page=${pagination.userCurrentPage}`
        );
        setUsers(userResponse.data);

        const vetResponse = await axiosInstance.get(
          `${process.env.HOST}/vet?page=${pagination.vetCurrentPage}`
        );
        setVets(vetResponse.data);

        const trainerResponse = await axiosInstance.get(
          `${process.env.HOST}/trainer?page=${pagination.trainerCurrentPage}`
        );
        setTrainers(trainerResponse.data);

        const petResponse = await axiosInstance.get(
          `${process.env.HOST}/pet?page=${pagination.petCurrentPage}`
        );
        setPets(petResponse.data);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 403
        ) {
          router.push("/home");
        } else {
          console.error(error);
        }
      }
    };

    getUser();
  }, [pagination]);

  // pagination handlers
  const handlePreviousPage = useCallback(
    (key: keyof typeof pagination) => () => {
      if (pagination[key] > 1) {
        setPagination((prev) => ({
          ...prev,
          [key]: prev[key] - 1,
        }));
      }
    },
    [pagination]
  );

  const handleNextPage = useCallback(
    (key: keyof typeof pagination) => () => {
      setPagination((prev) => ({
        ...prev,
        [key]: prev[key] + 1,
      }));
    },
    [pagination]
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "ServicesBookings":
        return (
          <div className="fade-in-up">
            <form className=" max-w-xl mx-auto mt-6 mb-5">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchAdminIcon />
                </div>
                <div>
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
                  className=" text-red-200 bg-dark-blue text-center"
                >
                  <tr>
                    <th scope="col" className="px-4 py-2">
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
                    <th scope="col" className="px-4 py-3">
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Vet
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center font-medium text-balance">
                  {services.map((service, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "odd:bg-gray-200 "
                          : "even:bg-gray-100"
                      } border-b `}
                    >
                      <td className=" font-bold text-gray-700 whitespace-nowrap py-8">
                        {service.user_name}
                      </td>
                      <td>{service.pet_species}</td>
                      <td>{service.totalPrice}</td>
                      <td>{service.city}</td>
                      <td>{service.booking_date}</td>
                      <td>
                        {(() => {
                          const timeParts = service.booking_time.split(":");
                          const hours = parseInt(timeParts[0]);
                          const minutes = parseInt(timeParts[1]);
                          let formattedHours = hours % 12;
                          if (formattedHours === 0) formattedHours = 12;
                          const period = hours >= 12 ? "PM" : "AM";
                          const formattedMinutes =
                            minutes < 10 ? `0${minutes}` : minutes;
                          return `${formattedHours}:${formattedMinutes} ${period}`;
                        })()}
                      </td>
                      <td>
                        {service.isConfirmed ? (
                          <button className="bg-green-500 text-white px-3 py-2 rounded-md mr-2 w-32  font-bold">
                            Paid
                          </button>
                        ) : (
                          <button className="bg-red-500 text-white px-3 py-2 rounded-md mr-2 w-32 font-bold">
                            Not Paid
                          </button>
                        )}
                      </td>
                      <td>
                        {service.vetId ? (
                          <span className="bg-amber-500 text-white px-3 py-2 rounded-md mr-2 w-32 font-bold">
                            Assigned
                          </span>
                        ) : (
                          <Link
                            className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 w-32 no-underline font-bold"
                            href={`/assignVet?bookingId=${service._id}`}
                          >
                            Assign Vet
                          </Link>
                        )}
                      </td>
                      <td>
                        {service.vetId ? (
                          <>
                            <div>{service.vetId.name}</div>
                            <div>{service.vetId.phoneNo}</div>
                          </>
                        ) : (
                          "none"
                        )}
                      </td>
                      <td>
                        {service.isCompleted ? (
                          <button className="text-blue-500 px-3 py-2 rounded-md mr-2 w-56 font-bold">
                            Completed
                          </button>
                        ) : (
                          <button className="text-red-500  px-3 py-2 rounded-md mr-2 w-56 font-bold">
                            Not Completed
                          </button>
                        )}
                      </td>
                      <td>
                        <RateStar averageRating={service.averageRating} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              Previous={handlePreviousPage("serviceCurrentPage")}
              Next={handleNextPage("serviceCurrentPage")}
            />
          </div>
        );
      case "TrainingBookings":
        return (
          <div className="fade-in-up">
            <form className=" max-w-xl mx-auto mt-6 mb-5">
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchAdminIcon />
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
                  className=" text-red-200 bg-dark-blue text-center"
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
                      Payment
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Trainer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center font-medium text-balance">
                  {trainings.map((training, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "odd:bg-gray-200 "
                          : "even:bg-gray-100"
                      } border-b `}
                    >
                      <td className="font-bold text-gray-700 whitespace-nowrap py-8">
                        {training.user_name}
                      </td>
                      <td>{training.pet_species}</td>
                      <td>{training.totalPrice}</td>
                      <td>{training.city}</td>
                      <td>{training.booking_date}</td>
                      <td>
                        {(() => {
                          const timeParts = training.booking_time.split(":");
                          const hours = parseInt(timeParts[0]);
                          const minutes = parseInt(timeParts[1]);
                          let formattedHours = hours % 12;
                          if (formattedHours === 0) formattedHours = 12;
                          const period = hours >= 12 ? "PM" : "AM";
                          const formattedMinutes =
                            minutes < 10 ? `0${minutes}` : minutes;

                          return `${formattedHours}:${formattedMinutes} ${period}`;
                        })()}
                      </td>
                      <td>
                        {training.isConfirmed ? (
                          <button className="bg-green-500 text-white px-3 py-2 rounded-md mr-2 w-32 font-bold">
                            Paid
                          </button>
                        ) : (
                          <button className="bg-red-500 text-white px-3 py-2 rounded-md mr-2 w-32 font-bold">
                            Not Paid
                          </button>
                        )}
                      </td>
                      <td>
                        {training.trainerId ? (
                          <button className="bg-amber-500 text-white px-3 py-2 rounded-md mr-2 w-32 font-bold">
                            Assigned
                          </button>
                        ) : (
                          <Link
                            className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2  no-underline font-bold"
                            href={`/assignTrainer?bookingId=${training._id}`}
                          >
                            Assign Trainer
                          </Link>
                        )}
                      </td>
                      <td>
                        {training.trainerId ? (
                          <>
                            <div>{training.trainerId.name}</div>
                            <div>{training.trainerId.phoneNo}</div>
                          </>
                        ) : (
                          "none"
                        )}
                      </td>
                      <td>
                        {training.isCompleted ? (
                          <button className="text-blue-500 px-3 py-2 rounded-md mr-2 w-56 font-bold">
                            Completed
                          </button>
                        ) : (
                          <button className="text-red-500  px-3 py-2 rounded-md mr-2 w-56 font-bold">
                            Not Completed
                          </button>
                        )}
                      </td>
                      <td>
                        <RateStar averageRating={training.averageRating} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              Previous={handlePreviousPage("trainingCurrentPage")}
              Next={handleNextPage("trainingCurrentPage")}
            />
          </div>
        );

      case "Users":
        return (
          <div className="fade-in-up">
            <div className="container-fluid mt-3 gap-3 fade-in-up">
              <div className="row ">
                {users.map((user, index) => (
                  <div className="col-md-4 mx-auto" key={index}>
                    <div key={index}>
                      <div key={user._id}>
                        <UserCard user={user} key={index} />
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
                  Previous={handlePreviousPage("userCurrentPage")}
                  Next={handleNextPage("userCurrentPage")}
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
                {vets.map((vet, index) => (
                  <div className="col-md-4 mx-auto" key={index}>
                    <div key={index}>
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
                Previous={handlePreviousPage("vetCurrentPage")}
                Next={handleNextPage("vetCurrentPage")}
              />
            </div>
          </div>
        );

      case "Trainers":
        return (
          <div className="fade-in-up">
            <div className="container-fluid mt-3 fade-in-up">
              <div className="row">
                {trainers.map((trainer, index) => (
                  <div className="col-md-4 mx-auto" key={index}>
                    <div key={index}>
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
                  Previous={handlePreviousPage("trainerCurrentPage")}
                  Next={handleNextPage("trainerCurrentPage")}
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
                {pets.map((pet, index) => (
                  <div className="col-md-4 mx-auto" key={index}>
                    <div key={index}>
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
                  Previous={handlePreviousPage("petCurrentPage")}
                  Next={handleNextPage("petCurrentPage")}
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
