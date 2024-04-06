"use client";
import { Vet } from "@/interfaces/vet";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

const VetData: Vet = {
  name: "",
  email: "",
  password: "",
  phoneNo: "",
  address: "",
  city: "",
  state: "",
  YearsOfExperience: 0,
  services: [],
};

const servicesList = [
  "Veterinary Care",
  "Pet Grooming[Bathing, Spa, Hair, Nail, Ear]",
  "Pet Sitting",
];

function VetRegister() {
  const [data, setData] = useState(VetData);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setError("Please select at least one Training");
      return;
    }
    const reqData = {
      ...data,
      services: selectedServices,
    };
    try {
      const response = await axios.post(
        `${process.env.HOST}/vet/register`,
        reqData
      );
      window.location.href = "/Login";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  const handleServiceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.includes(value)
        ? prevSelectedServices.filter((service) => service !== value)
        : [...prevSelectedServices, value]
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
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <h2>Vet Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleDataChange}
          value={data.name}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleDataChange}
          value={data.email}
        />
        <label htmlFor="password">Password:</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            onChange={handleDataChange}
            value={data.password}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-4 py-2 bg-dark-blue text-white rounded-xl flex items-center"
            onClick={togglePasswordVisibility}
            style={{ top: 0, bottom: 0, width: "92px", marginLeft: "19px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <label htmlFor="phoneNo">Phone Number:</label>
        <input
          type="tel"
          id="phoneNo"
          name="phoneNo"
          pattern="[0-9]{10}"
          maxLength={10}
          onChange={handleDataChange}
          value={data.phoneNo}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          required
          onChange={handleDataChange}
          value={data.address}
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          required
          onChange={handleDataChange}
          value={data.city}
        />
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          required
          onChange={handleDataChange}
          value={data.state}
        />
        <label htmlFor="YearsOfExperience">Years of Experience:</label>
        <input
          type="number"
          id="YearsOfExperience"
          name="YearsOfExperience"
          onChange={handleDataChange}
          value={data.YearsOfExperience}
          required
        />
        <label htmlFor="services">Trainings:</label>
        {servicesList.map((trainings) => (
          <div key={trainings}>
            <label>
              <input
                type="checkbox"
                value={trainings}
                checked={selectedServices.includes(trainings)}
                onChange={handleServiceChange}
              />
              {trainings}
            </label>
          </div>
        ))}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <button
          type="submit"
          value="Submit"
          className="bg-dark-blue my-3 mx-96 w-1/5"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default VetRegister;
