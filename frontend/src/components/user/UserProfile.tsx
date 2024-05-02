"use client";
import RatingModal from "@/components/rating/Rating";
import React, { useCallback, useEffect, useMemo } from "react";
import RateStar from "../rating/RateStar";
import { UserCard } from "./UserCard";
import { PetProfileCard } from "../pet/PetCard";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setActiveTab,
  setLoading,
  setPets,
  setRate,
  setService,
  setServiceId,
  setServiceImages,
  setTraining,
  setTrainingId,
  setTrainingImages,
} from "@/redux/user/userSlice";
import {
  getPetsData,
  getServiceData,
  getTrainingData,
  getUserData,
  petAdoption,
  serviceRating,
  trainingRating,
} from "@/redux/user/userService";
import redirectLoggedIn from "@/hoc/redirectToLogin";
import { useRouter } from "next/navigation";

const imageUrls = [
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379492/service1_z2p9ks.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379493/service2_wmunls.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379495/service3_xcrwad.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379495/service4_yuurit.jpg",
];

const images = [
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379498/training1_keizgq.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379501/training2_cj6etc.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379502/training3_rqukle.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379703/training4_jgxepu.jpg",
  "https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379708/training5_pssugp.jpg",
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
  } = useSelector((state: RootState) => state.user);

  const handleTabClick = useCallback(
    (tab: string) => {
      dispatch(setActiveTab(tab));
    },
    [dispatch]
  );

  const router = useRouter();
  const getUserProfileData = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const result = await dispatch(getUserData());
      if (result.type === "getUserData/rejected") {
        throw result;
      } else {
        const { _id } = result.payload;

        const [petsResult, serviceResult, trainingResult] = await Promise.all([
          dispatch(getPetsData(_id)),
          dispatch(getServiceData(_id)),
          dispatch(getTrainingData(_id)),
        ]);

        if (
          petsResult.type === "getPetsData/fulfilled" &&
          serviceResult.type === "getServiceData/fulfilled" &&
          trainingResult.type === "getTrainingData/fulfilled"
        ) {
          const { pets } = petsResult.payload;
          dispatch(setPets(pets));
          dispatch(setService(serviceResult.payload));
          dispatch(setTraining(trainingResult.payload));
        }
      }
    } catch (error) {
      console.error("Error fetching user profile data:", error);
      router.push("/home");
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, router]);

  useEffect(() => {
    getUserProfileData();
  }, [getUserProfileData]);

  const Rating = useCallback(
    (value: number) => {
      dispatch(setRate(value));
    },
    [dispatch]
  );

  const handleTrainingSubmit = useCallback(
    async (trainingPlanId: string) => {
      try {
        const trainingRatingResult = await dispatch(
          trainingRating({ trainingPlanId, rating: rate })
        );
        if (trainingRatingResult.type === "trainingRating/rejected") {
          throw trainingRatingResult;
        }
        toast.success("Training rating submitted successfully!");
        getUserProfileData();
      } catch (error) {
        toast.error("You have already rated this Training!");
      }
    },
    [dispatch, rate, getUserProfileData]
  );

  const handleServiceSubmit = useCallback(
    async (servicePlanId: string) => {
      try {
        const ratingResult = await dispatch(
          serviceRating({ servicePlanId, rating: rate })
        );
        if (ratingResult.type === "serviceRating/rejected") {
          throw ratingResult;
        }
        toast.success("Service rating submitted successfully!");
        getUserProfileData();
      } catch (error) {
        toast.error("You have already rated this service!");
      }
    },
    [dispatch, rate, getUserProfileData]
  );

  const handleDelete = async (petId: string) => {
    try {
      const result = await dispatch(petAdoption(petId));
      if (result.type === "petAdoption/rejected") {
        throw result;
      } else {
        const petResult = await dispatch(getPetsData(user._id));
          if (petResult.type === "getPetsData/rejected") {
            throw petResult;
          } else {
            const { pets } = petResult.payload;
            dispatch(setPets(pets));
          }
      }
    } catch (error) {
      toast.error(error.payload);
    }
  };

  const randomServiceImages = useMemo(() => {
    return Array.from({ length: service.length }, () => {
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      return imageUrls[randomIndex];
    });
  }, [service, imageUrls]);
  
  const randomTrainingImages = useMemo(() => {
    return Array.from({ length: training.length }, () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    });
  }, [training, images]);
  
  useEffect(() => {
    dispatch(setServiceImages(randomServiceImages));
  }, [dispatch, randomServiceImages]);
  
  useEffect(() => {
    dispatch(setTrainingImages(randomTrainingImages));
  }, [dispatch, randomTrainingImages]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div>
            <div className="w-1/4 fade-in-up ">
              <UserCard user={user} />
            </div>
            <div className="flex gap-4 mt-12 mx-6">
              <Link
                href={"/pet"}
                className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
              >
                Add Pet
              </Link>
              <Link
                href={"/servicePlan"}
                className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline "
              >
                Book Service
              </Link>
              <Link
                href={"/trainingPlan"}
                className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline "
              >
                Book Training
              </Link>
            </div>
          </div>
        );
      case "Pet":
        return (
          <div>
            <div className="container-fluid mt-3">
              <div className="row">
                {pets?.length > 0 ? (
                  pets?.map((pet, index) => (
                    <div
                      className="fade-in-up col-md-4 mb-6 flex"
                      key={pet._id}
                    >
                      <PetProfileCard
                        key={index}
                        pet={pet}
                        handleDelete={() => handleDelete(pet._id)}
                      />
                    </div>
                  ))
                ) : (
                  <div
                    style={{ height: "57vh" }}
                    className="flex flex-col mb-3 items-center justify-center fade-in-up"
                  >
                    <img
                      src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379478/NoTraining_iunkho.jpg"
                      className="w-1/3 items-center"
                      alt=""
                    />
                    <p
                      style={{ fontSize: "18px" }}
                      className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl "
                    >
                      You have no pets!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Link
              href="/pet"
              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
              style={{ width: "94px" }}
            >
              Add Pet
            </Link>
          </div>
        );
      case "Services":
        return (
          <div>
            {/* <div className="container-fluid mt-3">
              <div className="row">
                {service?.length > 0 ? (
                  service?.map((ser, index) => (
                    <div
                      style={{
                        height: "670px",
                        width: "370px",
                      }}
                      className=" col-md-5 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                      key={index}
                    >
                      <div>
                        <img
                          src={serviceImages[index]}
                          alt={`Service ${index}`}
                          className="w-full h-48 mb-4 border-2"
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
                        {ser.isCompleted ? (
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
                        ) : (
                          <div>
                            <RateStar averageRating={ser.averageRating} />
                            <button
                              onClick={() =>
                                toast.error(
                                  "This booking is not completed yet!"
                                )
                              }
                              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline justify-end  ml-auto"
                              style={{ width: "68px" }}
                            >
                              Rate
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{ height: "55vh" }}
                    className="flex flex-col mb-3 items-center justify-center fade-in-up"
                  >
                    <img
                      src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379478/NoTraining_iunkho.jpg"
                      className="w-1/3 items-center"
                      alt=""
                    />
                    <p
                      style={{ fontSize: "18px" }}
                      className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl "
                    >
                      You have no Services booked Yet!
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Link
              href="/servicePlan"
              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mt-8 mx-6"
              style={{ width: "133px" }}
            >
              Book Service
            </Link> */}
            <div className="booking__card">
	<img src="https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="booking__card--image" alt="flight" />
	<div className="booking__info">
		<div className="booking__info--top">
			<h3 className="booking__title">plan Name</h3>
			<button className="btn btn--primary">View Details</button>
		</div>
		<div className="booking__info--middle">
			<p className="booking__price">$250.00</p>
			
		</div>
		<div className="booking__info--bottom">
			<button className="btn btn--secondary">Purchase</button>
			<button className="btn btn--alt">Close</button>
		</div>
	</div>
</div>
          </div>
        );
      case "Trainings":
        return (
          <div>
            <div className="container-fluid mt-3 ">
              <div className="row">
                {training?.length > 0 ? (
                  training?.map((training, index) => (
                    <div
                      style={{
                        height: "670px",
                        width: "370px",
                      }}
                      className="col-md-5 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                      key={index}
                    >
                      <div>
                        <img
                          src={trainingImages[index]}
                          alt={`training ${index}`}
                          className="w-full h-48 mb-4 border-2"
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
                        {training.isCompleted ? (
                          <div>
                            <RateStar averageRating={training.averageRating} />
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              onClick={() =>
                                dispatch(setTrainingId(training._id))
                              }
                              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline justify-end  ml-auto"
                              style={{ width: "68px" }}
                            >
                              Rate
                            </button>
                            <RatingModal
                              handleRating={Rating}
                              handleSubmit={handleTrainingSubmit}
                              id={trainingId}
                            />
                          </div>
                        ) : (
                          <div>
                            <RateStar averageRating={training.averageRating} />
                            <button
                              onClick={() =>
                                toast.error(
                                  "This training is not completed yet!"
                                )
                              }
                              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline justify-end  ml-auto"
                              style={{ width: "68px" }}
                            >
                              Rate
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{ height: "55vh" }}
                    className="flex flex-col mb-3 items-center justify-center fade-in-up"
                  >
                    <img
                      src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379478/NoTraining_iunkho.jpg"
                      className="w-1/3 items-center"
                      alt=""
                    />
                    <p
                      style={{ fontSize: "18px" }}
                      className="p-4 rounded-t-lg text-dark-blue font-bold font-2xl "
                    >
                      You have no trainings booked yet!
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Link
              href="/trainingPlan"
              className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mt-8 mx-6"
              style={{ width: "140px" }}
            >
              Book Training
            </Link>
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
          src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379485/profile_yxwpc3.gif"
          alt="Loading..."
        />
      </div>
    );
  }
  return (
    <div>
      <div className="p-9">
        <div className="text-sm font-medium text-center text-gray-500 ">
          <ul className="flex flex-wrap -mb-px fade-in-right">
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

export default redirectLoggedIn(UserProfile);
