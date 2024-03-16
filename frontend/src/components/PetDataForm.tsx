"use client";
import { TrainingPlanBooking } from "@/interfaces/trainingPlanBooking";
import React from "react";

type PetData = {
  pet_species: string;
  pet_breed: string;
  pet_size: string;
  pet_gender: string;
  pet_age: number;
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
    <div>
      <h1>Add your pet Details</h1>
      <label htmlFor="pet_species">What is type of your pet?</label>
      <div>
        <button
          type="button"
          value={pet_species}
          onClick={() => updateFields({ pet_species: "cat" })}
          autoFocus
          className="bg-white  focus:border-black"
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
          className="bg-white ml-5"
          style={{ width: "120px", height: "90px" }}
        >
          <img
            src="http://localhost:3000/assets/dog.png"
            alt=""
            style={{ width: "100px", height: "70px" }}
          />
        </button>
      </div>

      <label htmlFor="pet_breed">What is the Breed of your pet?</label>
      <input
        type="text"
        value={pet_breed}
        onChange={(e) => updateFields({ pet_breed: e.target.value })}
      />

      <label htmlFor="pet_size"> What is the size of your pet? </label>
      <br />
      <button
      type="button"
        className="bg-blue"
        style={{ width: "120px", height: "90px" }}
        autoFocus
        value={pet_size}
        onClick={() => updateFields({ pet_size: "small" })}
      >
        Small
      </button>
      <button
        type="button"
        className="bg-blue"
        style={{ width: "120px", height: "90px" }}
        value={pet_size}
        onClick={() => updateFields({ pet_size: "medium" })}
      >
        Medium
      </button>
      <button
        type="button"
        className="bg-blue"
        style={{ width: "120px", height: "90px" }}
        value={pet_size}
        onClick={() => updateFields({ pet_size: "large" })}
      >
        Large
      </button>
      <br />
      <label htmlFor="pet_age">How old is your pet?(In Years)</label>
      <input
        type="number"
        step={0.1}
        min={0.1}
        placeholder="6 months = 0.6"
        onChange={(e) =>
          updateFields({ pet_age: parseFloat(e.target.value) || 0 })
        }
      />

      <label htmlFor="pat_gender">What is the gender of your pet?</label>
      <br />
      <button
        type="button"
        autoFocus
        className="bg-blue focus:border-black "
        style={{ width: "120px", height: "90px" }}
        value={pet_gender}
        onClick={() => updateFields({ pet_gender: "Female" })}
      >
        Female
      </button>
      <button
        type="button"
        className="bg-blue"
        style={{ width: "120px", height: "90px" }}
        value={pet_gender}
        onClick={() => updateFields({ pet_gender: "Male" })}
      >
        Male
      </button>

      <br />
      <label htmlFor="aggressiveness">How is aggressive is your pet?</label>
      <br />
      <button
        type="button"
        className="bg-blue  focus:border-black"
        style={{ width: "120px", height: "90px" }}
        autoFocus
        value={aggressiveness}
        onClick={() => updateFields({ aggressiveness: "Low" })}
      >
        Low
      </button>
      <button
        type="button"
        className="bg-blue "
        style={{ width: "120px", height: "90px" }}
        value={aggressiveness}
        onClick={() => updateFields({ aggressiveness: "Normal" })}
      >
        Normal
      </button>
      <button
        type="button"
        className="bg-blue  "
        style={{ width: "120px", height: "90px" }}
        value={aggressiveness}
        onClick={() => updateFields({ aggressiveness: "High" })}
      >
        High
      </button>
    </div>
  );
}

export default PetDataForm;
