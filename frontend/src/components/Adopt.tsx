"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PetCard from "@/components/PetCard";
import Pagination from "@/components/Pagination";
import { Pet } from "../interfaces/pet";
import Link from "next/link";

function Adopt() {
  const [petData, setPetData] = useState<Pet[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categorySearch, setCategorySearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const searchFilter = () => {
    const filterData = petData.filter((data) => {
      if (
        searchTerm === data.species ||
        searchTerm === data.breed ||
        searchTerm === String(data.age) ||
        searchTerm === data.gender
      ) {
        return true;
      }
    });

    setPetData(filterData);
  };

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await axios.get<Pet[]>(
          `${process.env.HOST}/pet?page=${currentPage}`
        );

        setPetData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    }
    setLoading(true);
    fetchPets();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!petData) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <img
          src="http://localhost:3000/assets/AdoptLoading.gif"
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center my-52">
          <img
            style={{ width: "250px", height: "250px" }}
            src="http://localhost:3000/assets/AdoptLoading.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center w-full h-full mb-4">
            <img
              src="http://localhost:3000/assets/adoption.png"
              alt="Background"
              className="object-cover"
            />
          </div>
          <form className="max-w-lg mx-auto">
            <div className="flex">
              <button
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                className="flex-shrink-0 z-10 inline-flex 
            items-center py-2.5 px-4 text-sm font-medium text-center
             text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg
              hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100
             "
                type="button"
                style={{ fontFamily: "open-sans", fontSize: "20px" }}
              >
                All categories
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdown"
                className={` z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 hidden`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-600"
                  aria-labelledby="dropdown-button"
                  key={Math.random()}
                >
                  <li key={Math.random()}>
                    <button
                      onClick={(e: any) => {
                        setCategorySearch(e.target.value);
                      }}
                      type="button"
                      value={"species"}
                      className="inline-flex w-full px-4 py-2"
                    >
                      species
                    </button>
                  </li>
                  <li key={Math.random()}>
                    <button
                      value={"breed"}
                      type="button"
                      onClick={(e: any) => {
                        setCategorySearch(e.target.value);
                      }}
                      className="inline-flex w-full px-4 py-2"
                    >
                      breed
                    </button>
                  </li>
                  <li key={Math.random()}>
                    <button
                      value={"age"}
                      onClick={(e: any) => {
                        setCategorySearch(e.target.value);
                      }}
                      type="button"
                      className="inline-flex w-full px-4 py-2"
                    >
                      age
                    </button>
                  </li>
                  <li key={Math.random()}>
                    <button
                      value={"gender"}
                      onClick={(e: any) => {
                        setCategorySearch(e.target.value);
                      }}
                      type="button"
                      className="inline-flex w-full px-4 py-2"
                    >
                      gender
                    </button>
                  </li>
                  <li key={Math.random()}>
                    <button
                      value={"city"}
                      onClick={(e: any) => {
                        setCategorySearch(e.target.value);
                      }}
                      type="button"
                      className="inline-flex w-full px-4 py-2"
                    >
                      city
                    </button>
                  </li>
                </ul>
              </div>
              <div className="relative w-full">
                <input
                  type="search"
                  onKeyUp={(e: any) => setSearchTerm(e.target.value)}
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm  rounded-e-lg border-s-gray-50
               border-s-2 border border-gray-300 focus:ring-saddle-brown focus:border-dark-blue
            "
                  placeholder="Search for pet, city....."
                  required
                />
                <button
                  type="button"
                  onClick={() => searchFilter()}
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full rounded-e-lg border
               border-dark-blue focus:ring-4 focus:outline-none focus:ring-saddle-brown
               "
                >
                  <svg
                    className="w-4 h-4"
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
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
          <h1
            className="card-title font-bold text-center mt-4 "
            style={{ fontFamily: "open-sans", fontSize: "40px" }}
          >
            Pets available for Adoption
          </h1>
          <div className="container-fluid mt-3">
            <div className="row">
              {petData.map((pet) => (
                <div
                  className="col-md-4 mb-4 d-flex justify-center"
                  key={pet._id}
                >
                  <PetCard key={pet._id} pet={pet} />
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
                </div>
              ))}
            </div>
          </div>
          <Pagination Previous={handlePreviousPage} Next={handleNextPage} />
        </div>
      )}
    </div>
  );
}

export default Adopt;
