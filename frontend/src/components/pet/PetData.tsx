"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getPetDetails, setAdopted } from "@/redux/pet/petService";
import { setPetDetails } from "@/redux/pet/petSlice";
import toast from "react-hot-toast";

const PetDetails = () => {
  const {id}  = useParams();
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { petDetails } = useSelector((state: RootState) => state.pet);
  useEffect(() => {
    async function fetchData() {
      if (id) {
        try {
          const response = await dispatch(getPetDetails(id));
          if (response.type === "getPetDetails/rejected") {
            throw response; 
          } else {
            dispatch(setPetDetails(response.payload));
          }
        } catch (error) {
          console.error("Error fetching pet:", error);
        }
      }
    }
    fetchData();
  }, [id]);

  const handleAdopt = async () => {
    try{
      const response = await dispatch(setAdopted(petDetails._id));
      if(response.type === "setAdopted/rejected"){
        throw response;
      }
      else{
        toast.success("You have Successfully adopted the pet!");
        router.push("/adopt");
      }
    }
    catch(error){
      toast.error("Please Login First!");
      router.push("/login");
    }
  }


  return (

    <div>
<h1 className="text-3xl mt-6 mb-6 text-dark-blue text-center " style={{fontSize: "30px"}}>Facts about:  {petDetails?.pet_name}</h1>
    <div className="flex gap-6 p-5 border-2 m-12 shadow rounder-lg">
    <img src={petDetails?.imageUrl} alt="pet picture" className="w-64 h-64 rounded-lg" style={{width: "450px", height: "400px"}}/>
    <div className="ml-12 mr-12 ">
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
        <label className="font-bold text-dark-blue">Health Conditions:</label>
        <span className="ml-2">{petDetails?.health_conditions || "None"}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold text-dark-blue">Allergies:</label>
        <span className="ml-2">{petDetails?.allergies || "None"}</span>
      </div>
      <div className="mb-4">
        <label className="font-bold text-dark-blue">Additional Notes:</label>
        <span className="ml-2">{petDetails?.additional_notes || "None"}</span>
      </div>
    </div>
  </div>
<h3 className="text-dark-blue italic container ">Note:</h3>
  <p className="text-red-600 italic container font-bold ">*If you're considering adopting this delightful pet, kindly reach out to the owner for further details. </p>
  <p className="text-red-600 italic container font-bold "> *Your decision to adopt should be made responsibly, after engaging in a discussion with the owner.</p>
  <p className="text-red-600 italic container font-bold ">*Please do not make any payment for transportation, vaccination etc of pet in advance. </p>
  <p className="text-red-600 italic container font-bold">*Only make any payment upon arrival of the pet at your location.</p>



<div className="flex justify-center">
<button onClick={() => handleAdopt()}  className="text-white my-12 fs-6 bg-saddle-brown py-2 px-8 rounded-lg text-lg">Adopt</button>
</div>
    </div>
  );
};

export default PetDetails;
