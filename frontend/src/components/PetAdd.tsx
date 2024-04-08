"use client";
import React, { useState } from "react";
import axios from "axios";
import { PetDto } from "@/interfaces/pet";

function PetAdd() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<PetDto>({
    pet_name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    weight: "",
    health_conditions: "",
    allergies: "",
    additional_notes: "",
    imageUrl: "",
    isAdopted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdoptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "true";
    setFormData({
      ...formData,
      isAdopted: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jwt = localStorage.getItem("jwt");
    const requestData = {
      ...formData,
      jwt: jwt,
    };

    try {
      const response = await axios.post(
        `${process.env.HOST}/pet/`,
        requestData
      );
      const petId = response.data._id;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await axios.post(
          `${process.env.HOST}/pet/${petId}/uploadImage`,
          formData
        );
      }
      window.location.href = "/User/Profile";
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        window.location.href = "/Login";
      } else {
        console.error("Error posting Pet data:", error);
      }
    }
  };
  return (
    <div className=" w-2/5 ms-5">
      <h2
        className="text-center text-3xl font-bold my-8"
        style={{ fontFamily: "open-sans", fontSize: "40px" }}
      >
        Create Pet
      </h2>
      <div className="border-2 border-gray-180 mb-3"></div>
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
          value={formData.pet_name}
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
          value={formData.species}
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
          value={formData.breed}
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
          value={formData.age}
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
          value={formData.gender}
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
          value={formData.color}
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
          value={formData.weight}
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
          value={formData.health_conditions}
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
          value={formData.allergies}
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
          value={formData.additional_notes}
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
          onChange={handleFileChange}
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
              checked={!formData.isAdopted}
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
              checked={formData.isAdopted}
              onChange={handleAdoptionChange}
            />
            No
          </label>
        </div>

        <button
          type="submit"
          className="text-gray-700   flex items-center bg-saddle-brown py-2 px-3 mx-16 my-8 rounded-pill fs-6 no-underline"
        >
          Create Pet
        </button>
      </form>
    </div>
  );
}

export default PetAdd;
