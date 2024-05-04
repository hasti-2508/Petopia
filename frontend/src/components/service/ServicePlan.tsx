"use client";
import { ServicePlanType } from "@/interfaces/serviceplan";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import PlanCard from "../booking/PlanCard";
import toast from "react-hot-toast";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import axiosInstance from "@/utils/axios";
import { Car, Home, Mark, Schedule } from "./Icon";

function ServicePlan() {
  const router = useRouter();
  // const handleBookService = (servicePlanId: string) => {
  //   setLoading(true);
  //   const bookingPageUrl = `/servicePlan/bookService?servicePlanId=${servicePlanId}`;
  //   router.push(bookingPageUrl);
  //   setLoading(false);
  // };
  const [servicePlans, setServicePlans] = useState<ServicePlanType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchServicePlans() {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ServicePlanType[]>(
          `${process.env.HOST}/service-plan`
        );
        setServicePlans(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service plans:", error);
      }
    }

    fetchServicePlans();
  }, []);

  const handleBookService = useCallback(
    async (servicePlanId: string) => {
      setLoading(true);
      const bookingPageUrl = `/servicePlan/bookService?servicePlanId=${servicePlanId}`;
      router.push(bookingPageUrl);
      setLoading(false);
    },
    [router]
  );
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center my-52">
          <img
            style={{ width: "250px", height: "250px" }}
            src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379445/AdoptLoading_esfppq.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <div className="fade-in-up">
          <div className="position-relative ">
            <img
              src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379477/petGrooming_lkvpfx.jpg"
              alt="Background"
              className="inset-0 w-full h-full object-cover"
            />
            <div className=" bg-white position-absolute  custom-box border-gray-300 border-2 p-4 ml-8 rounded-xl shadow-md w-4/5 flex-col items-center">
              <h1
                className="text-center text-dark-blue font-bold text-2xl pt-4"
                style={{ fontFamily: "open-sans", fontSize: "40px" }}
              >
                Pet Grooming service that comes to your home
              </h1>
              <p
                className="text-center text-dark-blue  text-xl mt-3"
                style={{ fontFamily: "open-sans", fontSize: "20px" }}
              >
                Instantly Book a Professional Pet Groomer Online, Whenever you
                need one.
              </p>
              <button
                onClick={() => {
                  toast("Select Plan first!", {
                    style: {
                      borderRadius: "10px",
                      background: "#FBA834",
                      color: "#242d62",
                    },
                  });
                }}
                className="text-gray-700 flex justify-center bg-saddle-brown py-2 px-3 mt-4 font-semibold rounded-lg fs-6"
                style={{ margin: "auto" }}
              >
                Book A Professional Groomer
              </button>
            </div>
          </div>

          <section id="section" className="pt-40">
            <div className="p-4">
              <h1
                className="text-center text-dark-blue font-semibold text-2xl pt-4 mb-12"
                style={{ fontFamily: "open-sans", fontSize: "35px" }}
              >
                How Pet Grooming works at your home?
              </h1>
              <div
                className="flex gap-5 mt-8 mb-4"
                style={{ width: "117.5rem", marginLeft: "250px" }}
              >
                <img
                  src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379459/grooming_aa53wd.jpg"
                  className="w-1/4  rounded-2xl  shadow-2xl"
                />
                <div>
                  <div>
                    <div className=" flex gap-9 card-container p-4 hover:bg-saddle-brown">
                      <div className="mt-2">
                        <Schedule />
                      </div>
                      <div className="leading-6">
                        <label
                          className="font-bold  text-gray-600"
                          style={{ fontFamily: "open-sans", fontSize: "25px" }}
                        >
                          Schedule and book—all online
                        </label>
                        <div
                          style={{ fontFamily: "open-sans", fontSize: "18px" }}
                        >
                          All you have to do is pick a day and time
                        </div>
                      </div>
                    </div>
                    <div className=" mt-3 card-container p-4 flex gap-9 hover:bg-saddle-brown">
                      <div className="mt-2">
                        <Car />
                      </div>
                      <div className="leading-6">
                        <label
                          className="font-bold  text-gray-600"
                          style={{ fontFamily: "open-sans", fontSize: "25px" }}
                        >
                          Pet Groomer brings the equipment
                        </label>
                        <div
                          style={{ fontFamily: "open-sans", fontSize: "18px" }}
                        >
                          Professional pet groomer comes to your doorstep
                        </div>
                      </div>
                    </div>
                    <div className=" mt-3 card-container p-4 flex gap-9 hover:bg-saddle-brown">
                      <div className="mt-2">
                        <Home />
                      </div>
                      <div className="leading-6">
                        <label
                          className="font-bold  text-gray-600"
                          style={{ fontFamily: "open-sans", fontSize: "25px" }}
                        >
                          No travel stress for your pets
                        </label>
                        <div
                          style={{ fontFamily: "open-sans", fontSize: "18px" }}
                        >
                          Grooming service happens in your home
                        </div>
                      </div>
                    </div>
                    <div className=" mt-3 card-container p-4 flex gap-9 hover:bg-saddle-brown">
                      <div className="mt-2">
                        <Mark />
                      </div>
                      <div className="leading-6">
                        <label
                          className="font-bold  text-gray-600"
                          style={{ fontFamily: "open-sans", fontSize: "25px" }}
                        >
                          Groomer cleans up
                        </label>
                        <div
                          style={{ fontFamily: "open-sans", fontSize: "18px" }}
                        >
                          You're all set!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div>
            <div className="bg-white">
              <h1
                className="text-center text-dark-blue font-semibold text-2xl pt-4 mb-12"
                style={{ fontFamily: "open-sans", fontSize: "35px" }}
              >
                Dog Grooming packages
              </h1>

              <div className="flex flex-wrap justify-center gap-8 ">
                {servicePlans
                  .filter((plan) => plan.species === "dog")
                  .map((plan, index) => (
                    <PlanCard
                      key={index}
                      plan={plan}
                      handleBookService={handleBookService}
                    />
                  ))}
              </div>
            </div>

            <div className="bg-white mt-5 mb-5">
              <h1
                className="text-center text-dark-blue font-semibold text-2xl pt-4 mb-12"
                style={{ fontFamily: "open-sans", fontSize: "35px" }}
              >
                Cat Grooming packages
              </h1>
              <div className="flex flex-wrap justify-center gap-8 ">
                {servicePlans
                  .filter((plan) => plan.species === "cat")
                  .map((plan, index) => (
                    <PlanCard
                      key={index}
                      plan={plan}
                      handleBookService={handleBookService}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default redirectLoggedIn(ServicePlan);
