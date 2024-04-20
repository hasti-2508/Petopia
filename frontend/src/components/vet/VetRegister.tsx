"use client";
import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setSelectServices,
  setVetDataForm,
  setVetImageFile,
  setVetPasswordError,
  setVetShowPassword,
} from "@/redux/vet/vetSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { vetRegister } from "@/redux/vet/vetService";
import { uploadImageToCloudinary } from "@/utils/uploadCloudinary";

function VetRegister() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.classList.add("animate__animated", "animate__zoomIn");
    }
  }, []);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {
    vetDataForm,
    vetImageFile,
    vetPasswordError,
    selectServices,
    vetShowPassword,
  } = useSelector((state: RootState) => state.vet);

  const servicesList = [
    "Veterinary Care",
    "Pet Grooming[Bathing, Spa, Hair, Nail, Ear]",
    "Pet Sitting",
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectServices.length === 0) {
      toast.error("Please select at least one Service");
      return;
    }
    const reqData = {
      ...vetDataForm,
      services: selectServices,
    };
    try {
      const vetResult = await dispatch(vetRegister(reqData));
      if (vetResult.type === "vetRegister/rejected") {
        throw vetResult;
      }
      toast.success("You have Registered Successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Email Already exist!");
    }
  };
  const handleInputPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file && allowedTypes.includes(file.type)) {
      const { url } = await uploadImageToCloudinary(file);
      dispatch(setVetDataForm({ ...vetDataForm, imageUrl: url }));
    } else {
      toast.error("Invalid file type. Please select a JPG, JPEG, or PNG file.");
    }
  };
  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setVetDataForm({ [name]: value }));

    if (name === "password") {
      dispatch(setVetPasswordError(validatePassword(value)));
    }
  };

  const handleServiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(
      setSelectServices(
        selectServices.includes(value)
          ? selectServices.filter((service) => service !== value)
          : [...selectServices, value]
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
    dispatch(setVetShowPassword(!vetShowPassword));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2
        className="text-3xl font-bold mb-4 mt-6"
        style={{ fontFamily: "open-sans", fontSize: "40px" }}
      >
        Vet Registration
      </h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
            value={vetDataForm.name}
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
            value={vetDataForm.email}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password:
          </label>
          <div className="relative">
            <input
              type={vetShowPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              onChange={handleDataChange}
              value={vetDataForm.password}
              className="border border-gray-300 rounded-md px-4 py-2 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 py-2 bg-dark-blue text-white rounded-md flex items-center"
              onClick={togglePasswordVisibility}
            >
              {vetShowPassword ? "Hide" : "Show"}
            </button>
          </div>
          {vetPasswordError && (
            <div className="text-red-500">{vetPasswordError}</div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNo" className="mb-1">
            Phone Number:
          </label>
          <input
            type="tel"
            placeholder="eg. 7990529537"
            pattern="[0-9]{10}"
            maxLength={10}
            title="Number should be of 10 digits"
            id="phoneNo"
            name="phoneNo"
            onChange={handleDataChange}
            value={vetDataForm.phoneNo}
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
            value={vetDataForm.address}
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
            value={vetDataForm.city}
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
            value={vetDataForm.state}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="petImage" className="mb-1">
            Profile Picture:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleInputPhoto}
            className="border border-gray-300 rounded-md px-4 py-2"
            required
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
            required
            onChange={handleDataChange}
            value={vetDataForm.YearsOfExperience}
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
                  checked={selectServices.includes(services)}
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

export default VetRegister;
