"use client";
import { TrainingPlanBooking } from "@/interfaces/trainingPlanBooking";
import React, { FormEvent, useEffect, useState } from "react";
import useMultipleStep from "@/Hooks/useMultipleStep";
import PetDataForm from "./PetDataForm";
import UserDataForm from "./UserDataForm";
import DateAndTime from "./DateAndTime";
import axios from "axios";

const trainingBookingData: TrainingPlanBooking = {
  pet_species: "",
  pet_breed: "",
  pet_size: "",
  pet_gender: "",
  pet_age: 1,
  aggressiveness: "",
  user_name: "",
  email: "",
  phoneNo: 0,
  address: "",
  city: "",
  state: "",
  notes: "",
  booking_date: "",
  booking_time: "",
};

function BookTraining() {
  const [data, setData] = useState(trainingBookingData);
  const [trainingPlanId, setTrainingPlanId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("trainingPlanId");
      setTrainingPlanId(id);
    }
  }, []);

  function updateFields(fields: Partial<TrainingPlanBooking>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { step, isFirstStep, isLastStep, back, next } = useMultipleStep([
    <PetDataForm {...data} updateFields={updateFields} />,
    <UserDataForm {...data} updateFields={updateFields} />,
    <DateAndTime {...data} updateFields={updateFields} />,
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const jwt = localStorage.getItem("token");
    const requestData = {
      ...data,
      jwt: jwt,
    };

    if (!isLastStep) return next();
    async function postData() {
      try {
        const response = await axios.post(
          `${process.env.HOST}/trainingBooking/${trainingPlanId}`,
          requestData
        );
        console.log(response);
        console.log("Booking data posted successfully:", response.data);
      } catch (error) {
        console.error("Error posting booking data:", error);
      }
    }

    postData();
  }
  return (
    <div>
      <div
        style={{
          position: "relative",
          background: "white",
          padding: "2rem",
          margin: "1rem",
          borderRadius: ".5rem",
          fontFamily: "Arial",
          maxWidth: "max-content",
        }}
      >
        <form onSubmit={onSubmit}>
          {step}
          <div
            className="bg-black text-white"
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}
          >
            {!isFirstStep && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          </div>
        </form>
      </div>
      {/* <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form> */}
    </div>
  );
}

export default BookTraining;
