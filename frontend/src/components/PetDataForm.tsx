"use client";
import { TrainingPlanBooking } from "@/interfaces/trainingPlanBooking";
import React from "react";

type PetData = {
  pet_species: string;
  pet_breed: string;
  pet_size: string;
  pet_gender: string;
  pet_age: string;
  aggressiveness: string;
};

type PetDataProps = PetData & {
  updateFields: (fields: Partial<TrainingPlanBooking>) => void;
};

function PetDataForm({
  pet_species,
  pet_breed,
  pet_size,
  pet_gender,
  pet_age,
  aggressiveness,
  updateFields,
}: PetDataProps) {
  return (
    <>
      {/* <h1>Add your pet Details</h1>
      <div>
        <label htmlFor="pet_species">What is type of your pet?</label>

        <div className="d-flex justify-content-start gap-4">
          <button
            type="button"
            value={pet_species}
            onClick={() => {
              updateFields({ pet_species: "cat" });
            }}
            autoFocus
            className=" rounded-2 border-2 "
            style={{ width: "120px", height: "90px" }}
          >
            <img
              src="http://localhost:3000/assets/cat.png"
              alt=""
              style={{ width: "100px", height: "70px" }}
            />
          </button>
          <button
            type="button"
            value={pet_species}
            onClick={() => updateFields({ pet_species: "dog" })}
            className=" rounded-2  border-2"
            style={{ width: "120px", height: "90px" }}
          >
            <img
              src="http://localhost:3000/assets/dog.png"
              alt=""
              style={{ width: "100px", height: "70px" }}
            />
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="pet_breed">What is the Breed of your pet?</label>
        <input
          type="text"
          placeholder="labrador"
          value={pet_breed}
          required
          onChange={(e) => updateFields({ pet_breed: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="pet_size"> What is the size of your pet? </label>
        <div>
          <button
            type="button"
            style={{ width: "120px", height: "90px", backgroundColor: "blue" }}
            autoFocus
            value={pet_size}
            onClick={() => updateFields({ pet_size: "small" })}
          >
            Small
          </button>
          <button
            type="button"
            style={{ width: "120px", height: "90px", backgroundColor: "blue" }}
            value={pet_size}
            onClick={() => updateFields({ pet_size: "medium" })}
          >
            Medium
          </button>
          <button
            type="button"
            className="bg-blue"
            style={{ width: "120px", height: "90px", backgroundColor: "blue" }}
            value={pet_size}
            onClick={() => updateFields({ pet_size: "large" })}
          >
            Large
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="pet_age">How old is your pet?(In Years)</label>
        <input
          type="number"
          min={0.1}
          step={0.1}
          maxLength={2}
          required
          placeholder="6 month = 0.6"
          value={pet_age}
          onChange={(e) => updateFields({ pet_age: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="pat_gender">What is the gender of your pet?</label>
        <div>
          <button
            type="button"
            autoFocus
            className="bg-blue focus:border-black "
            style={{ width: "120px", height: "90px", backgroundColor: "blue" }}
            value={pet_gender}
            onClick={() => updateFields({ pet_gender: "Female" })}
          >
            Female
          </button>
          <button
            type="button"
            className="bg-blue"
            style={{ width: "120px", height: "90px", backgroundColor: "blue" }}
            value={pet_gender}
            onClick={() => updateFields({ pet_gender: "Male" })}
          >
            Male
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="aggressiveness mb-2">
          How is aggressive is your pet?
        </label>
        <div className="d-flex gap-3 ">
          <button
            type="button"
            className="bg-blue  focus:border-black"
            style={{ width: "120px", height: "90px", backgroundColor: "blue" }}
            autoFocus
            value={aggressiveness}
            onClick={() => updateFields({ aggressiveness: "Low" })}
          >
            Low
          </button>
          <button
            type="button"
            className="bg-blue "
            style={{ width: "120px", height: "90px", backgroundColor: "blue" }}
            value={aggressiveness}
            onClick={() => updateFields({ aggressiveness: "Normal" })}
          >
            Normal
          </button>
          <button
            type="button"
            className="bg-blue  "
            style={{ width: "120px", height: "90px", backgroundColor: "blue" }}
            value={aggressiveness}
            onClick={() => updateFields({ aggressiveness: "High" })}
          >
            High
          </button>
        </div>
      </div> */}

      {/* <img src="http://localhost:3000/assets/formpet.jpg" alt="" /> */}

      <div className=" w-full mr-12 ">
        <h1
          className="text-center text-3xl font-bold mb-8"
          style={{ fontFamily: "open-sans", fontSize: "40px" }}
        >
          Add your pet Details
        </h1>
        <div className="border-2 border-gray-200 mb-3"></div>
        <div className="mb-6 p-3">
          <label
            htmlFor="pet_species"
            className="block mb-2"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            🌀 What is type of your pet?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => updateFields({ pet_species: "cat" })}
              className={`rounded-lg overflow-hidden w-35 h-28 focus:outline-none ${
                pet_species === "cat" ? "border-dark-blue border-2" : ""
              }`}
            >
              <img
                src="http://localhost:3000/assets/cat.png"
                style={{ width: "120px", height: "90px" }}
              />
            </button>
            <button
              type="button"
              onClick={() => updateFields({ pet_species: "dog" })}
              className={`rounded-lg ml-3 overflow-hidden w-35 h-28 focus:outline-none ${
                pet_species === "dog" ? "border-dark-blue border-2" : ""
              }`}
            >
              <img
                src="http://localhost:3000/assets/dog.png"
                style={{ width: "120px", height: "90px" }}
              />
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="pet_breed"
            className="block mb-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            🌀 What is the Breed of your pet?
          </label>
          <input
            type="text"
            value={pet_breed}
            onChange={(e) => updateFields({ pet_breed: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-dark-blue  "
            placeholder="e.g. Labrador"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="pet_size"
            className="block mb-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            🌀 What is the size of your pet?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => updateFields({ pet_size: "small" })}
              className={`w-32 h-12 bg-dark-blue text-white rounded-lg px-4 py-2 focus:outline-none ${
                pet_size === "small" ? "bg-saddle-brown" : ""
              }`}
            >
              Small
            </button>
            <button
              type="button"
              onClick={() => updateFields({ pet_size: "medium" })}
              className={`w-32 h-12 bg-dark-blue text-white rounded-lg px-4 py-2 focus:outline-none ${
                pet_size === "medium" ? "bg-saddle-brown" : ""
              }`}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => updateFields({ pet_size: "large" })}
              className={`w-32 h-12 bg-dark-blue text-white rounded-lg px-4 py-2 focus:outline-none ${
                pet_size === "large" ? "bg-saddle-brown" : ""
              }`}
            >
              Large
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="pet_age"
            className="block mb-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            🌀 How old is your pet?
          </label>
          <input
            type="number"
            value={pet_age}
            onChange={(e) => updateFields({ pet_age: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="e.g. 5"
            min="0.1"
            step="0.1"
            maxLength={2}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="pet_gender"
            className="block mb-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            🌀 What is the gender of your pet?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => updateFields({ pet_gender: "Female" })}
              className={`w-32 h-12 bg-dark-blue text-white rounded-lg px-4 py-2 focus:outline-none ${
                pet_gender === "female" ? "bg-saddle-brown" : ""
              }`}
            >
              Female
            </button>
            <button
              type="button"
              onClick={() => updateFields({ pet_gender: "Male" })}
              className={`w-32 h-12 bg-dark-blue text-white rounded-lg px-4 py-2 focus:outline-none ${
                pet_gender === "Male" ? "bg-saddle-brown" : ""
              }`}
            >
              Male
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="aggressiveness"
            className="block mb-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            🌀 How aggressive is your pet?
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => updateFields({ aggressiveness: "Low" })}
              className={`w-32 h-12 bg-dark-blue text-white rounded-lg px-4 py-2 focus:outline-none ${
                aggressiveness === "low" ? "bg-saddle-brown" : ""
              }`}
            >
              Low
            </button>
            <button
              type="button"
              onClick={() => updateFields({ aggressiveness: "Normal" })}
              className={`w-32 h-12 bg-dark-blue text-white rounded-lg px-4 py-2 focus:outline-none ${
                aggressiveness === "Normal" ? "bg-saddle-brown" : ""
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => updateFields({ aggressiveness: "High" })}
              className={`w-32 h-12 bg-dark-blue text-white rounded-lg px-4 py-2 focus:outline-none ${
                aggressiveness === "High" ? "bg-saddle-brown" : ""
              }`}
            >
              High
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PetDataForm;
