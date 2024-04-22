"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setImageFile, setPetDataForm } from "@/redux/user/userSlice";
import { petAdd } from "@/redux/user/userService";
import { uploadImageToCloudinary } from "@/utils/uploadCloudinary";

function PetAdd() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { petDataForm } = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setPetDataForm({ [e.target.name]: e.target.value }));
  };

  const handleAdoptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "true";
    dispatch(setPetDataForm({ ...petDataForm, isAdopted: value }));
  };

  const handleInputPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file && allowedTypes.includes(file.type)) {
      const { url } = await uploadImageToCloudinary(file);
      dispatch(setPetDataForm({ ...petDataForm, imageUrl: url }));
    } else {
      toast.error("Invalid file type. Please select a JPG, JPEG, or PNG file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(petAdd(petDataForm));
      if (result.type === "petAdd/rejected") {
        throw result;
      }
      toast.success("Pet Added!");
      router.push("/user/profile");
    } catch (error) {
      toast.error(error.payload);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h2
        className="text-3xl font-bold mb-4 mt-6"
        style={{ fontFamily: "open-sans", fontSize: "40px" }}
      >
        Create Pet
      </h2>
      <form onSubmit={handleSubmit}>
        <label
          className="block mb-2"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Pet Name:
        </label>
        <input
          type="text"
          name="pet_name"
          value={petDataForm.pet_name}
          onChange={handleChange}
          placeholder="eg. maggie"
          className="w-full px-4 py-2 rounded-lg border border-dark-blue"
          required
        />
        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Species:
        </label>
        <input
          type="text"
          name="species"
          placeholder="eg. dog"
          value={petDataForm.species}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-dark-blue"
          required
        />
        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Breed:
        </label>
        <input
          type="text"
          name="breed"
          placeholder=" eg. labrador"
          value={petDataForm.breed}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-dark-blue"
          required
        />
        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Age:
        </label>
        <input
          type="text"
          name="age"
          step={0.1}
          min={0.1}
          maxLength={2}
          value={petDataForm.age}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-dark-blue"
          required
        />

        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Gender:
        </label>
        <input
          type="text"
          name="gender"
          placeholder="eg. male"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          value={petDataForm.gender}
          onChange={handleChange}
          required
        />
        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Color:
        </label>
        <input
          type="text"
          name="color"
          placeholder="eg. golden"
          value={petDataForm.color}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          required
        />
        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Weight:
        </label>
        <input
          type="text"
          name="weight"
          maxLength={3}
          value={petDataForm.weight}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          required
        />
        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Health Conditions:
        </label>
        <input
          type="text"
          name="health_conditions"
          value={petDataForm.health_conditions}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="eg. Good"
          required
        />
        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Allergies:
        </label>
        <input
          type="text"
          name="allergies"
          value={petDataForm.allergies}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
          placeholder="eg. dust"
        />
        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Notes:
        </label>
        <input
          type="text"
          name="additional_notes"
          value={petDataForm.additional_notes}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />

        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Pet Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleInputPhoto}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          required
        />

        <label
          className="block mb-2 mt-1"
          style={{ fontFamily: "open-sans", fontSize: "18px" }}
        >
          Do you want to put your pet for adoption?
        </label>
        <div>
          <label
            className="block mb-2 mt-1"
            style={{ fontFamily: "open-sans", fontSize: "16px" }}
          >
            <input
              type="radio"
              name="isAdopted"
              value="false"
              checked={!petDataForm.isAdopted}
              onChange={handleAdoptionChange}
            />
            Yes
          </label>
          <label
            className="block mb-2 mt-1"
            style={{ fontFamily: "open-sans", fontSize: "16px" }}
          >
            <input
              type="radio"
              name="isAdopted"
              value="true"
              checked={petDataForm.isAdopted}
              onChange={handleAdoptionChange}
            />
            No
          </label>
        </div>

        <div className="w-full max-w-md mx-auto">
          <button
            type="submit"
            className="bg-dark-blue text-white py-2 px-4 rounded-md mt-4"
            style={{ marginBottom: "20px" }}
          >
            Create Pet
          </button>
        </div>
      </form>
    </div>
  );
}

export default PetAdd;
