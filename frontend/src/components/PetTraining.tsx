"use client";
import { TrainingPlan } from "@/interfaces/traingPlan";
import axios from "axios";
import React, { useEffect, useState } from "react";

function PetTraining() {
  const handleBookTraining = (trainingPlanId: string) => {
    const bookingPageUrl = `/PetTraining/BookTraining?trainingPlanId=${trainingPlanId}`;
    window.location.href = bookingPageUrl;
  };
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);

  useEffect(() => {
    async function fetchTrainingPlans() {
      try {
        const response = await axios.get<TrainingPlan[]>(
          `${process.env.HOST}/training-plan`
        );
        setTrainingPlans(response.data);
      } catch (error) {
        console.error("Error fetching Training plans:", error);
      }
    }

    fetchTrainingPlans();
  }, []);
  return (
    <div>
      <div>
        <div className="bg-white">
          <h1 className="text-3xl font-semibold text-center py-4">
            Trainings for your pet
          </h1>
          <img
            className="p-8 flex justify-center"
            style={{ width: "350px", height: "260px" }}
            src={"http://localhost:3000/assets/petserviceGrooming.avif"}
            alt="product image"
          />
          <div className="flex flex-wrap justify-center">
            {trainingPlans.map((plan, index) => (
              <div
                key={index}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <h3 className="text-xl text-center">{plan.TrainingName}</h3>

                <div className="px-5 pb-5">
                  <ul className="list-disc list-inside">
                    {plan.Training.map((training, index) => (
                      <li key={index}>{training}</li>
                    ))}
                  </ul>
                  <div className="flex items-center mt-2.5 mb-5">
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
                    <span className="text-3xl font-bold text-gray-900 dark:text-red">
                      ${plan.price}
                    </span>
                    <a
                      onClick={() => handleBookTraining(plan._id)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Book Training
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PetTraining;
