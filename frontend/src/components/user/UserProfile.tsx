"use client";
import RatingModal from "@/components/rating/Rating";
import React, { useEffect, useState } from "react";
import RateStar from "../rating/RateStar";
import { UserCard, UserUpdateCard } from "./UserCard";
import { PetProfileCard } from "../pet/PetCard";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setActiveTab,
  setEditedUser,
  setIsEditing,
  setLoading,
  setPets,
  setRate,
  setService,
  setServiceId,
  setServiceImages,
  setTraining,
  setTrainingId,
  setTrainingImages,
  setUser,
} from "@/redux/user/userSlice";
import {
  getPetsData,
  getServiceData,
  getTrainingData,
  getUserData,
  serviceRating,
  trainingRating,
  userUpdate,
} from "@/redux/user/userService";

const imageUrls = [
  "http://localhost:3000/assets/service1.jpeg",
  "http://localhost:3000/assets/service2.jpeg",
  "http://localhost:3000/assets/service3.jpeg",
  "http://localhost:3000/assets/service4.jpeg",
];

const images = [
  "http://localhost:3000/assets/training1.jpeg",
  "http://localhost:3000/assets/training2.jpeg",
  "http://localhost:3000/assets/training3.jpeg",
  "http://localhost:3000/assets/training4.jpeg",
  "http://localhost:3000/assets/training5.jpeg",
];

