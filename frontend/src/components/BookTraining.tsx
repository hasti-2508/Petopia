"use client";
import { TrainingPlanBooking } from "@/interfaces/trainingPlanBooking";
import React, { FormEvent, useEffect, useState } from "react";
import useMultipleStep from "@/Hooks/useMultipleStep";
import PetDataForm from "./PetDataForm";
import UserDataForm from "./UserDataForm";
import DateAndTime from "./DateAndTime";
import axios from "axios";
// import { Notifications } from "react-push-notification";
// import addNotification from "react-push-notification";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "@/utils/axios";

const trainingBookingData: TrainingPlanBooking = {
  pet_species: "cat",
  pet_breed: "",
  pet_size: "small",
  pet_gender: "female",
  pet_age: "",
  aggressiveness: "low",
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
  const router = useRouter();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  // function warningNotification() {
  //   addNotification({
  //     title: "Warning",
  //     subtitle: "Sorry",
  //     message: "We are not providing Training in your city.",
  //     theme: "red",
  //     closeButton: "X",
  //   });
  // }

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
    const jwt = localStorage.getItem("jwt");
    // const jwt2 = Cookies.get("jwt");
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
        setTimeout(async () => {
          const stripe = await stripePromise;
          const checkoutSession = await axiosInstance.get(
            `/stripe/${response.data._id}`
          );

          const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
          });
        }, 2000);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 409
        ) {
          // warningNotification();
          alert("Sorry, we are not providing training in this city");
          // router.push("/Home");
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          alert("Please login to continue your booking!");
          router.push("/login");
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 400
        ) {
          alert("Please select Booking date and time!");
        } else {
          console.error(
            "Error posting booking data:",
            error.response.data.message
          );
        }
      }
    }

    postData();
  }
  return (
    <div>
      {/* <Notifications /> */}
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
            className=" text-white"
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}
          >
            {!isFirstStep && (
              <button
                type="button"
                className="text-gray-700 font-bold flex items-center bg-saddle-brown py-2 px-3 rounded-pill fs-6 no-underline"
                onClick={back}
              >
                Back
              </button>
            )}
            {isLastStep ? (
              <button
                type="submit"
                className="text-white flex items-center bg-dark-blue py-2 px-3 rounded-pill fs-6 no-underline"
              >
                Pay
              </button>
            ) : (
              <button
                type="submit"
                className="text-gray-700   flex items-center font-bold bg-saddle-brown py-2 px-3 rounded-pill fs-6 no-underline"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>

      {bookingSuccess && (
        <div className="flex justify-center items-center w-full h-full">
          <img
            src="http://localhost:3000/assets/bookingSuccess.gif"
            alt="Booking Confirmation"
          />
        </div>
      )}
    </div>
  );
}

export default BookTraining;
