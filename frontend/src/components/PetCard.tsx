"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { PetCardProps } from "../interfaces/pet";
import { User } from "../interfaces/user";

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const [owner, setOwner] = useState<User[]>([]);

  useEffect(() => {
    async function fetchOwnerName() {
      try {
        const response = await axios.get<User[]>(
          `${process.env.HOST}/user/${pet.owner}`
        );
        setOwner(response.data);
      } catch (error) {
        console.error("Error fetching owner name:", error);
      }
    }

    fetchOwnerName();
  }, []);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom">
      <Link href="/Adopt/PetData">
        <img
          style={{ height: "250px" }}
          className="w-full img-responsive"
          src={pet.imageUrl}
          alt={pet.pet_name}
        />
      </Link>
      <div className="px-6 py-3">
        <div className="font-bold text-xl mb-2">{pet?.pet_name}</div>
        <div className="text-gray-700 text-base">
          <div className="row justify-content-between">
            <div className="col-md-6 mb-2">
              Species: <span className="fw-medium">{pet.species}</span>
            </div>
            <div className="col-md-6">
              Breed: <span className="fw-medium">{pet.breed}</span>
            </div>
            <div className="col-md-6">
              Gender: <span className="fw-medium">{pet.gender}</span>
            </div>
            <div className="col-md-6">
              Age: <span className="fw-medium">{pet.age}</span>
            </div>
          </div>
          <div className="mt-2.5">
            city: <span className="fw-medium">have to add city here</span>
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
      <Link
        href="/PetData"
        className="no-underline flex justify-center items-center"
      >
        <button
          type="button"
          className="text-white bg-primary py-1.5 px-6 my-2 rounded-xl fs-6"
        >
          Adopt
        </button>
      </Link>

      {/* <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div> */}
    </div>
    // <div
    //   className="max-w-sm light-orange border border-gray-200 rounded-lg shadow mt-6"
    //   style={{ marginLeft: "55px" }}
    // >
    //   <a href="#">
    //     <img
    //       className="rounded-t-lg"
    //       style={{ width: "416px", height: "260px", padding: "15px" }}
    //       src={pet.imageUrl}
    //       alt={pet.pet_name}
    //     />
    //   </a>
    //   <div className="p-2 m-2">
    //     <a href="#">
    //       <h5
    //         className="mb-4 text-2xl font-bold text-center text-dark-blue no-underline"
    //         style={{ fontFamily: "open-sans", fontSize: "30px" }}
    //       >
    //         {pet?.pet_name}
    //       </h5>
    //     </a>

    //     <section className="ml-6">
    //       <div className="flex gap-20">
    //         <div className="flex justify-start">
    //           <label
    //             className="text-gray-900 mr-2 font-bold"
    //             style={{
    //               fontFamily: "open-sans",
    //               fontSize: "18px",
    //             }}
    //           >
    //             Species:
    //           </label>
    //           <p
    //             className=" text-gray-700 "
    //             style={{
    //               fontFamily: "open-sans",
    //               fontSize: "20px",
    //             }}
    //           >
    //             {pet.species}
    //           </p>
    //         </div>
    //         <div className="flex justify-start">
    //           <label
    //             className="text-gray-900 mr-2 font-bold"
    //             style={{
    //               fontFamily: "open-sans",
    //               fontSize: "18px",
    //             }}
    //           >
    //             Breed:
    //           </label>
    //           <p
    //             className=" text-gray-700 "
    //             style={{
    //               fontFamily: "open-sans",
    //               fontSize: "18px",
    //             }}
    //           >
    //             {pet.breed}
    //           </p>
    //         </div>
    //       </div>
    //       <div className="flex gap-16">
    //         <div className="flex justify-start">
    //           <label
    //             className="text-gray-900 mr-2 font-bold"
    //             style={{
    //               fontFamily: "open-sans",
    //               fontSize: "18px",
    //             }}
    //           >
    //             Gender:
    //           </label>
    //           <p
    //             className=" text-gray-700 "
    //             style={{
    //               fontFamily: "open-sans",
    //               fontSize: "18px",
    //             }}
    //           >
    //             {pet.gender}
    //           </p>
    //         </div>
    //         <div className="flex justify-start">
    //           <label
    //             className="text-gray-900 mr-2 font-bold"
    //             style={{
    //               fontFamily: "open-sans",
    //               fontSize: "18px",
    //             }}
    //           >
    //             Age:
    //           </label>
    //           <p
    //             className=" text-gray-700 "
    //             style={{
    //               fontFamily: "open-sans",
    //               fontSize: "18px",
    //             }}
    //           >
    //             {pet.age}
    //           </p>
    //         </div>
    //       </div>
    //     </section>

    //     <div className="border-1 border-gray-600 mb-2"></div>

    //     <section>
    //       <h5
    //         className="mb-2 text-2xl  text-gray-800"
    //         style={{ fontFamily: "open-sans", fontSize: "20px" }}
    //       >
    //         Owner details:
    //       </h5>
    //       <div className="flex ">
    //         <div>
    //           <img
    //             className="rounded-full w-14"
    //             src="http://localhost:3000/assets/user.png"
    //             alt=""
    //           />
    //         </div>
    //         <div>
    //           <p>{ownerName}</p>
    //           <p>{ownerName}</p>
    //         </div>
    //       </div>
    //     </section>
    //     <a
    //       href="#"
    //       className="inline-flex items-center px-3 py-2 text-sm font-medium no-underline text-center text-dark-blue bg-saddle-brown rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
    //       style={{ fontFamily: "open-sans", fontSize: "20px" }}
    //     >
    //       Adopt
    //       {/* <svg
    //         className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 14 10"
    //       >
    //         <path
    //           stroke="currentColor"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="2"
    //           d="M1 5h12m0 0L9 1m4 4L9 9"
    //         />
    //       </svg> */}
    //     </a>
    //   </div>
    // </div>
  );
};

export default PetCard;