function UserProfile() {
  const dispatch: AppDispatch = useDispatch();
  const {
    user,
    pets,
    service,
    training,
    rate,
    serviceId,
    trainingId,
    activeTab,
    loading,
    serviceImages,
    trainingImages,
    isEditing,
    editedUser,
  } = useSelector((state: RootState) => state.user);

  const handleTabClick = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await dispatch(getUserData());
        if (result.type === "getUserData/rejected") {
          throw result;
        } else {
          dispatch(setUser(result.payload));

          dispatch(setEditedUser(result.payload));

          dispatch(setLoading(false));

          const petResult = await dispatch(getPetsData(result.payload._id));
          if (petResult.type === "getPetsData/rejected") {
            throw petResult;
          } else {
            const { pets } = petResult.payload;
            dispatch(setPets(pets));
          }

          const serviceResult = await dispatch(
            getServiceData(result.payload._id)
          );
          if (serviceResult.type === "getServiceData/rejected") {
            throw serviceResult;
          } else {
            dispatch(setService(serviceResult.payload));
          }
          const trainingResult = await dispatch(
            getTrainingData(result.payload._id)
          );
          if (trainingResult.type === "getTrainingData/rejected") {
            throw trainingResult;
          } else {
            dispatch(setTraining(trainingResult.payload));
          }
        }
      } catch (error) {
        toast.error(error.payload);
      }
    };
    setLoading(true);
    getUser();
  }, []);

  const Rating = (value: number) => {
    dispatch(setRate(value));
  };
  const handleTrainingSubmit = async (trainingPlanId: string) => {
    try {
      const trainingRatingResult = await dispatch(
        trainingRating({ trainingPlanId, rating: rate })
      );
      if (trainingRatingResult.type === "trainingRating/rejected") {
        throw trainingRatingResult;
      } if(trainingRatingResult.type === "trainingRating/fulfilled"){
        const serviceResult =await dispatch(getTrainingData(user._id));
        dispatch(setTraining(serviceResult.payload));
     } else {
        return trainingRatingResult;
      }
    } catch (error) {
      toast.error("You have already rated this Training!");
    }
  };
  const handleServiceSubmit = async (servicePlanId: string) => {
    try {
      const ratingResult = await dispatch(
        serviceRating({ servicePlanId, rating: rate })
      );
      if (ratingResult.type === "serviceRating/rejected") {
        throw ratingResult;
      }
      if(ratingResult.type === "serviceRating/fulfilled"){
         const serviceResult =await dispatch(getServiceData(user._id));
         dispatch(setService(serviceResult.payload));
      } else {
        return ratingResult;
      }
    } catch (error) {
      toast.error("You have already rate this Service!");
    }
  };

  const handleEditClick = () => {
    dispatch(setIsEditing(true));
  };

  const handleCancelEdit = () => {
    dispatch(setIsEditing(false));
    dispatch(setEditedUser(user));
  };

  const handleSaveEdit = async () => {
    try {
      dispatch(setIsEditing(false));
      const updateResult = await dispatch(
        userUpdate({ userId: user._id, editedUser })
      );
      if (updateResult.type === "userUpdate/rejected") {
        throw updateResult;
      } else {
        return updateResult;
      }
    } catch (error) {
      toast.error(error.payload);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditedUser({ [name]: value }));
  };

  useEffect(() => {
    if (!service) return;
    const randomImages = Array.from({ length: service.length }, () => {
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      return imageUrls[randomIndex];
    });
    const randomImages2 = Array.from({ length: service.length }, () => {
      const randomIndex2 = Math.floor(Math.random() * images.length);
      return images[randomIndex2];
    });
    dispatch(setServiceImages(randomImages));
    dispatch(setTrainingImages(randomImages2));
  }, [service]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div>
            {isEditing ? (
              <>
                <UserUpdateCard
                  editedUser={editedUser}
                  handleChange={handleChange}
                />
                <div className="flex mt-8 mx-6 ">
                  <button
                    className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-3"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-1/4">
                  <UserCard user={user} />
                </div>
                <div className="flex mt-12 mx-6">
                  {/* <button
                    onClick={handleEditClick}
                    className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
                  >
                    Edit Profile
                  </button> */}
                  <Link
                    href={"/pet"}
                    className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-6"
                  >
                    Add Pet
                  </Link>
                  <Link
                    href={"/servicePlan"}
                    className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-2"
                  >
                    Book Service
                  </Link>
                  <Link
                    href={"/trainingPlan"}
                    className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-4"
                  >
                    Book Training
                  </Link>
                </div>
              </>
            )}
          </div>
        );
      case "Pet":
        return (
          <div>
            <div className="container-fluid mt-3">
              <div className="row">
                {pets?.length > 0 ? (
                  pets?.map((pet, index) => (
                    <div className="col-md-4 mb-6 flex" key={pet._id}>
                      <PetProfileCard key={index} pet={pet} />
                    </div>
                  ))
                ) : (
                  <p>No pets found.</p>
                )}
              </div>
            </div>

            <a
              href="/pet"
              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
              style={{ width: "94px" }}
            >
              Add Pet
            </a>
          </div>
        );
      case "Services":
        return (
          <div>
            <div className="container-fluid mt-3">
              <div className="row">
                {service?.length > 0 ? (
                  service?.map((ser, index) => (
                    <div
                      style={{
                        height: "680px",
                        width: "400px",
                      }}
                      className="col-md-5 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                      key={index}
                    >
                      <div>
                        <img
                          src={serviceImages[index]}
                          alt={`Service ${index}`}
                          className="w-full h-48 mb-4 border-2"
                          style={{width: "350px"}}
                        />
                        <div>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2 "
                            >
                              Name:
                            </label>
                            {ser.user_name}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2 "
                            >
                              Pet Species:
                            </label>
                            {ser.pet_species}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2 "
                            >
                              Pet Gender:
                            </label>
                            {ser.pet_gender}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Booking Date:
                            </label>
                            {ser.booking_date}
                          </p>
                          <p>
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Booking Time:
                            </label>
                            {ser.booking_time}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Payment Status:
                            </label>
                            {ser.isConfirmed ? `Done` : `Pending`}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Booking Status:
                            </label>
                            {ser.isCompleted
                              ? `Completed`
                              : `Not Completed Yet`}
                          </p>
                        </div>
                        <div>
                          <RateStar averageRating={ser.averageRating} />
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                            onClick={() => dispatch(setServiceId(ser._id))}
                            className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline justify-end  ml-auto"
                            style={{ width: "68px" }}
                          >
                            Rate
                          </button>
                          <RatingModal
                            handleRating={Rating}
                            handleSubmit={handleServiceSubmit}
                            id={serviceId}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                  style={{ height: "55vh" }}
                  className="flex flex-col items-center justify-center"
                >
                  <img
                    src="http://localhost:3000/assets/NoTraining.jpg"
                    className="w-1/3 items-center"
                    alt=""
                  />
                  <p
                    style={{ fontSize: "18px" }}
                    className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl"
                  >
                    You have no Service booked yet!
                  </p>
                </div>
                )}
              </div>
            </div>
            <a
              href="/servicePlan"
              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mt-8 mx-6"
              style={{ width: "133px" }}
            >
              Book Service
            </a>
          </div>
        );
      case "Trainings":
        return (
          <div>
            <div className="container-fluid mt-3">
              <div className="row">
                {training?.length > 0 ? (
                  training?.map((training, index) => (
                    <div
                      style={{
                        height: "680px",
                        width: "400px",
                      }}
                      className="col-md-5 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                      key={index}
                    >
                      <div>
                        <img
                          src={trainingImages[index]}
                          alt={`training ${index}`}
                          className="w-full h-48 mb-4 border-2"
                          style={{width: "350px"}}
                        />
                        <div>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue  mx-2 "
                            >
                              Name:
                            </label>
                            {training.user_name}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Pet Species:
                            </label>
                            {training.pet_species}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Pet Gender:
                            </label>
                            {training.pet_gender}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Booking Date:
                            </label>
                            {training.booking_date}
                          </p>
                          <p>
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Booking Time:
                            </label>
                            {training.booking_time}
                          </p>
                          <p>
                            {" "}
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2  "
                            >
                              Payment Status:
                            </label>
                            {training.isConfirmed ? `Done` : `Pending`}
                          </p>
                          <p>
                            <label
                              htmlFor="species"
                              className="font-bold text-dark-blue mx-2 "
                            >
                              Booking Status:
                            </label>
                            {training.isCompleted
                              ? `Completed`
                              : `Not Completed Yet`}
                          </p>
                        </div>
                        <div>
                          <RateStar averageRating={training.averageRating} />
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                            onClick={() =>
                              dispatch(setTrainingId(training._id))
                            }
                            className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
                          >
                            Rate
                          </button>
                          <RatingModal
                            handleRating={Rating}
                            handleSubmit={handleTrainingSubmit}
                            id={trainingId}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>You Have no training booked yet!</p>
                )}
              </div>
            </div>
            <a
              href="/trainingPlan"
              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mt-8 mx-6"
              style={{ width: "140px" }}
            >
              Book Training
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <img
          style={{ width: "150px", height: "150px" }}
          className=" rounded-pill my-40 "
          src="http://localhost:3000/assets/profile.gif"
          alt="Loading..."
        />
      </div>
    );
  }
  return (
    <div>
      <div className="p-9">
        <div className="text-sm font-medium text-center text-gray-500 ">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Profile")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "Profile"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " text-dark-blue hover:text-saddle-brown border-transparent"
                }`}
              >
                Profile
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Pet")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "Pet"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : "border-transparent text-dark-blue hover:text-saddle-brown "
                }`}
              >
                Pet
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Services")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "Services"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : "border-transparent text-dark-blue hover:text-saddle-brown "
                }`}
              >
                Services
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => handleTabClick("Trainings")}
                style={{ fontSize: "18px" }}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === "Trainings"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Trainings
              </button>
            </li>
          </ul>
        </div>
        <div className=" p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default UserProfile;
