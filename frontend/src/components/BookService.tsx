"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useMultipleStep from "@/Hooks/useMultipleStep";
import PetDataForm from "./PetDataForm";
import UserDataForm from "./UserDataForm";
import DateAndTime from "./DateAndTime";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { ServicePlanBooking } from "@/interfaces/servicePlanBooking";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { buttonBaseClasses } from "@mui/material";

const serviceBookingData: ServicePlanBooking = {
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

function BookService() {
  const [data, setData] = useState(serviceBookingData);
  const [servicePlanId, setServicePlanId] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const router = useRouter();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

  function warningNotification() {
    addNotification({
      title: "Warning",
      subtitle: "Sorry",
      message: "We are not providing Training in your city.",
      theme: "red",
      closeButton: "X",
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("servicePlanId");
      setServicePlanId(id);
    }
  }, []);

  function updateFields(fields: Partial<ServicePlanBooking>) {
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

    if (!isLastStep) return next();
    async function postData() {
      try {
        // const response = await axios.post(
        //   `${process.env.HOST}/serviceBooking/${servicePlanId}`,
        //   requestData
        // );
        const response = await axiosInstance.post(
          `/serviceBooking/${servicePlanId}`,
          data
        );
        // console.log(response.data.booking._id);
        setBookingSuccess(true);
        // setTimeout(() => {
        //   router.push(`/payment?bookingId=${response.data.booking._id}`);
        // }, 5000);
        setTimeout(async () => {
          const stripe = await stripePromise;
          const checkoutSession = await axiosInstance.get(
            `/stripe/${response.data.booking._id}`
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
          warningNotification();
          router.push("/Home");
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          router.push("/Login");
        } else {
          console.error("Error posting booking data:", error);
        }
      }
    }

    postData();
  }
  return (
    <div>
      <Notifications />
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
            {/* <button type="submit">{isLastStep ? "Pay" : "Next"}</button> */}

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

export default BookService;
