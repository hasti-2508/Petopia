"use client";
import React, { useEffect } from "react";
import { PetAdoptCard } from "../pet/PetCard";
import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getPets } from "@/redux/pet/petService";
import {
  setPetData,
  setCurrentPage,
  setSearchTerm,
  setLoading,
} from "@/redux/pet/petSlice";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import SearchAdminIcon from "../admin/Icon";

function Adopt() {
  const dispatch: AppDispatch = useDispatch();
  const {
    petData,
    originalPetData,
    currentPage,
    searchTerm,
    loading,
  } = useSelector((state: RootState) => state.pet);

  const searchFilter = () => {
    const filteredData = originalPetData.filter((data) => {
      const searchTerms = [
        data.color,
        data.species,
        data.pet_name,
        data.gender,
        data.breed,
        String(data.age),
      ].map(term => term.toLowerCase());
      return searchTerms.some(term => term.includes(searchTerm.toLowerCase()));
    });
    dispatch(setPetData(filteredData));
  };

  useEffect(() => {
    dispatch(setPetData(originalPetData));
  }, [searchTerm]);

  useEffect(() => {
    async function fetchPets() {
      try {
        const response = await dispatch(getPets(currentPage));
      } catch (error) {
        console.error(error.payload);
      }
    }
    dispatch(setLoading(true));
    fetchPets();
  }, [currentPage]);

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

 return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center my-52">
          <img
            style={{ width: "250px", height: "250px" }}
            src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379445/AdoptLoading_esfppq.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="fade-in-up">
          <div className="flex justify-center items-center w-full h-full mb-4 fade-in-up">
            <img
              src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379443/adoption_wzxvlh.png"
              alt="Background"
              className="object-cover"
            />
          </div>

          <form className=" max-w-xl mx-auto mt-6 fade-in-up">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchAdminIcon />
              </div>
              <div className="">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full ml-2 p-4 ps-10 text-sm text-gray-700 border border-dark-blue rounded-lg bg-white  focus:ring-black focus:border-black "
                  placeholder="Search by color, species, name, city..."
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
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
            <div className="row align-items-stretch">
              {petData.map((pet) => (
                <div
                  className="col-md-4 mb-6 d-flex flex-column align-items-center"
                  key={pet._id}
                >
                  <PetAdoptCard key={pet._id} pet={pet} />
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

export default redirectLoggedIn(Adopt);


