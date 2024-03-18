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
  pet_age: "",
  aggressiveness: "",
  user_name: "",
  email: "",
  phoneNo: "",
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
  const [bookingSuccess, setBookingSuccess] = useState(false);

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
        setBookingSuccess(true);
        setTimeout(() => {
          window.location.href = `/payment/${response.data.id}`;
        }, 3000);
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

      {bookingSuccess && (
        <div>
          <img
            src="http://localhost:3000/assets/bookingSuccess.gif"
            alt="Booking Confirmation"
          />
          <p>Redirecting to payment integration page...</p>
        </div>
      )}
    </div>
  );
}

export default BookTraining;
