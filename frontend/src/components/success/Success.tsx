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
    <div>
      <img
        src="http://localhost:3000/assets/Animation-1712560065931.gif"
        alt=""
      />
      <p>Booking Confirmed</p>
      <button onClick={() => handleClick(id)}>OK</button>
    </div>
  );
}

export default Success;
