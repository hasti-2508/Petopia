"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getOwner, getPetDetails } from "@/redux/pet/petService";
import { setPetDetails } from "@/redux/pet/petSlice";

const PetDetails = () => {
  const { id }: any = useParams();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { petDetails, owner } = useSelector((state: RootState) => state.pet);
  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await dispatch(getPetDetails(id));
          if (response.type === "getPetDetails/rejected") {
            throw response;
          } else {
            dispatch(setPetDetails(response.payload));
            dispatch(getOwner(response.payload.owner[0]));
          }
        } catch (error) {
          console.error("Error fetching pet:", error);
        }
      }
    }
    fetchData();
  }, [id]);
  return (
    <div>
      <h1
        className="text-3xl font-bold mb-4 mt-6 text-center fade-in-up"
        style={{ fontFamily: "open-sans", fontSize: "35px" }}
      >
        Facts about: {petDetails?.pet_name}
      </h1>
      <div className=" m-12 border-2 shadow rounder-lg">
        <div className="flex gap-6 p-5">
          <img
            src={petDetails?.imageUrl}
            alt="pet picture"
            className="w-64 h-64 rounded-lg fade-in-right"
            style={{ width: "500px", height: "400px" }}
          />
          <div className="ml-12 mr-12 fade-in-right ">
            <div className="mb-4">
              <label className="font-bold text-dark-blue">Name:</label>
              <span className="ml-2">{petDetails?.pet_name || "None"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-dark-blue">Species:</label>
              <span className="ml-2">{petDetails?.species || "None"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-dark-blue">Age:</label>
              <span className="ml-2">{petDetails?.age || "None"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-dark-blue">Breed:</label>
              <span className="ml-2">{petDetails?.breed || "None"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-dark-blue">Gender:</label>
              <span className="ml-2">{petDetails?.gender || "None"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-dark-blue">Color:</label>
              <span className="ml-2">{petDetails?.color || "None"}</span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-dark-blue">
                Health Conditions:
              </label>
              <span className="ml-2">
                {petDetails?.health_conditions || "None"}
              </span>
            </div>
            <div className="mb-4">
              <label className="font-bold text-dark-blue">Allergies:</label>
              <span className="ml-2">{petDetails?.allergies || "None"}</span>
            </div>
            <div className="">
              <label className="font-bold text-dark-blue">
                Additional Notes:
              </label>
              <span className="ml-2">
                {petDetails?.additional_notes || "None"}
              </span>
            </div>
          </div>
        </div>
        <div className="py-3 px-4 border-2 mt-2 mb-6 mx-12 shadow rounded-xl bg-dark-blue w-1/2 fade-in-up">
          <h1
            className="text-3xl mt-6 mb-6 text-white "
            style={{ fontSize: "30px" }}
          >
            Owner Details:
          </h1>
          <div className="flex gap-8">
            <div>
              <div className="flex gap-3">
                <label className="font-bold text-saddle-brown">Name:</label>
                <p className="text-white">{owner?.user.name}</p>
              </div>
              <div className="flex gap-3">
                <label className="font-bold text-saddle-brown">
                  Phone Number:
                </label>
                <p className="text-white">{owner?.user.phoneNo}</p>
              </div>
              <div className="flex gap-3">
                <label className="font-bold text-saddle-brown">Email:</label>
                <p className="text-white">{owner?.user.email}</p>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <label className="font-bold text-saddle-brown">City:</label>
                <p className="text-white">{owner?.user.city}</p>
              </div>
              <div className="flex gap-3">
                <label className="font-bold text-saddle-brown">State:</label>
                <p className="text-white">{owner?.user.state}</p>
              </div>
              <div className="flex gap-3">
                <label className="font-bold text-saddle-brown">
                  Pets owned by owner:
                </label>
                <p className="text-white">{owner?.user.pets.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-dark-blue italic container ">Note:</h3>
      <p className="text-red-600 italic container font-bold ">
        *If you're considering adopting this delightful pet, kindly reach out to
        the owner for further details.{" "}
      </p>
      <p className="text-red-600 italic container font-bold ">
        {" "}
        *Your decision to adopt should be made responsibly, after engaging in a
        discussion with the owner.
      </p>
      <p className="text-red-600 italic container font-bold ">
        *Please do not make any payment for transportation, vaccination etc of
        pet in advance.{" "}
      </p>
      <p className="text-red-600 italic container font-bold">
        *Only make any payment upon arrival of the pet at your location.
      </p>

      {/* <div className="flex justify-center">
        <button
          onClick={() => handleAdopt()}
          className="text-white my-12 fs-6 bg-saddle-brown py-2 px-8 rounded-lg text-lg"
        >
          Adopt
        </button>
      </div> */}
    </div>
  );
};

export default PetDetails;
