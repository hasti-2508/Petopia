"use client";
import axiosInstance from "@/utils/axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

function Success() {
  const searchResult = useSearchParams();
  const id = searchResult.get("id");
  const router = useRouter();
  const handleClick = async (id) => {
    try {
      const bookingConfirmation = await axiosInstance.patch(
        `/stripe/${id}/confirmation`,
        { isConfirmed: true }
      );
      router.push("/home");
    } catch (error) {
      console.error(
        "error updating confirmation:",
        error.response.data.message
      );
    }
  };
  return (

<div className="flex justify-center items-center h-screen">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    <img
      src="http://localhost:3000/assets/Animation-1712560065931.gif"
      alt=""
      className="mx-auto"
    />
    <h1 className="text-3xl font-bold mt-6 mb-4 text-center">Booking confirmed!</h1>
    <p className="text-sm mb-4 text-center ">You have successfully booked your service or training with Petopia.</p>
    <p className="text-sm mb-4 text-center">Booking confirmation mail has been sent to your registered email.</p>
    <p className="text-sm mb-4 text-center font-bold">Please, don't forget to rate our service.</p>
    <button onClick={() => handleClick(id)} className="block w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-600">OK</button>
  </div>
</div>

  );
}

export default Success;
