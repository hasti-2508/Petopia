"use client";
import React, { useEffect } from "react";
import { PetAdoptCard } from "../pet/PetCard";
import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getPets } from "@/redux/pet/petService";
import {
  setPetData,
  setOriginalPetData,
  setCurrentPage,
  setSearchTerm,
  setLoading,
} from "@/redux/pet/petSlice";
import toast from "react-hot-toast";

function Adopt() {
  const dispatch: AppDispatch = useDispatch();
  const {
    petData, originalPetData, currentPage,searchTerm, loading
  } = useSelector((state: RootState) => state.pet);
  const searchFilter = () => {
    const filterData = originalPetData.filter((data) => {
      const ageString = String(data.age);
      if (
        data.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.pet_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ageString.includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
dispatch(setPetData(filterData));
  };
  useEffect(() => {
    dispatch(setPetData(originalPetData));
  }, [originalPetData]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await dispatch(getPets(currentPage));
        if (response.type === "getPets/rejected") {
          throw response;
        } else {
          dispatch(setOriginalPetData(response.payload));
          dispatch(setLoading(false));
        }
      } catch (error) {
        toast.error(error.payload);
      }
    }
    dispatch(setLoading(true));
    fetchPets();
  }, [currentPage]);

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1))
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1))
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

          <form className=" max-w-xl mx-auto mt-6">
            {/* <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label> */}
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
                  className="block w-full ml-2 p-4 ps-10 text-sm text-gray-700 border border-dark-blue rounded-lg bg-white  focus:ring-black focus:border-black "
                  placeholder="Search by color, species, name, city..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="text-white absolute my-2 end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  searchFilter();
                }}
              >
                Search
              </button>
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
                  className="col-md-3 mb-6 flex-col justify-center"
                  key={pet._id}
                >
                  <PetAdoptCard key={pet._id} pet={pet} />
                  {/* <Link
                    href="/PetData"
                    className="no-underline flex justify-center items-center"
                  >
                    <button
                      type="button"
                      className="text-gray-700 font-bold items-center bg-saddle-brown py-2 px-8 mr-20 shadow mt-4 rounded-xl fs-6 no-underline"
                    >
                      Adopt
                    </button>
                  </Link> */}
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
