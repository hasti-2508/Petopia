"use client";
import axiosInstance from "@/utils/axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Success() {
  const searchResult = useSearchParams();
  const id = searchResult.get("id");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClick = async (id) => {
    try {
      setLoading(true);
      const bookingConfirmation = await axiosInstance.patch(
        `/stripe/${id}/confirmation`,
        { isConfirmed: true }
      );
      setLoading(false);
      router.push("/home");
    } catch (error) {
      toast.error("Error in you booking confirmation update");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <img
          src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379448/Animation-1712560065931_bfvyng.gif"
          alt=""
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold mt-6 mb-4 text-center text-dark-blue">
          Booking confirmed!
        </h1>
        <p className="text-sm mb-4 text-center text-dark-blue">
          You have successfully booked your service or training with Petopia.
        </p>
        <p className="text-sm mb-4 text-center text-dark-blue">
          Booking confirmation mail has been sent to your registered email.
        </p>
        <p className="text-sm mb-4 text-center font-bold text-red-500">
          Please, don't forget to rate our service.
        </p>
        <button
          onClick={() => handleClick(id)}
          className="block w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600"
        >
          {loading ? "Loading..." : "OK"}
        </button>
      </div>
    </div>
  );
}

export default Success;
