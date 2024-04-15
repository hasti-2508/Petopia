"use client";
import { Trainer } from "@/interfaces/trainer";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setSelectTrainings, setTrainerDataForm, setTrainerImageFile, setTrainerPasswordError, setTrainerShowPassword, setTrainerTrainingError } from "@/redux/trainer/trainerSlice";
import { useRouter } from "next/navigation";
import { trainerRegister } from "@/redux/trainer/trainerService";
import toast from "react-hot-toast";

// const TrainerData: Trainer = {
//   name: "",
//   email: "",
//   password: "",
//   phoneNo: "",
//   address: "",
//   city: "",
//   state: "",
//   YearsOfExperience: 0,
//   NumberOfPetsTrained: 0,
//   trainings: [],
//   _id: "",
//   imageUrl: "",
//   OnGoingTraining: [],
//   bookings: []
// };

const servicesList = [
  "Behavioral training",
  "Obedience training",
  "Protection training",
  "Relationship training",
  "Crate training",
  "Therapy training",
];

function TrainerRegister() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { trainerDataForm, selectTrainings,trainerImageFile, trainerShowPassword, trainerTrainingError, trainerPasswordError } = useSelector(
    (state: RootState) => state.trainer
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectTrainings.length === 0) {
        toast.error("Please select at least one Training")
      return;
    }
    const reqData = {
        ...trainerDataForm,
        trainings: selectTrainings,
      };
  
    try {
      const trainerResult = await dispatch(trainerRegister(reqData));
      if(trainerResult.type === "trainerRegister/rejected"){
        throw trainerResult;
      }
      else{
        const trainerId = trainerResult.payload._id;
        if(trainerImageFile){
          const formData = new FormData();
          formData.append("image", trainerImageFile);
          toast.success("you have Registered Successfully!");
          router.push("/login");
          const res = await axios.post(`${process.env.HOST}/trainer/${trainerId}/uploadImage`, formData)
        }
      }
    } catch (error) {
      toast.error("Email Already exist!")
    }
  };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

