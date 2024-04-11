"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { PetCardProps } from "../../interfaces/pet";
import { User, UserData } from "../../interfaces/user";

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const [owner, setOwner] = useState<User>();

  useEffect(() => {
    async function fetchOwnerName() {
      try {
        const response = await axios.get(
          `${process.env.HOST}/user/${pet.owner[0]}`
        );
        const { user } = response.data;
        setOwner(user);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          window.location.href = "/Login";
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 404
        ) {
          console.error("User Not Found!");
        } else {
          console.error(error);
        }
      }
    }

    fetchOwnerName();
  }, []);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom">
      <Link href="/Adopt/PetData">
        <img
          style={{ height: "250px" }}
          className="w-full p-4 img-responsive"
          src={pet.imageUrl}
          alt={pet.pet_name}
        />
      </Link>
      <div className="px-6 py-3">
        <div className="font-bold text-xl mb-2">{pet?.pet_name}</div>
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Species:
              </label>
              <span className="fw-medium">{pet.species}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Breed:
              </label>{" "}
              <span className="fw-medium">{pet.breed}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Gender:
              </label>
              <span className="fw-medium">{pet.gender}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Age:
              </label>
              <span className="fw-medium">{pet.age}</span>
            </div>
          </div>
          <div className="mt-2.5">
            <label htmlFor="species" className="font-bold text-dark-blue  ">
              City:
            </label>{" "}
            <span className="fw-medium">have to add city here</span>
          </div>
        </div>
      </div>

      <ul className="list-group p-2 border-top" key={Math.random()}>
        <li
          className="list-group-item border-0 d-flex justify-content-between align-items-start"
          key={Math.random()}
        >
          <div className="ms-2 me-auto">
            <p className="fw-semibold text-secondary">Owner:</p>
            <div className="fw-bold d-flex gap-4">
              <div>
                <img
                  src="http://localhost:3000/assets/user.png"
                  alt="Owner Image"
                  className="rounded-circle w-16 border border-1"
                />
              </div>
              <div>
                <div className="d-flex flex-column gap-1">
                  <span className="d-flex gap-2">
                    <PersonIcon color="primary" /> Hasti Kapadiya
                  </span>
                  <span className="d-flex gap-2">
                    <CallIcon color="success" />{" "}
                    <a className="text-gray-700 no-underline">Contact Now</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="border-1 border-gray-200"></div>
    </div>
  );
};

const PetAdoptCard: React.FC<PetCardProps> = ({ pet }) => {
  const [owner, setOwner] = useState<UserData>();

  useEffect(() => {
    async function fetchOwnerName() {
      try {
        const response = await axios.get(
          `${process.env.HOST}/user/${pet.owner[0]}`
        );
        const { user } = response.data;
        setOwner(user);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          window.location.href = "/Login";
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 404
        ) {
          console.error("User Not Found!");
        } else {
          console.error(error);
        }
      }
    }

    fetchOwnerName();
  }, []);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom">
      <Link href="/Adopt/PetData">
        <img
          style={{ height: "250px" }}
          className="w-full p-4 img-responsive"
          src={pet.imageUrl}
          alt={pet.pet_name}
        />
      </Link>
      <div className="px-6 py-3">
        <div className="font-bold text-2xl mb-2">{pet?.pet_name}</div>
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Species:
              </label>
              <span className="fw-medium">{pet.species}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Breed:
              </label>
              <span className="fw-medium">{pet.breed}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Gender:
              </label>{" "}
              <span className="fw-medium">{pet.gender}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Age:
              </label>{" "}
              <span className="fw-medium">{pet.age}</span>
            </div>
          </div>
          <div className="mt-2.5">
            <label htmlFor="species" className="font-bold text-dark-blue  ">
              City:
            </label>{" "}
            <span className="fw-medium">{owner?.city}</span>
          </div>
        </div>
      </div>

      <ul className="list-group p-2 border-top" key={Math.random()}>
        <li
          className="list-group-item border-0 d-flex justify-content-between align-items-start"
          key={Math.random()}
        >
          <div className="ms-2 me-auto">
            <p className="fw-semibold text-secondary">Owner:</p>
            <div className="fw-bold d-flex gap-4">
              <div>
                <img
                  src="http://localhost:3000/assets/user.png"
                  alt="Owner Image"
                  className="rounded-circle w-16 border border-1"
                />
              </div>
              <div>
                <div className="d-flex flex-column gap-1">
                  <span className="d-flex gap-2">
                    <PersonIcon color="primary" />
                    {owner?.name}
                  </span>
                  <span className="d-flex gap-2">
                    <CallIcon color="success" />
                    <a className="text-gray-700 no-underline">
                      {owner?.phoneNo}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div className="border-1 border-gray-200"></div>
      <Link
        href="/PetData"
        className="no-underline flex justify-center items-center"
      >
        <button
          type="button"
          // className="text-gray-700 font-bold items-center bg-saddle-brown py-2 px-8 mr-20 shadow mt-4 rounded-xl fs-6 no-underline"
          className="text-white bg-primary py-1.5 px-6 my-2 rounded-xl fs-6"
        >
          Adopt
        </button>
      </Link>
    </div>
  );
};

const PetProfileCard: React.FC<PetCardProps> = ({ pet }) => {
  const [owner, setOwner] = useState<UserData>();

  useEffect(() => {
    async function fetchOwnerName() {
      try {
        const response = await axios.get(
          `${process.env.HOST}/user/${pet.owner[0]}`
        );
        const { user } = response.data;
        setOwner(user);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          window.location.href = "/Login";
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 404
        ) {
          console.error("User Not Found!");
        } else {
          console.error(error);
        }
      }
    }

    fetchOwnerName();
  }, []);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom">
      <Link href="/Adopt/PetData">
        <img
          style={{ height: "250px" }}
          className="w-full p-4 img-responsive"
          src={pet.imageUrl}
          alt={pet.pet_name}
        />
      </Link>
      <div className="px-6 py-3">
        <div className="font-bold text-xl mb-2">{pet?.pet_name}</div>
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Species:
              </label>{" "}
              <span className="fw-medium">{pet.species}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Breed:
              </label>{" "}
              <span className="fw-medium">{pet.breed}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Gender:
              </label>{" "}
              <span className="fw-medium">{pet.gender}</span>
            </div>
            <div className="col-md-6">
              <label htmlFor="species" className="font-bold text-dark-blue  ">
                Age:
              </label>{" "}
              <span className="fw-medium">{pet.age}</span>
            </div>
          </div>
          <div className="mt-2.5">
            <label htmlFor="species" className="font-bold text-dark-blue  ">
              City:
            </label>{" "}
            <span className="fw-medium">{owner?.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetCard, PetAdoptCard, PetProfileCard };
