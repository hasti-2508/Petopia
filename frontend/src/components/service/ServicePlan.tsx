"use client";
import { ServicePlanType } from "@/interfaces/serviceplan";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PlanCard from "../booking/PlanCard";
import toast from "react-hot-toast";
import redirectLoggedIn from "@/middleware/redirectToLogin";

function ServicePlan() {
  const router = useRouter();
  const handleBookService = (servicePlanId: string) => {
    toast("Loading...", {
      style: {
        borderRadius: "10px",
        background: "#FBA834",
        color: "#242d62",
      },
      duration: 2000,
    });
    const bookingPageUrl = `/servicePlan/bookService?servicePlanId=${servicePlanId}`;
    router.push(bookingPageUrl);
  };
  const [servicePlans, setServicePlans] = useState<ServicePlanType[]>([]);
  const [loading , setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchServicePlans() {
      try {
        setLoading(true);
        const response = await axios.get<ServicePlanType[]>(
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
  return (

    <div>
    {loading ? <div className="flex justify-center items-center my-52">
          <img
            style={{ width: "250px", height: "250px" }}
            src="http://localhost:3000/assets/AdoptLoading.gif"
            alt="Loading..."
          />
        </div> : (
      <div className="fade-in-up">
      <div className="position-relative ">
        <img
          src="http://localhost:3000/assets/petGrooming.jpg"
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
            Instantly Book a Professional Pet Groomer Online, Whenever you need
            one.
          </p>
          <button
          onClick={() => {
            toast("Select Plan first!",{
              style: {
                borderRadius: '10px',
                background: '#FBA834',
                color: '#242d62',
              },
            })
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
              src="http://localhost:3000/assets/grooming.jpg"
              className="w-1/4  rounded-2xl  shadow-2xl"
            />
            <div>
              <div>
                <div className=" flex gap-9 card-container p-4 hover:bg-saddle-brown">
                  <div className="mt-2">
                    <svg
                      width="32"
                      height="32"
                      fill="inherit"
                      viewBox="0 0 32 32"
                    >
                      <path d="M8 0a1 1 0 0 1 1 1v5H7V1a1 1 0 0 1 1-1zm16 0a1 1 0 0 1 1 1v5h-2V1a1 1 0 0 1 1-1zM2 12v17a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V12H2zm23-2v2h5V5a1 1 0 0 0-1-1h-2V2h2a3 3 0 0 1 3 3v24a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h2v2H3a1 1 0 0 0-1 1v5h23zm-4-8v2H11V2h10z"></path>
                    </svg>
                  </div>
                  <div className="leading-6">
                    <label
                      className="font-bold  text-gray-600"
                      style={{ fontFamily: "open-sans", fontSize: "25px" }}
                    >
                      Schedule and book—all online
                    </label>
                    <div style={{ fontFamily: "open-sans", fontSize: "18px" }}>
                      All you have to do is pick a day and time
                    </div>
                  </div>
                </div>
                <div className=" mt-3 card-container p-4 flex gap-9 hover:bg-saddle-brown">
                  <div className="mt-2">
                    <svg
                      width="32"
                      height="32"
                      fill="inherit"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fillRule="evenodd"
                        d="M24.555 2c.907 0 1.791.282 2.527.808a4.305 4.305 0 0 1 1.591 2.166l3.218 9.314c.073.21.109.43.109.647v12.512A3.56 3.56 0 0 1 28.444 31h-1.555a3.56 3.56 0 0 1-3.53-3.128H8.641A3.562 3.562 0 0 1 5.11 31H3.556A3.56 3.56 0 0 1 0 27.447v-12.51c0-.22.036-.439.108-.646l3.227-9.34a.997.997 0 0 1 .014-.044C3.939 3.243 5.513 2 7.444 2h17.111zm1.361 2.424a2.334 2.334 0 0 0-1.359-.435H7.444a2.34 2.34 0 0 0-2.208 1.58L2 14.935v12.512c0 .86.701 1.564 1.556 1.564H5.11c.855 0 1.557-.704 1.557-1.564v-.57c0-.55.448-.995 1-.995h16.666c.552 0 1 .445 1 .995v.57c0 .86.701 1.564 1.556 1.564h1.555c.855 0 1.556-.704 1.556-1.564V14.936l-3.234-9.36a2.315 2.315 0 0 0-.85-1.152zM7.218 7.018a1 1 0 0 1 .95-.683h15.664a1 1 0 0 1 .95.683l1.674 5.047a.99.99 0 0 1-.14.895c-.188.258-.49.412-.81.412H6.494c-.32 0-.622-.154-.81-.412a.99.99 0 0 1-.14-.895l1.674-5.047zm1.673 1.306l-1.014 3.058h16.246L23.11 8.324H8.89zM7.444 18.49a.342.342 0 0 0-.333.356v.012a.339.339 0 0 0 .209.318c.04.017.084.026.128.027a.343.343 0 0 0 .33-.357.342.342 0 0 0-.334-.356zm-2.333.351a2.336 2.336 0 0 1 2.333-2.34 2.336 2.336 0 0 1 2.334 2.345c0 1.3-1.045 2.346-2.334 2.346h-.007a2.354 2.354 0 0 1-1.655-.698 2.33 2.33 0 0 1-.671-1.653zm19.445-.35c-.17 0-.334.14-.334.356v.01a.341.341 0 0 0 .337.346.343.343 0 0 0 .33-.357.342.342 0 0 0-.333-.356zm-2.334.35a2.336 2.336 0 0 1 2.334-2.34 2.336 2.336 0 0 1 2.333 2.345c0 1.3-1.045 2.346-2.333 2.346h-.007a2.352 2.352 0 0 1-1.655-.697 2.327 2.327 0 0 1-.672-1.654z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="leading-6">
                    <label
                      className="font-bold  text-gray-600"
                      style={{ fontFamily: "open-sans", fontSize: "25px" }}
                    >
                      Pet Groomer brings the equipment
                    </label>
                    <div style={{ fontFamily: "open-sans", fontSize: "18px" }}>
                      Professional pet groomer comes to your doorstep
                    </div>
                  </div>
                </div>
                <div className=" mt-3 card-container p-4 flex gap-9 hover:bg-saddle-brown">
                  <div className="mt-2">
                    <svg
                      width="32"
                      height="32"
                      fill="inherit"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 30v-5c0-3.552 2.448-6 6-6s6 2.448 6 6v5h6V13.568l-12-11.2-12 11.2V30h6zm2 2H2V15.435l-.318.296A1 1 0 0 1 .318 14.27L14.977.587a1.5 1.5 0 0 1 2.046 0l14.66 13.682a1 1 0 1 1-1.365 1.462L30 15.435V32H20v-7c0-2.448-1.552-4-4-4s-4 1.552-4 4v7z"></path>
                    </svg>
                  </div>
                  <div className="leading-6">
                    <label
                      className="font-bold  text-gray-600"
                      style={{ fontFamily: "open-sans", fontSize: "25px" }}
                    >
                      No travel stress for your pets
                    </label>
                    <div style={{ fontFamily: "open-sans", fontSize: "18px" }}>
                      Grooming service happens in your home
                    </div>
                  </div>
                </div>
                <div className=" mt-3 card-container p-4 flex gap-9 hover:bg-saddle-brown">
                  <div className="mt-2">
                    <svg
                      width="32"
                      height="32"
                      fill="inherit"
                      viewBox="0 0 32 32"
                    >
                      <path d="M26.191 4.412a1 1 0 1 1 1.618 1.176l-16 22a1 1 0 0 1-1.516.12l-6-6a1 1 0 1 1 1.414-1.415l5.173 5.172L26.19 4.412z"></path>
                    </svg>
                  </div>
                  <div className="leading-6">
                    <label
                      className="font-bold  text-gray-600"
                      style={{ fontFamily: "open-sans", fontSize: "25px" }}
                    >
                      Groomer cleans up
                    </label>
                    <div style={{ fontFamily: "open-sans", fontSize: "18px" }}>
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
