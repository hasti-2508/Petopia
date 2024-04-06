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
    age: 0.2,
    gender: "",
    color: "",
    weight: 0,
    health_conditions: "",
    allergies: "",
    additional_notes: "",
    imageUrl: "",
    isAdopted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "age" || name === "weight" ? parseFloat(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
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
    const jwt = localStorage.getItem("token");
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
    <div>
      <h2>Create Pet</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pet Name:
          <input
            type="text"
            name="pet_name"
            value={formData.pet_name}
            onChange={handleChange}
            required
          />
        </label>
        {formData.pet_name}
        <label>
          Species:
          <input
            type="text"
            name="species"
            placeholder="dog"
            value={formData.species}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            placeholder="labrador"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            step={0.1}
            min={0.1}
            maxLength={2}
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            placeholder="male"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Color:
          <input
            type="text"
            name="color"
            placeholder="golden"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Health Conditions:
          <input
            type="text"
            name="health_conditions"
            value={formData.health_conditions}
            onChange={handleChange}
            placeholder="Good"
            required
          />
        </label>
        <label>
          Allergies:
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="dust"
          />
        </label>
        <label>
          Notes:
          <input
            type="text"
            name="additional_notes"
            value={formData.additional_notes}
            onChange={handleChange}
          />
        </label>

        <label>
          Pet Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        <label>Do you want to put your pet for adoption?</label>
        <div>
          <label>
            <input
              type="radio"
              name="isAdopted"
              value="false"
              checked={!formData.isAdopted}
              onChange={handleAdoptionChange}
            />
            Yes
          </label>
          <label>
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

        <button type="submit">Create Pet</button>
      </form>
    </div>
  );
}

export default PetAdd;
