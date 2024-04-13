"use client";
import RatingModal from "@/components/rating/Rating";
import axiosInstance from "@/utils/axios";
import axios from "axios";
import React, { useEffect } from "react";
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
  setLoading,
  setUser,
} from "@/redux/user/userSlice";
import { imageUrls, images } from "./UserProfile";

export function UserProfile() {
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

  // const [user, setUser] = useState<User>();
  // const [pets, setPets] = useState<Pet[]>([]);
  // const [service, setService] = useState<Service[]>([]);
  // const [training, setTraining] = useState<Training[]>([]);
  // const [rate, setRate] = useState<number>();
  // const [serviceId, setServiceId] = useState<string>();
  // const [trainingId, setTrainingId] = useState<string>();
  // // const [averageServiceRating, setAverageServiceRating] = useState(0);
  // // const [averageTrainingRating, setAverageTrainingRating] = useState(0);
  // const [activeTab, setActiveTab] = useState<string>("Profile");
  // const [loading, setLoading] = useState<boolean>(true);
  // const [serviceImages, setServiceImages] = useState<string[]>([]);
  // const [trainingImages, setTrainingImages] = useState<string[]>([]);
  // const [isEditing, setIsEditing] = useState(false);
  // const [editedUser, setEditedUser] = useState(null);
  const handleTabClick = (tab: string) => {
    // setActiveTab(tab);
    dispatch(setActiveTab(tab));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        // const response = await axiosInstance.get("/currentUser");
        const result = await dispatch(user());
        // setUser(response.data);
        dispatch(setUser(result.payload));
        // setEditedUser(response.data);
        dispatch(setEditedUser(result.payload));
        // setLoading(false);
        dispatch(setLoading(false));

        const petResponse = await axios.get(
          `${process.env.HOST}/user/${response.data._id}`
        );
        const { pets } = petResponse.data;
        setPets(pets);

        const serviceBooking = await axios.get(
          `${process.env.HOST}/serviceBooking/user/${response.data._id}`
        );
        // setAverageServiceRating(serviceBooking.data[0].averageRating);
        setService(serviceBooking.data);

        const trainingBooking = await axios.get(
          `${process.env.HOST}/trainingBooking/user/${response.data._id}`
        );
        // setAverageServiceRating(trainingBooking.data[0].averageRating);
        setTraining(trainingBooking.data);
      } catch (error) {
        console.error(error);
      }
    };
    setLoading(true);
    getUser();
  }, []);

  const Rating = (value: number) => {
    setRate(value);
  };
  const handleServiceSubmit = async (servicePlanId: string) => {
    try {
      const data = { rating: rate };
      const rating = await axiosInstance.post(
        `serviceBooking/${servicePlanId}/rate`,
        data
      );
      // setService(rating.data);
      // console.log(rating.data);
      // setAverageServiceRating(rating.data.averageRating);
      // window.location.reload();
      // setActiveTab("Services");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        toast.error("you have already rated this service!");
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        toast.error("Booking not found!");
      } else {
        toast.error("Error occurred! Please try again later.");
        // console.error("Error posting booking data:", error);
      }
    }
  };

  const handleTrainingSubmit = async (trainingId: string) => {
    try {
      const data = { rating: rate };
      const rating = await axiosInstance.post(
        `trainingBooking/${trainingId}/rate`,
        data
      );

      // setAverageTrainingRating(rating.data.averageRating);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 409
      ) {
        toast.error("you have already rated this service!");
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        toast.error("Booking not found!");
      } else {
        toast.error("Error occurred! Please try again later.");
        // console.error("Error posting booking data:", error);
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleSaveEdit = async () => {
    setIsEditing(false);
    const response = await axiosInstance.patch(
      `user/update/${user._id}`,
      editedUser
    );
    setUser(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    const randomImages = Array.from({ length: service.length }, () => {
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      return imageUrls[randomIndex];
    });
    const randomImages2 = Array.from({ length: service.length }, () => {
      const randomIndex2 = Math.floor(Math.random() * images.length);
      return images[randomIndex2];
    });
    setServiceImages(randomImages);
    setTrainingImages(randomImages2);
  }, [service]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div>
            {isEditing ? (
              <>
                {/* Name:
                                <input
                                  type="text"
                                  name="name"
                                  value={editedUser.name}
                                  onChange={handleChange}
                                /> */}
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
                <UserCard user={user} />
                <div className="flex mt-12 mx-6">
                  <button
                    onClick={handleEditClick}
                    className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
                  >
                    Edit Profile
                  </button>
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
                          src={serviceImages[index]} // Use random image for each service
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
                        <div>
                          <RateStar averageRating={ser.averageRating} />
                          {/* <RateStar averageRating={averageServiceRating} /> */}
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                            onClick={() => setServiceId(ser._id)}
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
                  <p>You Have no service booked yet!</p>
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
                      src={trainingImages[index]} // Use random image for each service
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
                    <div>
                      <RateStar averageRating={training.averageRating} />
                      {/* <RateStar averageRating={averageServiceRating} /> */}
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        onClick={() => setTrainingId(training._id)}
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
