"use client";
import { TrainingPlanData } from "@/interfaces/trainingPlan";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import axiosInstance from "@/utils/axios";
import RateStar from "../rating/RateStar";

function TrainingPlan() {
  const router = useRouter();
  const handleBookTraining = useCallback(
    async (trainingPlanId: string) => {
      setLoading(true);
      const bookingPageUrl = `/trainingPlan/bookTraining?trainingPlanId=${trainingPlanId}`;
      router.push(bookingPageUrl);
      setLoading(false);
    },
    [router]
  );

  const [trainingPlans, setTrainingPlans] = useState<TrainingPlanData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTrainingPlans() {
      try {
        setLoading(true);
        const response = await axiosInstance.get<TrainingPlanData[]>(
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
          <div>
            <section className="relative">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <img
                src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379484/petTraining_y2lpdy.jpg"
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
                    toast("Select Plan first!", {
                      style: {
                        borderRadius: "10px",
                        background: "#FBA834",
                        color: "#242d62",
                      },
                    });
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
                  Pet Training is an investment that pays off by making life
                  with your pet easier and more enjoyable.
                </h5>
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col items-center">
                  <img
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379502/training1_k6vivw.jpg"
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
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379502/training2_pnfcyw.jpg"
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
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379517/training3_qsppvy.jpg"
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
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379705/training4_tbekv4.jpg"
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
                      Engaging your dog's mind is as important as physical
                      exercise.
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
                    <h2
                      className="text-center font-semibold text-dark-blue mb-4"
                      style={{ fontSize: "28px" }}
                    >
                      {plan.TrainingName}
                    </h2>
                    <div className="border-2 border-gray-200 mb-4"></div>
                    <div className="px-2 pb-3">
                      <ul className="list-disc list-inside">
                        {plan.Training.map((training, index) => (
                          <div key={index} className="flex gap-4">
                            <img
                              src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379449/bullet_msybn6.webp"
                              className="w-5 h-5"
                              alt="bullet"
                            />
                            <li className="font-medium text-dark-blue">
                              {training}
                            </li>
                          </div>
                        ))}
                      </ul>
                      <RateStar averageRating={plan.average_rating} />
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

export default redirectLoggedIn(TrainingPlan);
