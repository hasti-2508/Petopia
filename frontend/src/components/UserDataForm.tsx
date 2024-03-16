"use client";
import { TrainingPlanBooking } from "@/interfaces/trainingPlanBooking";
import React from "react";
type UserData = {
  user_name: string;
  email: string;
  phoneNo: number;
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
    <div>
      <h1>Add your personal details</h1>
      <label htmlFor="user_name">Your Name</label>
      <input
        type="text"
        value={user_name}
        onChange={(e) => updateFields({ user_name: e.target.value })}
      />

      <label htmlFor="email">Your Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />

      <label htmlFor="phoneNo">Your Phone Number</label>
      <input
        type="number"
        pattern="[0-9]{10}"
        title="Number should be of 10 digits"
        onChange={(e) =>
          updateFields({ phoneNo: parseInt(e.target.value, 10) })
        }
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => updateFields({ address: e.target.value })}
      />

      <label htmlFor="address">City</label>
      <input
        type="text"
        value={city}
        onChange={(e) => updateFields({ city: e.target.value })}
      />

      <label htmlFor="address">State</label>
      <input
        type="text"
        value={state}
        onChange={(e) => updateFields({ state: e.target.value })}
      />

      <label htmlFor="address">Additional notes for Groomer</label>
      <input
        type="text"
        value={notes}
        onChange={(e) => updateFields({ notes: e.target.value })}
      />
    </div>
  );
}

export default UserDataForm;
