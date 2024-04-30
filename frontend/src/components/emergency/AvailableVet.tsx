"use client";
import { Vet } from "@/interfaces/vet";
import axiosInstance from "@/utils/axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { notifyVet } from "@/redux/vet/vetService";
import { AvailableVetCard } from "../vet/VetCard";
import toast from "react-hot-toast";
import redirectLoggedIn from "@/middleware/redirectToLogin";

function AvailableVet() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [vet, setVet] = useState<Vet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVet();
  }, []);

  const makeCall = useCallback(
    async (id: string) => {
      try {
        // toast("Loading...", {
        //   style: {
        //     borderRadius: "10px",
        //     background: "#FBA834",
        //     color: "#242d62",
        //   },
        //   duration: 1500,
        // });
        setLoading(true);
        dispatch(notifyVet(id));
        router.push(`/room?roomId=${id}`);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    },
    [router]
  );

  const getVet = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/vet/available");
      setVet(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching available vets:", error);
    }
  };

  return (
    <div className="container text-center col-md-7 mt-10">
      {loading ? (
        <div className="flex justify-center items-center w-full h-full my-52">
          <img
            style={{ width: "250px", height: "250px" }}
            src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379445/AdoptLoading_esfppq.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div>
          <h1
            className="font-bold mb-5 mt-6"
            style={{ fontFamily: "open-sans", fontSize: "35px" }}
          >
            Veterinarians Available for Call
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vet.map((v, index) => (
              <div className="flex flex-col" key={index}>
                <AvailableVetCard user={v} />
                <button
                  onClick={() => makeCall(v._id)}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline max-w-sm"
                >
                  Call
                </button>
              </div>
            ))}
            <p className="text-gray-600 italic mt-8">
              Please allow a moment for a veterinarian to join after you've
              entered.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default redirectLoggedIn(AvailableVet);
