"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import useMultipleStep from "@/hooks/useMultipleStep";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { ServicePlanBooking } from "@/interfaces/servicePlanBooking";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import PetDataForm from "../booking/PetDataForm";
import UserDataForm from "../booking/UserDataForm";
import DateAndTime from "../booking/DateAndTime";
import toast from "react-hot-toast";

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
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.classList.add("animate__animated", "animate__zoomIn");
    }
  }, []);
  const [data, setData] = useState(serviceBookingData);
  const [servicePlanId, setServicePlanId] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const router = useRouter();

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
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
  const isBookingDataFilled = data.booking_date && data.booking_time;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    async function postData() {
      try {
        if (!isBookingDataFilled) {
          toast.error("Please fill the booking date and time");
          return;
        }
        const response = await axiosInstance.post(
          `/serviceBooking/${servicePlanId}`,
          data
        );
        setBookingSuccess(true);
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
          toast.error("We are not providing service in this city");
          setTimeout(() => {
            router.push("/home");
          }, 1000);
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          toast.error("Please Login First!");
          router.push("/login");
        } else {
          console.error("Error posting booking data:", error);
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
                <img src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379465/left_ose3wz.svg" alt="" />
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
                <img src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379487/right_lxrjyk.svg" alt="" />
              </button>
            )}
          </div>
        </form>
      </div>

      {bookingSuccess && (
        <div className="flex justify-center items-center w-full h-full">
          <img
            src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379449/bookingSuccess_dqbasy.gif"
            alt="Booking Confirmation"
          />
        </div>
      )}
    </div>
  );
}

export default BookService;
