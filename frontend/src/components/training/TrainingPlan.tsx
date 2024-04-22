"use client";
import { TrainingPlanData } from "@/interfaces/trainingPlan";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function TrainingPlan() {
  const router = useRouter();
  const handleBookTraining = (trainingPlanId: string) => {
    toast("Loading...", {
      style: {
        borderRadius: "10px",
        background: "#FBA834",
        color: "#242d62",
      },
      duration: 2000,
    });
    const bookingPageUrl = `/trainingPlan/bookTraining?trainingPlanId=${trainingPlanId}`;
   router.push(bookingPageUrl);
  };
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlanData[]>([]);
  const [loading , setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTrainingPlans() {
      try {
        setLoading(true);
        const response = await axios.get<TrainingPlanData[]>(
          `${process.env.HOST}/training-plan`
        );
        setTrainingPlans(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Training plans:", error);
      }
    }
    fetchTrainingPlans();
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
      <div>
        <section className="relative">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img
            src="http://localhost:3000/assets/petTraining.jpg"
            alt=""
            className="w-full"
            style={{ zIndex: -1 }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
            <h1
              className=" mb-4"
              style={{ fontFamily: "open-sans", fontSize: "40px" }}
            >
              Dog Training Service at Home
            </h1>
            <div
              className="text-lg mb-8"
              style={{ fontFamily: "open-sans", fontSize: "20px" }}
            >
              Dog-friendly, one-on-one dog training
            </div>
            
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
                type="button"
                className="px-4 py-2 bg-saddle-brown text-dark-blue rounded cursor-pointer"
              >
                Book a Session
              </button>
           
          </div>
        </section>
  
        <section className=" mt-5 p-10 ">
          <div className="text-center">
            <h1
              className=" mb-2 font-bold"
              style={{ fontFamily: "open-sans", fontSize: "40px" }}
            >
              Pet Training - Why it is so important?
            </h1>
            <h5 className="mb-5" style={{ fontFamily: "open-sans" }}>
              Pet Training is an investment that pays off by making life with
              your pet easier and more enjoyable.
            </h5>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <img
                src="http://localhost:3000/assets/training1.jpg"
                className="w-48 h-48 object-cover rounded-full"
                alt=""
              />
              <div className="mt-4 text-center">
                <h4
                  className="text-xl font-semibold"
                  style={{ fontFamily: "open-sans", fontSize: "25px" }}
                >
                  Management Techniques
                </h4>
                <p
                  className="mt-2"
                  style={{ fontFamily: "open-sans", fontSize: "18px" }}
                >
                  We give you the tools to set your family to be successful.
                </p>
              </div>
            </div>
  
            <div className="flex flex-col items-center">
              <img
                src="http://localhost:3000/assets/training2.jpg"
                className="w-48 h-48 object-cover rounded-full"
                alt=""
              />
              <div className="mt-4 text-center">
                <h4
                  className="text-xl font-semibold"
                  style={{ fontFamily: "open-sans", fontSize: "25px" }}
                >
                  Strengthen Bond
                </h4>
                <p
                  className="mt-2"
                  style={{ fontFamily: "open-sans", fontSize: "18px" }}
                >
                  We help you bridge the gap between you and your dog.
                </p>
              </div>
            </div>
  
            <div className="flex flex-col items-center">
              <img
                src="http://localhost:3000/assets/training3.jpg"
                className="w-48 h-48 object-cover rounded-full"
                alt=""
              />
              <div className="mt-4 text-center">
                <h4
                  className="text-xl font-semibold"
                  style={{ fontFamily: "open-sans", fontSize: "25px" }}
                >
                  Socialization
                </h4>
                <p
                  className="mt-2"
                  style={{ fontFamily: "open-sans", fontSize: "18px" }}
                >
                  Training increases your dog's confidence to explore the
                  surroundings.
                </p>
              </div>
            </div>
  
            <div className="flex flex-col items-center">
              <img
                src="http://localhost:3000/assets/training4.jpg"
                className="w-48 h-48 object-cover rounded-full"
                alt=""
              />
              <div className="mt-4 text-center">
                <h4
                  className="text-xl font-semibold"
                  style={{ fontFamily: "open-sans", fontSize: "25px" }}
                >
                  Mental Stimulation
                </h4>
                <p
                  className="mt-2"
                  style={{ fontFamily: "open-sans", fontSize: "18px" }}
                >
                  Engaging your dog's mind is as important as physical exercise.
                </p>
              </div>
            </div>
          </div>
        </section>
  
        <div className="bg-white mt-5 mb-5">
          <h1
            className="text-center text-dark-blue font-semibold text-2xl pt-4 mb-12"
            style={{ fontFamily: "open-sans", fontSize: "35px" }}
          >
            Training Plans for your pet
          </h1>
              
          <div className="flex flex-wrap justify-center gap-16">
            {trainingPlans.map((plan, index) => (
              <div
                key={index}
                className="w-full p-4 max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow-2xl card-container"
              >
                <h2 className="text-center font-semibold text-dark-blue mb-4" style={{  fontSize: "28px" }}>
                  {plan.TrainingName}
                </h2>
                <div className="border-2 border-gray-200 mb-4"></div>
                <div className="px-2 pb-3">
                  <ul className="list-disc list-inside">
                    {plan.Training.map((training, index) => (
                      <div key={index} className="flex gap-4">
                        <img
                          src="http://localhost:3000/assets/bullet.webp"
                          className="w-5 h-5"
                          alt="bullet"
                        />
                        <li className="font-medium text-dark-blue">
                          {training}
                        </li>
                      </div>
                    ))}
                  </ul>
                  <div className="flex items-center mt-5 mb-5">
                    {/* Rating stars */}
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[...Array(Math.round(plan.average_rating || 0))].map(
                        (_, index) => (
                          <svg
                            key={index}
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        )
                      )}
                      {/* Empty stars */}
                      {[...Array(5 - Math.round(plan.average_rating || 0))].map(
                        (_, index) => (
                          <svg
                            key={index}
                            className="w-4 h-4 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        )
                      )}
                    </div>
                    {/* Average rating */}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      {plan.average_rating || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl mt-4 font-bold text-gray-900 dark:text-red">
                    ₹{plan.price}
                    </span>
                    <button
                      onClick={() => handleBookTraining(plan._id)}
                      className="text-gray-700 no-underline flex justify-center bg-saddle-brown hover:bg-dark-orange hover:text-white py-2 px-3 mt-4 font-semibold rounded-lg fs-6 transition duration-300 ease-in-out"
                    >
                      Book Training
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )}
  </div>
    );
  }
  
  export default TrainingPlan;
  
 