dispatch(setTrainerDataForm({[name]: value}));
    if (name === "password") {

      dispatch(setTrainerPasswordError(validatePassword(value)))
    }
  };

  const handleServiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(
      setSelectTrainings(
        selectTrainings.includes(value)
          ? selectTrainings.filter((service) => service !== value)
          : [...selectTrainings, value]
      )
    );
  };
  const validatePassword = (password: string): string => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/\d/.test(password)) {
      return "Password must contain at least one digit";
    }

    if (!/[!@#$%^&*()_+{}[\]:";<>?,./\\|`~-]/.test(password)) {
      return "Password must contain at least one special character";
    }

    if (/\s/.test(password)) {
      return "Password must not contain whitespace";
    }

    return "";
  };

  const togglePasswordVisibility = () => {
    // setShowPassword((prevShowPassword) => !prevShowPassword);
    dispatch(setTrainerShowPassword(!trainerShowPassword))
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      dispatch(setTrainerImageFile(event.target.files[0]));
    }
  };

  return (
    // <div>
    //   <h2>Trainer Registration</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="name">Name:</label>
    //     <input
    //       type="text"
    //       id="name"
    //       name="name"
    //       required
    //       onChange={handleDataChange}
    //       value={data.name}
    //     />
    //     <label htmlFor="email">Email:</label>
    //     <input
    //       type="email"
    //       id="email"
    //       name="email"
    //       required
    //       onChange={handleDataChange}
    //       value={data.email}
    //     />
    //     <label htmlFor="password">Password:</label>
    //     <div className="relative">
    //       <input
    //         type={showPassword ? "text" : "password"}
    //         id="password"
    //         name="password"
    //         required
    //         onChange={handleDataChange}
    //         value={data.password}
    //         className="pr-10"
    //       />
    //       <button
    //         type="button"
    //         className="absolute inset-y-0 right-0 px-4 py-2 bg-dark-blue text-white rounded-xl flex items-center"
    //         onClick={togglePasswordVisibility}
    //         style={{ top: 0, bottom: 0, width: "92px", marginLeft: "19px" }}
    //       >
    //         {showPassword ? "Hide" : "Show"}
    //       </button>
    //     </div>
    //     {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
    //     <label htmlFor="phoneNo">Phone Number:</label>
    //     <input
    //       type="tel"
    //       id="phoneNo"
    //       name="phoneNo"
    //       pattern="[0-9]{10}"
    //       maxLength={10}
    //       onChange={handleDataChange}
    //       value={data.phoneNo}
    //       required
    //     />
    //     <label htmlFor="address">Address:</label>
    //     <input
    //       type="text"
    //       id="address"
    //       name="address"
    //       required
    //       onChange={handleDataChange}
    //       value={data.address}
    //     />
    //     <label htmlFor="city">City:</label>
    //     <input
    //       type="text"
    //       id="city"
    //       name="city"
    //       required
    //       onChange={handleDataChange}
    //       value={data.city}
    //     />
    //     <label htmlFor="state">State:</label>
    //     <input
    //       type="text"
    //       id="state"
    //       name="state"
    //       required
    //       onChange={handleDataChange}
    //       value={data.state}
    //     />
    //     <label htmlFor="YearsOfExperience">Years of Experience:</label>
    //     <input
    //       type="number"
    //       id="YearsOfExperience"
    //       name="YearsOfExperience"
    //       onChange={handleDataChange}
    //       value={data.YearsOfExperience}
    //       required
    //     />
    //     <label htmlFor="NumberOfPetsTrained">Number of Pet Trained:</label>
    //     <input
    //       type="number"
    //       id="NumberOfPetsTrained"
    //       name="NumberOfPetsTrained"
    //       onChange={handleDataChange}
    //       value={data.NumberOfPetsTrained}
    //       required
    //     />
    //     <label htmlFor="services">Services:</label>
    //     {servicesList.map((service) => (
    //       <div key={service}>
    //         <label>
    //           <input
    //             type="checkbox"
    //             value={service}
    //             checked={selectedServices.includes(service)}
    //             onChange={handleServiceChange}
    //           />
    //           {service}
    //         </label>
    //       </div>
    //     ))}
    //     {error && <div style={{ color: "red" }}>{error}</div>}

    //     <button
    //       type="submit"
    //       value="Submit"
    //       className="bg-dark-blue my-3 mx-96 w-1/5"
    //     >
    //       Register
    //     </button>
    //   </form>
    // </div>
    <div className="w-full max-w-md mx-auto">
    <h2
      className="text-3xl font-bold mb-4 mt-6"
      style={{ fontFamily: "open-sans", fontSize: "40px" }}
    >
      Trainer Registration
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleDataChange}
          value={trainerDataForm.name}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleDataChange}
          value={trainerDataForm.email}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1">
          Password:
        </label>
        <div className="relative">
          <input
            type={trainerShowPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            onChange={handleDataChange}
            value={trainerDataForm.password}
            className="border border-gray-300 rounded-md px-4 py-2 pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-4 py-2 bg-dark-blue text-white rounded-md flex items-center"
            onClick={togglePasswordVisibility}
          >
            {trainerShowPassword ? "Hide" : "Show"}
          </button>
        </div>
        {trainerPasswordError && (
          <div className="text-red-500">{trainerPasswordError}</div>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="phoneNo" className="mb-1">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phoneNo"
          name="phoneNo"
          pattern="[0-9]{10}"
          maxLength={10}
          onChange={handleDataChange}
          value={trainerDataForm.phoneNo}
          required
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="address" className="mb-1">
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
          onChange={handleDataChange}
          value={trainerDataForm.address}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="city" className="mb-1">
          City:
        </label>
        <input
          type="text"
          id="city"
          name="city"
          required
          onChange={handleDataChange}
          value={trainerDataForm.city}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="state" className="mb-1">
          State:
        </label>
        <input
          type="text"
          id="state"
          name="state"
          required
          onChange={handleDataChange}
          value={trainerDataForm.state}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="petImage" className="mb-1">
          Profile Picture:
        </label>
        <input
          type="file"
          id="petImage"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="state" className="mb-1">
          Years Of Experience:
        </label>
        <input
          type="text"
          id="YearsOfExperience"
          name="YearsOfExperience"
          maxLength={2}
          required
          onChange={handleDataChange}
          value={trainerDataForm.YearsOfExperience}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="state" className="mb-1">
          Number of Pets Trained:
        </label>
        <input
          type="text"
          id="NumberOfPetsTrained"
          name="NumberOfPetsTrained"
          maxLength={2}
          required
          onChange={handleDataChange}
          value={trainerDataForm.NumberOfPetsTrained}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
      </div>
      <div className="flex flex-col">
        {" "}
        <label htmlFor="services" className="mb-1">
          Services:
        </label>
        {servicesList.map((services) => (
          <div key={services}>
            <label className="mb-1">
              <input
                type="checkbox"
                value={services}
                checked={selectTrainings.includes(services)}
                onChange={handleServiceChange}
                className="border border-gray-300 rounded-md px-4 py-2 mx-3"
              />
              {services}
            </label>
          </div>
        ))}
      </div>
      <div className="w-full max-w-md mx-auto">
        <button
          type="submit"
          value="Submit"
          className="bg-dark-blue text-white py-2 px-4 rounded-md mt-4"
          style={{ marginBottom: "50px" }}
        >
          Register
        </button>
      </div>
    </form>
  </div>
  );
}

export default TrainerRegister;
