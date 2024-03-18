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
      <h1>Add your pet Details</h1>
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
      </div>
    </>
  );
}

export default PetDataForm;
