"use client";
import { TrainingPlanBooking } from "@/interfaces/trainingPlanBooking";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import useMultipleStep from "@/Hooks/useMultipleStep";
import PetDataForm from "../booking/PetDataForm";
import UserDataForm from "../booking/UserDataForm";
import DateAndTime from "../booking/DateAndTime";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

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
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.classList.add("animate__animated", "animate__zoomIn");
    }
  }, []);
  const [data, setData] = useState(trainingBookingData);
  const [trainingPlanId, setTrainingPlanId] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const router = useRouter();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);

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
    if (!isLastStep) return next();
    async function postData() {
      try {
        const response = await axiosInstance.post(
          `/trainingBooking/${trainingPlanId}`,
          data
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
          toast.error("Sorry, we are not providing training in this city");
          setTimeout(() => {
            router.push("/home");
          }, 1000);
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          toast.error("Please login to continue your booking!");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 400
        ) {
          toast.error("Please select Booking date and time!");
        } else {
          toast.error("Error Occurred!");
        }
      }
    }

    postData();
  }
  return (
    <div>
      <div className="w-full max-w-xl mx-auto">
        <form ref={formRef} onSubmit={onSubmit}>
          {step}
          <div
            className=" text-white"
            style={{
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}
          >
            {!isFirstStep && (
              <button>
                <img src="http://localhost:3000/assets/left.svg" alt="" />
              </button>
            )}
            {isLastStep ? (
              <button
                type="submit"
                className="text-dark-blue flex items-center bg-saddle-brown px-6 rounded-full font-bold no-underline"
              >
                Pay
              </button>
            ) : (
              <button className="">
                <img src="http://localhost:3000/assets/right.svg" alt="" />
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
