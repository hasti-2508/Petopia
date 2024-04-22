"use client";
import { TrainingPlanBooking } from "@/interfaces/trainingPlanBooking";
import React from "react";

type UserData = {
  user_name: string;
  email: string;
  phoneNo: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
};

type UserDataProps = UserData & {
  updateFields: (fields: Partial<TrainingPlanBooking>) => void;
};

function UserDataForm({
  user_name,
  email,
  phoneNo,
  address,
  city,
  state,
  notes,
  updateFields,
}: UserDataProps) {
  return (
    <div className=" w-full max-w-md mx-auto mt-4">
      <h1
        className="text-center text-3xl font-bold mb-8"
        style={{ fontFamily: "open-sans", fontSize: "40px" }}
      >
        Add your personal details
      </h1>

      <div className="mb-4">
        <label
          htmlFor="user_name"
          className="block mb-2"
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
        >
          Your Name
        </label>
        <input
          type="text"
          placeholder="eg. Hasti Kapadiya"
          value={user_name}
          onChange={(e) => updateFields({ user_name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2"
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
        >
          Your Email Address
        </label>
        <input
          type="email"
          value={email}
          placeholder="eg. hastikapadiya25@gmail.com"
          onChange={(e) => updateFields({ email: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phoneNo"
          className="block mb-2"
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
        >
          Your Phone Number
        </label>
        <input
          type="tel"
          placeholder="eg. 7990529537"
          pattern="[0-9]{10}"
          maxLength={10}
          title="Number should be of 10 digits"
          id="phoneNo"
          name="phoneNo"
          onChange={(e) => updateFields({ phoneNo: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block mb-2"
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
        >
          Address
        </label>
        <input
          type="text"
          placeholder="eg. A-44, Sanketdham society"
          value={address}
          onChange={(e) => updateFields({ address: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="city"
          className="block mb-2"
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
        >
          City
        </label>
        <input
          type="text"
          placeholder="eg. surat"
          value={city}
          onChange={(e) => updateFields({ city: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="state"
          className="block mb-2"
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
        >
          State
        </label>
        <input
          type="text"
          value={state}
          placeholder="eg. Gujarat"
          onChange={(e) => updateFields({ state: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="notes"
          className="block mb-2"
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
        >
          Additional notes for Groomer
        </label>
        <input
          type="text"
          value={notes}
          placeholder="Anything  else you want to add?"
          onChange={(e) => updateFields({ notes: e.target.value })}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </div>
  );
}

export default UserDataForm;
